import ServerManagerInterface from '../inf/serverManager.interface';
import server from '../../domain/server.interface';
import pool from '../../utils/mysqlConnection';
import { camelToSnake } from '../../utils/common';

import mysql from 'mysql';

class ServerManager implements ServerManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(server: server): Promise<number> {

    // 최초 입력시 상태
    server.isActive = 1;

    const sql: string = `
      INSERT INTO tb_server(server_nm, server_id, cpu_cnt, ram, disk1, disk2, os, is_active, group_seq, reg_dt, upd_dt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params: (string | number)[] = [ server.serverNm, server.serverId, server.cpuCnt, server.ram, server.disk1, server.disk2, server.os, server.isActive, server.groupSeq ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`ServerManager insert error. cause: ${ err }`));

          resolve(result.insertId);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async selectAll(): Promise<server[]> {
    const sql: string = `
      SELECT ts.*, tg.group_nm
      FROM tb_server ts
      LEFT JOIN tb_group tg
      ON ts.group_seq = tg.seq
      ORDER BY seq DESC
    `;

    return new Promise<server[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`ServerManager selectAll error. cause: ${ err }`));

          const dataList: server[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                serverNm: row.server_nm,
                serverId: row.server_id,
                cpuCnt: row.cpu_cnt,
                ram: row.ram,
                disk1: row.disk1,
                disk2: row.disk2,
                os: row.os,
                isActive: row.is_active,
                groupSeq: row.group_seq,
                groupNm: row.group_nm,
                regDt: row.reg_dt,
                updDt: row.upd_dt
              });
            }
          }

          resolve(dataList);
        });

        // reutrn connection pool
        conn.release();
      });
    });
  }

  public async selectAllByGroupSeq(groupSeq: number, isActive?: string): Promise<server[]> {
    const sql: string = `
      SELECT *
      FROM tb_server
      WHERE group_seq = ?
      ${ isActive ? `AND is_active = ?` : `` }
    `;

    let params: (string | number)[];
    if (isActive) {
      params = [ groupSeq, isActive ];
    } else {
      params = [ groupSeq ];
    }

    return new Promise<server[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`ServerManager selectAllByGroupSeq error. cause: ${ err }`));

          const dataList: server[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                serverNm: row.server_nm,
                serverId: row.server_id,
                cpuCnt: row.cpu_cnt,
                ram: row.ram,
                disk1: row.disk1,
                disk2: row.disk2,
                os: row.os,
                isActive: row.is_active,
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

  public async select(seq: number): Promise<server> {
    const sql: string = `
      SELECT *
      FROM tb_server
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<server | any>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`ServerManager select error. cause: ${ err }`));

          result = result[0];
          resolve(result ? {
            seq: result.seq,
            serverNm: result.server_nm,
            serverId: result.server_id,
            cpuCnt: result.cpu_cnt,
            ram: result.ram,
            disk1: result.disk1,
            disk2: result.disk2,
            os: result.os,
            isActive: result.is_active,
            groupSeq: result.group_seq,
            regDt: result.reg_dt,
            updDt: result.upd_dt
          }: {});
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: { seq: number, serverNm?: string, cpuCnt?: number, ram?: number, disk1?: number, disk2?: number, os?: string, isActive?: number, groupSeq?: number }): Promise<number> {
    let sql: string = `
      UPDATE tb_server
      SET upd_dt = NOW()
    `;
    let params: (string | number)[] = [];

    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined && key !== 'seq') {
        sql += `, ${ camelToSnake(key) } = ?`;
        params.push(value);
      }
    }
    sql += ` WHERE seq = ?`;
    params.push(props.seq);

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`ServerManager update error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async delete(seq: number): Promise<number> {
    const sql: string = `
      DELETE FROM tb_server
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`ServerManager delete error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

}

export default ServerManager;