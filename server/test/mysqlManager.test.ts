import MysqlLoginManager from '../src/service/impl/mysql.loginManager';

describe('Test MysqlManager methods.', () => {
  const mysqlLoginManager = new MysqlLoginManager();

  it('checkDup test', async () => {
    let ret = await mysqlLoginManager.checkDupId('test');
    
    expect(ret).toEqual('DISALLOW');
  });
});