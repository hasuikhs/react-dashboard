import test from '../src/domain/test.interface';
import MysqlManager from '../src/service/impl/mysqlManager';

describe('Test MysqlManager methods.', () => {
  const mysqlManager = new MysqlManager();

  it('Select test', async () => {
    let rs = await mysqlManager.selectAll();

    expect(rs).toEqual([{id: 'test', password: 'test'}]);
  });
});