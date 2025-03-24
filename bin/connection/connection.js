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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2 = __importStar(require("mysql2/promise"));
class connection {
    /**
     * Get a connection from the pool
     * @returns The connection
     */
    static getConnection(connectionSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const pool = mysql2.createPool({
                host: (_a = connectionSettings === null || connectionSettings === void 0 ? void 0 : connectionSettings.host) !== null && _a !== void 0 ? _a : "localhost",
                user: (_b = connectionSettings === null || connectionSettings === void 0 ? void 0 : connectionSettings.user) !== null && _b !== void 0 ? _b : "root",
                database: (_c = connectionSettings === null || connectionSettings === void 0 ? void 0 : connectionSettings.database) !== null && _c !== void 0 ? _c : "test",
                password: (_d = connectionSettings === null || connectionSettings === void 0 ? void 0 : connectionSettings.password) !== null && _d !== void 0 ? _d : "root",
                port: (_e = connectionSettings === null || connectionSettings === void 0 ? void 0 : connectionSettings.port) !== null && _e !== void 0 ? _e : 3306,
                waitForConnections: true,
                connectionLimit: 10,
                maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
                idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
                queueLimit: 0,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0,
            });
            const connection = yield pool.getConnection();
            return connection;
        });
    }
}
exports.connection = connection;
