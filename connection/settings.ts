import * as mysql2 from "mysql2/promise";
import * as fs from "fs";
import { getConnectionSettings } from "./connection-settings";

//read the connection settings from a json file
const settings = getConnectionSettings();
//JSON.parse(fs.readFileSync("conection-sql-ts.json", "utf-8"));

//validate if the file exists
if (!settings) {
  throw new Error("Settings file not found, please create it.");
}

//connection from mysql2
export const pool = mysql2.createPool({
  host: settings?.host ?? "localhost",
  user: settings?.user ?? "root",
  database: settings?.database ?? "test",
  password: settings?.password ?? "root",
  port: settings?.port ?? 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
