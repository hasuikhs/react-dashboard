import Datastore from 'nedb';
import path from 'path';
import { user, userExt } from '../../../domain/user.interface';
import { doc, docExt } from '../../../domain/doc.interface';
import { server, serverExt } from '../../../domain/server.interface';
import DataManagerInterface from '../inf/dataManager.interface';
import LoginManager from './loginManager';
import { encodePassword } from '../../../utils/passwordUtil';

import { dateToStringFormat } from '../../../utils/common';

class DataManager implements DataManagerInterface {

  private _path: string;
  private _curDB: Datastore;
  private types: string[] = ['user', 'doc', 'server'];
  private type: string;

  constructor(type: string) {
    this._path = `${ path.dirname(__filename) }/../../../data`;

    if (this.types.includes(type)) {
      this.type = type;
      this._curDB = new Datastore({ filename: `data/${ type }.db`, autoload: true });
    } else {
      throw new Error('Invalid db type.');
    }
  }

  private getNextIdx(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.find({}).sort({ idx: -1 }).limit(1).exec((err, results) => {
        if (err) reject(new Error(`Get max index error. cause: ${ err }`));

        if (results.length > 0) {
          resolve(++results[0].idx);
        } else {
          resolve(1);
        }
      });
    });
  }

  public async insert(doc: user | doc | server): Promise<any> {

    let docExt: userExt | docExt | serverExt = { ...doc, ...{ idx: await this.getNextIdx(), regDt: dateToStringFormat(new Date()), updDt: dateToStringFormat(new Date()) } };

    return new Promise<any>(async (resolve, reject) => {

      if (this.type === 'user') {
        const loginManager = new LoginManager();
        let tmpExt: userExt = docExt as userExt;
        let checkDupResult = await loginManager.checkDupId(tmpExt.id);

        if (checkDupResult === 'disallow') {
          resolve(0);
        }

        tmpExt.password = encodePassword(tmpExt.password);
        docExt = tmpExt;
      }

      this._curDB.insert(docExt, (err, result) => {
        if (err) reject(new Error(`Insert error, cause: ${ err }`));

        if (result) {
          resolve(1); // success
        } else {
          resolve(0); // fail?
        }
      });
    });
  }

  public select(idxDrGroup?: number | string): Promise<any | any[]> {
    if (typeof idxDrGroup === 'number') {
      return new Promise<any>((resolve, reject) => {
        this._curDB.findOne({ idx: idxDrGroup }, (err, result) => {
          if (err) reject(new Error(`Select error. cause: ${ err }`));

          resolve(result);
        });
      });
    } else if (typeof idxDrGroup === 'string') {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({ group: idxDrGroup }).sort({ idx: 1 }).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${ err }`));

          resolve(results);
        });
      });
    } else {
      return new Promise<any[]>((resolve, reject) => {
        this._curDB.find({}).sort({ idx: 1 }).exec((err, results) => {
          if (err) reject(new Error(`Select error. cause: ${ err }`));

          resolve(results);
        });
      });
    }
  }

  public update(idx: number, doc: user | doc | server): Promise<any> {

    let docExt: userExt | docExt | serverExt = { ...doc, ...{ updDt: dateToStringFormat(new Date()) }};

    return new Promise<any>((resolve, reject) => {
      this._curDB.update({ idx: idx }, { $set: docExt }, {}, (err, result) => {
        if (err) reject(new Error(`Update error. cause: ${ err }`));

        resolve(result);
      });
    });
  }

  public delete(idx: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.remove({ idx: idx }, (err, result) => {
        if (err) reject(new Error(`Delete error. cause: ${ err }`));

        resolve(result);
      });
    });
  }
}

export default DataManager;