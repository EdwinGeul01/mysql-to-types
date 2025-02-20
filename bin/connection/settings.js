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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2 = __importStar(require("mysql2/promise"));
const connection_settings_1 = require("./connection-settings");
//read the connection settings from a json file
const settings = (0, connection_settings_1.getConnectionSettings)();
//JSON.parse(fs.readFileSync("conection-sql-ts.json", "utf-8"));
//validate if the file exists
if (!settings) {
    throw new Error("Settings file not found, please create it.");
}
//connection from mysql2
exports.pool = mysql2.createPool({
    host: (_a = settings === null || settings === void 0 ? void 0 : settings.host) !== null && _a !== void 0 ? _a : "localhost",
    user: (_b = settings === null || settings === void 0 ? void 0 : settings.user) !== null && _b !== void 0 ? _b : "root",
    database: (_c = settings === null || settings === void 0 ? void 0 : settings.database) !== null && _c !== void 0 ? _c : "test",
    password: (_d = settings === null || settings === void 0 ? void 0 : settings.password) !== null && _d !== void 0 ? _d : "root",
    port: (_e = settings === null || settings === void 0 ? void 0 : settings.port) !== null && _e !== void 0 ? _e : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
