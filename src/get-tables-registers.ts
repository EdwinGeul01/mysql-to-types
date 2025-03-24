import { column } from "../_interface/column.interface";
import { table } from "../_interface/table.interface";
import { connection } from "../connection/connection";
import { connectionSettings } from "../connection/connection-settings";
import { queryToGetColumnDescription } from "../querys/get-columns-descriptions";
import { queryToGetTables } from "../querys/get-tables";
import { createInterfaceFile } from "./create-interface-file";

export async function getTablesRegisters(
  connectionSettings: connectionSettings
): Promise<table[]> {
  //get the connection from the pool
  const con = await connection.getConnection(connectionSettings);

  // get all the tables schemas
  const resultQueryTables: any = await con.query(queryToGetTables, [
    connectionSettings.database,
  ]);

  //get all the tables names
  const tablesNames: string[] = resultQueryTables[0].map((table: any) => {
    return table.TABLE_NAME;
  });

  //variable to store the tables
  const tables: table[] = [];

  //get all the tables descriptions
  const descriptionFromAllTables: any = await con.query(
    queryToGetColumnDescription,
    [connectionSettings.database]
  );

  // for each table get the columns descriptions
  for await (const t of tablesNames) {
    const descriptionFromTable = descriptionFromAllTables[0].filter(
      (table: any) => table["TABLE_NAME"] == t
    );

    //if the table has columns
    if (descriptionFromTable.length > 0) {
      const columns: column[] = descriptionFromTable.map((column: any) => {
        return {
          name: column.Column,
          type: column.Type,
          comment: column.Comment,
          default: column["DefaultValue"],
          extra: column.Extras,
          key: column.Key,
          nullable: column["Nullable"],
        } as column;
      });

      tables.push({
        name: t,
        description: "",
        columns,
      });
    }
  }

  await con.release();
  return tables;
}
