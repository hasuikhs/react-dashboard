import checkDiskSpace from 'check-disk-space';
import os from 'os';
import process from 'process';

(async function() {
  let res = await checkDiskSpace('/');
  console.log(res)
  console.log(res.size / 1024 / 1024/ 1024)
})()
