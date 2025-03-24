import * as mysql2 from "mysql2/promise";
import { connectionSettings } from "./connection-settings";
export declare class connection {
    /**
     * Get a connection from the pool
     * @returns The connection
     */
    static getConnection(connectionSettings: connectionSettings): Promise<mysql2.PoolConnection>;
}
