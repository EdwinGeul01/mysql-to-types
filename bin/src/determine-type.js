"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineType = determineType;
function determineType(c) {
    let columnString = ``;
    //if the column include spaces
    if (c.name.includes(" ")) {
        c.name = '["' + c.name + '"]';
    }
    if (c.comment) {
        columnString += `/** \n* ${c.comment} \n*/\n`;
    }
    if (c.nullable == "YES") {
        columnString += `${c.name}?: `;
    }
    else {
        columnString += `${c.name}: `;
    }
    const typeToTypescript = convertMysqlTypeToTsType(c.type);
    //determinie the type
    columnString += typeToTypescript;
    if (c.nullable == "YES") {
        columnString += " | null";
    }
    columnString += ";\n";
    return columnString;
}
function convertMysqlTypeToTsType(mysqlType) {
    //if is string
    if (mysqlType.includes("varchar") ||
        mysqlType.includes("text") ||
        mysqlType.includes("char")) {
        return "string";
    }
    //if is number
    if (mysqlType.includes("int") ||
        mysqlType.includes("bigint") ||
        mysqlType.includes("decimal") ||
        mysqlType.includes("float") ||
        mysqlType.includes("double") ||
        mysqlType.includes("boolean")) {
        return "number";
    }
    //if is boolean
    if (mysqlType.includes("boolean")) {
        return "boolean";
    }
    //if is date
    if (mysqlType.includes("date") ||
        mysqlType.includes("time") ||
        mysqlType.includes("datetime")) {
        return "Date | string";
    }
    // if is json
    if (mysqlType.includes("json")) {
        return "json_type";
    }
    return "any";
}
