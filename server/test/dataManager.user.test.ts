import { user } from '../src/domain/user.interface';
import DataManager from '../src/service/back/impl/dataManager';

describe('Test DataManager methods.', () => {
  const userDataManager = new DataManager('user');

  it.skip('Insert test', async (): Promise<void> => {
    let user: user = {
      "id": "test",
      "name": "kim",
      "password": "asdf",
      "group": ["group_1"]
    }

    await expect(userDataManager.insert(user)).resolves.toBe(1);
  });

  it.skip('Update test', async (): Promise<void> => {
    let user: user = {
      "id": "upd_test",
      "name": "kim",
      "password": "1234",
      "group": ["group_1"]
    }

    await expect(userDataManager.update(1, user)).resolves.toBe(1);
  });

  it.skip('Select test', async (): Promise<void> => {
    await expect(userDataManager.select(1)).resolves.toEqual(null);
  });

  it.skip('Delete test', async (): Promise<void> => {
    await expect(userDataManager.delete(1)).resolves.toBe(1);
  });
});