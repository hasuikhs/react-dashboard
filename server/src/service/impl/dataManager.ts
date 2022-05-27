import Datastore from 'nedb';
import path from 'path';
import { account, accountExt } from '../../domain/account.interface';
import { doc, docExt } from '../../domain/doc.interface';
import { server, serverExt } from '../../domain/server.interface';
import DataManagerInterface from '../inf/dataManager.interface';

class DataManager implements DataManagerInterface {

  private _path: string;
  private _curDB: Datastore;
  private types: string[] = ['account', 'doc', 'server'];

  constructor(type: string) {
    this._path = `${ path.dirname(__filename) }/../../../data`;

    if (this.types.includes(type)) {
      this._curDB = new Datastore({ filename: `${ this._path }/${ type }.db`, autoload: true });
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

  public async insert(doc: account | doc | server): Promise<any> {

    let docExt: accountExt | docExt | serverExt = { ...doc, ...{ idx: await this.getNextIdx() } };

    return new Promise<any>((resolve, reject) => {
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

  public update(idx: number, doc: account | doc | server): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._curDB.update({ idx: idx }, { $set: doc }, {}, (err, result) => {
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