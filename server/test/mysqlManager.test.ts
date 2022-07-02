import LoginManager from '../src/service/impl/loginManager';

describe('Test MysqlManager methods.', () => {
  const loginManager = new LoginManager();

  it.skip('checkDup test', async () => {
    let ret = await loginManager.checkDupId('test');
    
    expect(ret).toEqual('DISALLOW');
  });

  it('login', async () => {
    let ret = await loginManager.login('test', 'test');

    expect(ret).toEqual('FAIL');
  });
});