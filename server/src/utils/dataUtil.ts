import axios from 'axios';
import { data, license, server } from '../domain';
import { Crawler, LicenseManager, ServerManager } from '../service/impl';
import { dateToStringFormat } from './common';

// --------------------------------------------------------------------------------

const UNIX_MINUTE: number = 60 * 1_000;

const metricInfo: string[] = [
  'avg.svr.cpu.used.rto',
  'mi1.avg.ld.cnt',
  'mi5.avg.ld.cnt',
  'mi15.avg.ld.cnt',
  'mem.usert',
  'swap.usert',
  'disk.used.rto'
];

const fileSystem: string[] = [
  '/dev/xvda1',
  '/dev/xvdb1',
  '/dev/xvdc1'
];

// --------------------------------------------------------------------------------

async function getNcpToken(loginURL: string, id: string, password: string): Promise<undefined|string> {
  const crawler: Crawler = new Crawler();

  let result: any = undefined;

  try {
    await crawler.moveURL(loginURL);
    await crawler.login('#username', id, '#passwordPlain', password);

    result = await crawler.getCookieValue('ncp');

    result = result.value.replaceAll('"', '');
  } catch(e) {

  } finally {
    await crawler.close();
  }

  return result;
}

async function getLicenseData(): Promise<license[]> {
  const licenseMangager: LicenseManager = new LicenseManager();

  return await licenseMangager.selectAll();
}

async function setToken(license: license): Promise<license> {
  license.token = await getNcpToken(license.loginUrl, license.licenseId, license.licensePw);

  return license;
}

async function getMonitoringData(server: server, token?: string): Promise<data> {
  // format: yyyyMMddHHmm
  const startTime = dateToStringFormat(new Date(Date.now() - 30 * UNIX_MINUTE)); // 30분 전
  const fileSystemStartTime = dateToStringFormat(new Date(Date.now() - 1 * UNIX_MINUTE)); // 1분 전
  const endTime = dateToStringFormat(new Date());
  
  const postApiURL: string = `https://monitoring-api.ncloud.com/monapi/pfmnc`;
  const getApiURL: string = `https://monitoring-api.ncloud.com/monapi/servers/${ server.serverId }/filesystem?${
    new URLSearchParams({ startTime: fileSystemStartTime, endTime })
  }`;
  const headerConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-access-token': token || ''
    }
  };

  const requestBody = {
    targets: metricInfo.map(metric => ({
      metric: metric,
      key: server.serverId,
      startTime,
      endTime
    }))
  };

  const [resPost, resGet] = await Promise.all([
    axios.post(postApiURL, requestBody, headerConfig).catch(err => {
      console.log('server', server.seq, err)
    }), axios.get(getApiURL, headerConfig).catch(err => {
      console.log('server', server.seq, err)
    })
  ]);

  const tgtData: data = {
    serverSeq: server.seq || 0,
    cpu: 0,
    mi01: 0,
    mi05: 0,
    mi15: 0,
    mem: 0,
    swap: 0,
    totalDisk: 0,
    disk1: 0,
    disk2: 0,
    disk3: 0
  };

  // parsing
  for (let i = 0, len = metricInfo.length; i < len; i++) {
    const metric = metricInfo[i];
    const findData = resPost?.data.result.find((item: any) => item.item === metric);

    switch (metric) {
      case 'avg.svr.cpu.used.rto':
        tgtData.cpu = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'mi1.avg.ld.cnt':
        tgtData.mi01 = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'mi5.avg.ld.cnt':
        tgtData.mi05 = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'mi15.avg.ld.cnt':
        tgtData.mi15 = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'mem.usert':
        tgtData.mem = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'swap.usert':
        tgtData.swap = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      case 'disk.used.rto':
        tgtData.totalDisk = Math.round(parseFloat(findData?.avg || 0) * 100) / 100;
        break;
      default:
        break;
    }
  }

  for (let i = 0, len = fileSystem.length; i < len; i++) {
    const metric = fileSystem[i];
    const findData = resGet?.data.rows.find((item: any) => item.devNm === metric);

    switch (metric) {
      case '/dev/xvda1':
        tgtData.disk1 = Math.round(parseFloat(findData?.usedPer || 0) * 100) / 100;
        break;
      case '/dev/xvdb1':
        tgtData.disk2 = Math.round(parseFloat(findData?.usedPer || 0) * 100) / 100;
        break;
      case '/dev/xvdc1':
        tgtData.disk3 = Math.round(parseFloat(findData?.usedPer || 0) * 100) / 100;
        break;
      default:
        break;
    }
  }

  return tgtData;
}

// spec이 좋은 환경에서 사용
async function getAsyncAllMonitoringData(): Promise<data[]> {
  // 라이센스 정보 가져오기
  const licenses: license[] = await getLicenseData();

  // 라이센스에 크롤링 돌아서 token값 매핑
  const licensePromises: any[] = [];
  for (const license of licenses) {
    licensePromises.push(setToken(license));
  }

  // 프로미스로 동시에 가져옴 3계정 기준 30초 정도 소요
  const licensesWithToken: license[] = await Promise.all(licensePromises);

  const allServerPromises: any[] = [];

  for (const license of licensesWithToken) {
    const groupSeqs: string[] = license.groupSeq.split(',');

    for (const group of groupSeqs) {
      const serverManager = new ServerManager();

      // 그룹별 서버 목록 가져오기
      const servers: server[] = await serverManager.selectAllByGroupSeq(parseInt(group));

      for (const server of servers) {
        allServerPromises.push(getMonitoringData(server, license.token));
      }
    }
  }

  const allData: data[] = await Promise.all(allServerPromises);

  return allData;
}

// spec이 부족한 환경에서 사용
async function getSyncAllMonitoringData(): Promise<data[]> {

  let allData: data[] = [];

  const serverManager = new ServerManager();

  // 라이센스 정보 가져오기
  const licenses: license[] = await getLicenseData();

  for await (const license of licenses) {
    const tokenWithLicense = await setToken(license);

    const groupSeqs = tokenWithLicense.groupSeq.split(',');

    for await (const group of groupSeqs) {
      const servers: server[] = await serverManager.selectAllByGroupSeq(parseInt(group));

      for await (const server of servers) {
        allData = [ ...allData, await getMonitoringData(server, license.token)];
      }
    }
  }

  return allData;
}

// --------------------------------------------------------------------------------

export { getAsyncAllMonitoringData, getSyncAllMonitoringData };