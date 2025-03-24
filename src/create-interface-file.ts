import * as fs from "fs";
import { table } from "../_interface/table.interface";
import { determineType } from "./determine-type";
import { connectionSettings } from "../connection/connection-settings";

export async function createInterfaceFile(
  tables: table[],
  connexionSettings: connectionSettings
) {
  let fstring = " // updated " + new Date().toString() + "\n\n";

  //create the json_type interface
  fstring += `export interface json_type {
    [key: string]: any;
    }\n \n
  `;

  for (const t of tables) {
    fstring += `export interface ${connexionSettings?.options?.prefix ?? ""}${
      t.name
    } {\n`;

    for (const c of t.columns) {
      const columnString = determineType(c);
      fstring += columnString;
    }
    fstring += "}\n\n";
  }

  //write the file
  fs.writeFileSync(
    connexionSettings.options?.path ?? "./interfaces.d.ts",
    fstring
  );

  fs.closeSync(0);
}
