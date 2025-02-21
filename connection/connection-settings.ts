import * as fs from "fs";

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

export function getConnectionSettings(): connectionSettings {
  //read the connection settings from a json file
  let settingsFileRead;
  try {
    settingsFileRead = JSON.parse(
      fs.readFileSync("conection-sql-ts.json", "utf-8")
    );
  } catch (error) {}

  let connectionSettings: connectionSettings | undefined = undefined;

  if (settingsFileRead) {
    connectionSettings = {
      filePath: settingsFileRead?.filePath ?? "conection-sql-ts.json",
      databaseType: settingsFileRead?.databaseType ?? "mysql",
      user: settingsFileRead?.user ?? "root",
      password: settingsFileRead?.password ?? "root",
      host: settingsFileRead?.host ?? "localhost",
      port: parseInt(settingsFileRead?.port ?? "3306"),
      database: settingsFileRead?.database ?? "test",
    };
    return connectionSettings;
  }

  //validate if the file exists
  if (!connectionSettings) {
    connectionSettings = {};
    //get the args
    const args = process.argv;
    if (args.length == 0) {
      throw new Error("Settings file not found, please create it.");
    }

    // get read mysql settings
    let mysqlSettingsIndex = args.findIndex((arg) => arg == "-s");
    if (mysqlSettingsIndex == -1) {
      throw new Error("Settings file not found, please create it.");
    }
    const DataBaseArg = args[mysqlSettingsIndex + 1];

    // validate the settings values
    // the sintax is -s mysql://username:password@host:port/database
    // get the database type
    let databaseTypeIndex = DataBaseArg.indexOf("://");

    if (databaseTypeIndex == -1) {
      throw new Error("database type on args not found, please create it.");
    }
    connectionSettings.databaseType = DataBaseArg.slice(0, databaseTypeIndex);

    //remove the part of the database type from the string
    let UriWithoutDatabaseType = DataBaseArg.slice(databaseTypeIndex + 3);

    // get the username
    let usernameIndex = UriWithoutDatabaseType.indexOf(":");
    if (usernameIndex == -1) {
      throw new Error("username on args not found, please create it.");
    }
    connectionSettings.user = UriWithoutDatabaseType.slice(0, usernameIndex);

    //remove the part of the username from the string
    let UriWithoutUsername = UriWithoutDatabaseType.slice(usernameIndex + 1);

    // get the password
    let passwordIndex = UriWithoutUsername.lastIndexOf("@");
    if (passwordIndex == -1) {
      throw new Error("password on args not found, please create it.");
    }
    connectionSettings.password = UriWithoutUsername.slice(0, passwordIndex);

    //remove the part of the password from the string
    let UriWithoutPassword = UriWithoutUsername.slice(passwordIndex + 1);

    // get the host
    let hostIndex = UriWithoutPassword.indexOf(":");
    if (hostIndex == -1) {
      throw new Error("host on args not found, please create it.");
    }
    connectionSettings.host = UriWithoutPassword.slice(0, hostIndex);

    //remove the part of the host from the string
    let UriWithoutHost = UriWithoutPassword.slice(hostIndex + 1);

    // get the port
    let portIndex = UriWithoutHost.indexOf("/");
    if (portIndex == -1) {
      throw new Error("port on args not found, please create it.");
    }
    connectionSettings.port = Number(UriWithoutHost.slice(0, portIndex));

    //remove the part of the port from the string
    let database = UriWithoutHost.slice(portIndex + 1);

    connectionSettings.database = database;

    connectionSettings.options = {};
    //search if the args have -f
    let pathIndex = args.findIndex((arg) => arg == "-f");
    let path = pathIndex == -1 ? "./interfaces.d.ts" : args[pathIndex + 1];
    connectionSettings.options.path = path;

    //search if the args have -p
    let prefixIndex = args.findIndex((arg) => arg == "-p");
    let prefix = prefixIndex == -1 ? "" : args[prefixIndex + 1];
    connectionSettings.options.prefix = prefix;
  }

  return connectionSettings;
}
