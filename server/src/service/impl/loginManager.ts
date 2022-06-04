import Datastore from 'nedb';
import path from 'path';
import { user, userExt } from '../../domain/user.interface';
import LoginManagerInterface from '../inf/loginManager.interface';

class LoginManager implements LoginManagerInterface {

  private _path: string;
  private _curDB: Datastore;

  constructor() {
    this._path = `${ path.dirname(__filename) }/../../../data`;
    this._curDB = new Datastore({ filename: `${ this._path }/user.db`, autoload: true });
  }

  public login(id: string, password: string): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.findOne({id, password}, (err, result) => {
        if (err) reject(new Error(`Select error. cause: ${ err }`));

        if (result === null) {
          resolve('fail');
        } else {
          resolve('success');
        }
      });
    });
  }
}

export default LoginManager;