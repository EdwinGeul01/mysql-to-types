import * as mysql2 from "mysql2/promise";
import { connectionSettings } from "./connection-settings";

export class connection {
  /**
   * Get a connection from the pool
   * @returns The connection
   */
  static async getConnection(connectionSettings: connectionSettings) {
    const pool = mysql2.createPool({
      host: connectionSettings?.host ?? "localhost",
      user: connectionSettings?.user ?? "root",
      database: connectionSettings?.database ?? "test",
      password: connectionSettings?.password ?? "root",
      port: connectionSettings?.port ?? 3306,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    const connection = await pool.getConnection();

    return connection;
  }
}
