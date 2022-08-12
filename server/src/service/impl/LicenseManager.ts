import LicenseManagerInterface from '../inf/LicenseManager.interface';
import license from '../../domain/license.interface';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';

class LicenseManager implements LicenseManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(license: license): Promise<number> {
    const sql: string = `
      INSERT INTO tb_license(license_nm, license_id, license_pw, login_url, group_seq, reg_dt, upd_dt)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params: (string|number)[] = [ license.licenseNm, license.licenseId, license.licensePw, license.loginUrl, license.groupSeq ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`LicenseManager insert error. cause: ${ err }`));

          resolve(result.insertId);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async selectAll(): Promise<license[]> {
    const sql: string = `
      SELECT *
      FROM tb_license
      ORDER BY seq DESC
    `;

    return new Promise<license[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`LicenseManager selectAll error. cause: ${ err }`));

          const dataList: license[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                licenseNm: row.license_nm,
                licenseId: row.license_id,
                licensePw: row.license_pw,
                loginUrl: row.login_url,
                groupSeq: row.group_seq,
                regDt: row.reg_dt,
                updDt: row.upd_dt
              });
            }
          }

          resolve(dataList);
        });
        
        // return connection pool
        conn.release();
      });
    });
  }

  public async select(seq: number): Promise<license> {
    const sql: string = `
      SELECT *
      FROM tb_license
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<license | any>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));
        
        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`LicenseManager select error. cause: ${ err }`));

          result = result[0];
          resolve(result ? {
            seq: result.seq,
            licenseNm: result.license_nm,
            licenseId: result.license_id,
            licensePw: result.license_pw,
            loginUrl: result.login_url,
            groupSeq: result.group_seq,
            regDt: result.reg_dt,
            updDt: result.upd_dt
          }: {});
        });

        // reutrn connection pool
        conn.release();
      });
    });
  }

  public async update(props: { seq: number, licenseNm: string, licenseId: string, licensePw: string, loginUrl: string, groupSeq: string }): Promise<number> {
    let sql: string = `
      UPDATE tb_license
      SET license_nm = ?, license_id = ?, license_pw = ?, login_url = ?, group_seq = ?, upd_dt = NOW()
      WHERE seq = ?
    `;
    let params: (string | number)[] = [ props.licenseNm, props.licenseId, props.licensePw, props.loginUrl, props.groupSeq, props.seq ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`LicenseManager update error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async delete(seq: number): Promise<number> {
    const sql: string = `
      DELETE FROM tb_license
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`LicenseManager delete error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

}

export default LicenseManager;