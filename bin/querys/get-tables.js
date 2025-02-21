"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryToGetTables = void 0;
exports.queryToGetTables = `
    SELECT TABLE_NAME 
    FROM information_schema.tables 
    WHERE TABLE_SCHEMA = ?
`;
