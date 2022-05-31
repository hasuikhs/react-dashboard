import DataManager from '../src/service/impl/dataManager';

describe('Test DataManager methods.', () => {
  const userDataManager = new DataManager('user');

  it('Insert test', async (): Promise<void> => {
    let user = {
      "id": "test_id",
      "name": "kim",
      "password": "asdf",
      "group": ["group_1"]
    }

    await expect(userDataManager.insert(user)).resolves.toBe(1);
  });
});