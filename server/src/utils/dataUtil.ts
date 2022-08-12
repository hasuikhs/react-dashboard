import axios from 'axios';
import Crawler from '../service/impl/Crawler';
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

async function getMonitoringData(serverId: string, token?: string) {
  // format: yyyyMMddHHmm
  const startTime = dateToStringFormat(new Date(Date.now() - 30 * UNIX_MINUTE)); // 30분 전
  const fileSystemStartTime = dateToStringFormat(new Date(Date.now() - 1 * UNIX_MINUTE)); // 1분 전
  const endTime = dateToStringFormat(new Date());
  
  const postApiURL: string = `https://monitoring-api.ncloud.com/monapi/pfmnc`;
  const getApiURL: string = `https://monitoring-api.ncloud.com/monapi/servers/${ serverId }/filesystem?${
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
      key: serverId,
      startTime,
      endTime
    }))
  };

  const [resPost, resGet] = await Promise.all([
    axios.post(postApiURL, requestBody, headerConfig), axios.get(getApiURL, headerConfig)
  ]);

  const tgtData = {
    serverId,
    cpu: 0,
    ml1: 0,
    ml5: 0,
    ml15: 0,
    mem: 0,
    swap: 0,
    disk: 0,
    xvda1: 0,
    xvdb1: 0,
    xvdc1: 0
  };

  // parsing
  for (let i = 0, len = metricInfo.length; i < len; i++) {
    const metric = metricInfo[i];

    const findData = resPost.data?.result.find((item: any) => item.item === metric);

    switch (metric) {
      case 'avg.svr.cpu.used.rto':
        tgtData.cpu = parseFloat(findData?.avg) || 0;
        break;
      case 'mi1.avg.ld.cnt':
        tgtData.ml1 = parseFloat(findData?.avg) || 0;
        break;
      case 'mi5.avg.ld.cnt':
        tgtData.ml5 = parseFloat(findData?.avg) || 0;
        break;
      case 'mi15.avg.ld.cnt':
        tgtData.ml15 = parseFloat(findData?.avg) || 0;
        break;
      case 'mem.usert':
        tgtData.mem = parseFloat(findData?.avg) || 0;
        break;
      case 'swap.usert':
        tgtData.swap = parseFloat(findData?.avg) || 0;
        break;
      case 'disk.used.rto':
        tgtData.disk = parseFloat(findData?.avg) || 0;
        break;
      default:
        break;
    }
  }

  for (let i = 0, len = fileSystem.length; i < len; i++) {
    const metric = fileSystem[i];

    const findData = resGet.data?.rows.find((item: any) => item.devNm === metric);

    switch (metric) {
      case '/dev/xvda1':
        tgtData.xvda1 = parseFloat(findData?.usedPer) || 0;
        break;
      case '/dev/xvdb1':
        tgtData.xvdb1 = parseFloat(findData?.usedPser) || 0
        break;
      case '/dev/xvdc1':
        tgtData.xvdc1 = parseFloat(findData?.usedPer) || 0;
        break;
      default:
        break;
    }
  }

  console.log(tgtData)

  return null;
  // await axios.get(getApiURL, headerConfig);

}

// --------------------------------------------------------------------------------

export { getNcpToken, getMonitoringData };