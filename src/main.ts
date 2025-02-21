#!/usr/bin/env node

import "dotenv/config";
import * as fs from "fs/promises";
import { table } from "../_interface/table.interface";
import { column } from "../_interface/column.interface";
import { queryToGetTables } from "../querys/get-tables";
import { queryToGetColumnDescription } from "../querys/get-columns-descriptions";
import { connection } from "../connection/connection";
import { createInterfaceFile } from "./create-interface-file";
import {
  connectionSettings,
  getConnectionSettings,
} from "../connection/connection-settings";

//read the connection settings from a json file

export let settings: connectionSettings;

async function readSettings() {
  //validate if the file exists
  settings = await getConnectionSettings();
  // JSON.parse(await fs.readFile("conection-sql-ts.json", "utf-8"));
}

async function getData() {
  await readSettings();

  //get the connection from the pool
  const con = await connection.getConnection();

  // get all the tables schemas
  const resultQueryTables: any = await con.query(queryToGetTables, [
    settings.database,
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
    [settings.database]
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

  await createInterfaceFile(tables);

  await con.release();

  console.log("file created, Done 🎉");

  process.exit(0);
}

getData();
