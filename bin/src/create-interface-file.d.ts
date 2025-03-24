import { table } from "../_interface/table.interface";
import { connectionSettings } from "../connection/connection-settings";
export declare function createInterfaceFile(tables: table[], connexionSettings: connectionSettings): Promise<void>;
