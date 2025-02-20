"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionSettings = getConnectionSettings;
const fs = __importStar(require("fs"));
function getConnectionSettings() {
    var _a, _b, _c, _d, _e, _f, _g;
    //read the connection settings from a json file
    let settingsFileRead;
    try {
        settingsFileRead = JSON.parse(fs.readFileSync("conection-sql-ts.json", "utf-8"));
    }
    catch (error) { }
    let connectionSettings = undefined;
    if (settingsFileRead) {
        connectionSettings = {
            filePath: (_a = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.filePath) !== null && _a !== void 0 ? _a : "conection-sql-ts.json",
            databaseType: (_b = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.databaseType) !== null && _b !== void 0 ? _b : "mysql",
            user: (_c = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.user) !== null && _c !== void 0 ? _c : "root",
            password: (_d = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.password) !== null && _d !== void 0 ? _d : "root",
            host: (_e = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.host) !== null && _e !== void 0 ? _e : "localhost",
            port: parseInt((_f = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.port) !== null && _f !== void 0 ? _f : "3306"),
            database: (_g = settingsFileRead === null || settingsFileRead === void 0 ? void 0 : settingsFileRead.database) !== null && _g !== void 0 ? _g : "test",
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
        //search if the args have -f
        let pathIndex = args.findIndex((arg) => arg == "-f");
        let path = pathIndex == -1 ? "./interfaces.d.ts" : args[pathIndex + 1];
    }
    return connectionSettings;
}
