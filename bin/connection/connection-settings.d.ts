export interface connectionSettings {
    filePath?: string;
    databaseType?: string;
    user?: string;
    password?: string;
    host?: string;
    port?: number;
    database?: string;
    options?: {
        prefix?: string;
        path?: string;
    };
}
export declare function getConnectionSettings(): connectionSettings;
