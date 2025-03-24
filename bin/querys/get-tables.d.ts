export declare const queryToGetTables = "\n    SELECT TABLE_NAME \n    FROM information_schema.tables \n    WHERE TABLE_SCHEMA = ?\n";
