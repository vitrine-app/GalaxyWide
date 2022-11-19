import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

const sql: { dbFile: string; db: Database } = {
  dbFile: './gogDb/galaxy-2.0.db',
  db: null as unknown as Database,
};

export const openDatabase = async (): Promise<void> => {
  sql.db = await open({
    filename: sql.dbFile,
    driver: sqlite3.Database,
  });
};

export default sql;
