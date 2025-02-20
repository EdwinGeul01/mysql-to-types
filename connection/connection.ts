import { pool } from "./settings";

export class connection {
  static pool = pool;

  /**
   * Get a connection from the pool
   * @returns The connection
   */
  static async getConnection() {
    const connection = await this.pool.getConnection();

    return connection;
  }
}
