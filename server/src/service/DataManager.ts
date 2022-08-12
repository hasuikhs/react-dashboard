import license from '../domain/license.interface';
import server from '../domain/server.interface';
import { getNcpToken, getMonitoringData } from '../utils/dataUtil';
import LicenseManager from './impl/LicenseManager';
import ServerManager from './impl/ServerManager';

// --------------------------------------------------------------------------------

async function getLicenseData(): Promise<license[]> {
  const licenseMangager: LicenseManager = new LicenseManager();

  return await licenseMangager.selectAll();
}

async function setToken(license: license): Promise<license> {
  license.token = await getNcpToken(license.loginUrl, license.licenseId, license.licensePw);

  return license;
}

async function insertData() {

  // const lic

}

async function test() {

  console.time('TEST');
  // 라이센스 정보 가져오기
  const licenses: license[] = await getLicenseData();
  
  console.timeLog('TEST', '--- STEP 1 END ---');

  // 라이센스에 크롤링 돌아서 token값 매핑
  const licensePromises: any[] = [];
  for (const license of licenses) {
    if (license.seq === 1) { // 1번 계정만 테스트
      licensePromises.push(setToken(license));
    }
  }

  console.timeLog('TEST', '--- STEP 2 END ---');

  // 프로미스로 동시에 가져옴 3계정 기준 30초 정도 소요
  const licensesWithToken: license[] = await Promise.all(licensePromises);

  for (const license of licensesWithToken) {
    const groupSeqs: string[] = license.groupSeq.split(',');

    for (const group of groupSeqs) {
      const serverManager = new ServerManager();

      // 그룹별 서버 목록 가져오기
      const servers: server[] = await serverManager.selectAllByGroupSeq(parseInt(group));
      const serverPromises: any[] = [];

      for (const server of servers) {
        serverPromises.push(getMonitoringData(server.serverId, license.token));
      }

      const data = await Promise.all(serverPromises);
    }
  }
  console.timeLog('TEST', '--- STEP 3 END ---');

  console.timeEnd('TEST');
}

test()

export default insertData;