import { LoginManager, UserManager } from '../src/service/impl';

describe('Test MysqlManager methods.', () => {
  // const loginManager = new LoginManager();

  // it.skip('checkDup test', async () => {
  //   let ret = await loginManager.checkDupId('test');
    
  //   expect(ret).toEqual('DISALLOW');
  // });

  // it('login', async () => {
  //   let ret = await loginManager.login('test', 'test1');

  //   expect(ret).toEqual('FAIL');
  // });
  const userManager = new UserManager();

  it.skip('insert user', async () => {
    let ret = await userManager.insert({
      userNm: 'test',
      userId: 'test',
      userPw: 'test'
    });
  });

  // it('update user', async () => {
  //   let ret = await userManager.update({
  //     seq: 1,
  //     user_nm: 'admin_test'
  //   });

  //   expect(ret).toEqual(1);
  // });
});