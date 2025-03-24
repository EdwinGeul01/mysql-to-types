#!/usr/bin/env node

import "dotenv/config";
import { table } from "../_interface/table.interface";
import {
  connectionSettings,
  getConnectionSettings,
} from "../connection/connection-settings";
import { createInterfaceFile } from "./create-interface-file";
import { getTablesRegisters } from "./get-tables-registers";

//read the connection settings from a json file

let settings: connectionSettings;

async function readSettings() {
  //validate if the file exists
  settings = await getConnectionSettings();
}

async function run() {
  await readSettings();
  const tables: table[] = await getTablesRegisters(settings);
  await createInterfaceFile(tables);

  console.log("file created, Done 🎉");
  process.exit(0);
}

run();
