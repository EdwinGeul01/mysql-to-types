#!/usr/bin/env node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
require("dotenv/config");
const fs = __importStar(require("fs"));
const get_tables_1 = require("../querys/get-tables");
const get_columns_descriptions_1 = require("../querys/get-columns-descriptions");
const connection_1 = require("../connection/connection");
const create_interface_file_1 = require("./create-interface-file");
//read the connection settings from a json file
exports.settings = JSON.parse(fs.readFileSync("conection-sql-ts.json", "utf-8"));
//validate if the file exists
if (!exports.settings) {
    throw new Error("Settings file not found, please create it.");
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        //get the connection from the pool
        const con = yield connection_1.connection.getConnection();
        // get all the tables schemas
        const resultQueryTables = yield con.query(get_tables_1.queryToGetTables);
        //get all the tables names
        const tablesNames = resultQueryTables[0].map((table) => {
            return table.TABLE_NAME;
        });
        //variable to store the tables
        const tables = [];
        //get all the tables descriptions
        const descriptionFromAllTables = yield con.query(get_columns_descriptions_1.queryToGetColumnDescription);
        try {
            // for each table get the columns descriptions
            for (var _d = true, tablesNames_1 = __asyncValues(tablesNames), tablesNames_1_1; tablesNames_1_1 = yield tablesNames_1.next(), _a = tablesNames_1_1.done, !_a; _d = true) {
                _c = tablesNames_1_1.value;
                _d = false;
                const t = _c;
                const descriptionFromTable = descriptionFromAllTables[0].filter((table) => table["TABLE_NAME"] == t);
                //if the table has columns
                if (descriptionFromTable.length > 0) {
                    const columns = descriptionFromTable.map((column) => {
                        return {
                            name: column.Column,
                            type: column.Type,
                            comment: column.Comment,
                            default: column["DefaultValue"],
                            extra: column.Extras,
                            key: column.Key,
                            nullable: column["Nullable"],
                        };
                    });
                    tables.push({
                        name: t,
                        description: "",
                        columns,
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = tablesNames_1.return)) yield _b.call(tablesNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        yield (0, create_interface_file_1.createInterfaceFile)(tables);
        yield con.release();
        console.log("file created, Done 🎉");
        process.exit(0);
    });
}
getData();
