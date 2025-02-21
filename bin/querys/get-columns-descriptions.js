"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryToGetColumnDescription = void 0;
exports.queryToGetColumnDescription = `
    SELECT 
        COLUMN_NAME AS 'Column',
        COLUMN_TYPE AS 'Type',
        IS_NULLABLE AS 'Nullable',
        COLUMN_KEY AS 'Key',
        COLUMN_DEFAULT AS 'DefaultValue',
        EXTRA AS 'Extras',
        COLUMN_COMMENT AS 'Comment',
        TABLE_NAME
    FROM 
        information_schema.columns
    WHERE 
        TABLE_SCHEMA = ? 
`;
