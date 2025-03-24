import { column } from "./column.interface";
export interface table {
    name: string;
    description: string;
    columns: column[];
}
