import { table } from "../_interface/table.interface";
import { connectionSettings } from "../connection/connection-settings";
export declare function getTablesRegisters(connectionSettings: connectionSettings): Promise<table[]>;
