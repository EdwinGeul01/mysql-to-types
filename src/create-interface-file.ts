import * as fs from "fs";
import { table } from "../_interface/table.interface";
import { determineType } from "./determine-type";
import { settings } from "./main";

export async function createInterfaceFile(tables: table[]) {
  let fstring = " // updated " + new Date().toString() + "\n\n";

  //create the json_type interface
  fstring += `export interface json_type {
    [key: string]: any;
    }\n \n
  `;

  for (const t of tables) {
    fstring += `export interface ${settings?.options?.prefix ?? ""}${
      t.name
    } {\n`;

    for (const c of t.columns) {
      const columnString = determineType(c);
      fstring += columnString;
    }
    fstring += "}\n\n";
  }

  //write the file
  fs.writeFileSync(settings.options?.path ?? "./DB.d.ts", fstring);

  fs.closeSync(0);
}
