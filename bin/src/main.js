#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTablesRegisters = exports.createInterfaceFile = void 0;
require("dotenv/config");
const connection_settings_1 = require("../connection/connection-settings");
const create_interface_file_1 = require("./create-interface-file");
const get_tables_registers_1 = require("./get-tables-registers");
//read the connection settings from a json file
let settings;
function readSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        //validate if the file exists
        settings = yield (0, connection_settings_1.getConnectionSettings)();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield readSettings();
        const tables = yield (0, get_tables_registers_1.getTablesRegisters)(settings);
        yield (0, create_interface_file_1.createInterfaceFile)(tables, settings);
        console.log("file created, Done 🎉");
        process.exit(0);
    });
}
run();
//export functions
var create_interface_file_2 = require("./create-interface-file");
Object.defineProperty(exports, "createInterfaceFile", { enumerable: true, get: function () { return create_interface_file_2.createInterfaceFile; } });
var get_tables_registers_2 = require("./get-tables-registers");
Object.defineProperty(exports, "getTablesRegisters", { enumerable: true, get: function () { return get_tables_registers_2.getTablesRegisters; } });
