import test from '../src/domain/test.interface';
import MysqlManager from '../src/service/impl/mysqlManager';

describe('Test MysqlManager methods.', () => {
  const mysqlManager = new MysqlManager();

  it('Select test', async () => {
    mysqlManager.connect();
    let rs = await mysqlManager.selectAll();

    console.log('ttttt')
    console.log(rs);
  });
});