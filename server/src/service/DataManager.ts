import axios from 'axios';
import Crawler from './impl/Crawler';
import { dateToStringFormat } from '../utils/common';

const metricInfo: string[] = [
  'mi1.avg.ld.cnt',
  'mi5.avg.ld.cnt',
  'mi15.avg.ld.cnt',
  'mem.usert',
  'swap.usert',
  'disk.used.rto'
];

const observeDisk: string[] = [
  '/dev/xvda1',
  '/dev/xvdb1',
  '/dev/xvdc1'
];

async function getNcpToken(loginURL: string, id: string, password: string): Promise<undefined|string> {
  const crawler: Crawler = new Crawler();

  let result: any = undefined;

  try {
    await crawler.moveURL(loginURL);
    await crawler.login('#username', id, '#passwordPlain', password);

    result = await crawler.getCookieValue('ncp');
  } catch(e) {

  } finally {
    await crawler.close();
  }

  return result?.value;
}

async function getMonitoringData(serverId: string, token: string) {

  const apiURL: string = 'https://monitoring-api.ncloud.com/monapi/pfmnc';
  const headerConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-access-token': token
    }
  };

  const curTime = dateToStringFormat(new Date()); // format: yyyyMMddHHmm

  let requestBody = {};

  await axios.post(apiURL, requestBody, headerConfig)

}


export { getNcpToken };