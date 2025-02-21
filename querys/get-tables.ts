export  const queryToGetTables = `
    SELECT TABLE_NAME 
    FROM information_schema.tables 
    WHERE TABLE_SCHEMA = ?
`;

