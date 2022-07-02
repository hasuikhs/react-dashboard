import LoginManager from '../src/service/impl/loginManager';
import UserManager from '../src/service/impl/userManager';

describe('Test MysqlManager methods.', () => {
  const loginManager = new LoginManager();

  it.skip('checkDup test', async () => {
    let ret = await loginManager.checkDupId('test');
    
    expect(ret).toEqual('DISALLOW');
  });

  it('login', async () => {
    let ret = await loginManager.login('test', 'test');

    expect(ret).toEqual('SUCCESS');
  });
  // const userManager = new UserManager();

  // it('insert user', async () => {
  //   let ret = await userManager.insert({
  //     user_nm: 'test',
  //     user_id: 'test',
  //     user_pw: 'test'
  //   })
  // })
});