export const SessionSchema = 
    `CREATE TABLE SESSION ( StartDate TEXT, EndDate Text, Notes Text )`;

export const SessionLogSchema =
    `CREATE TABLE SESSIONLOG (id INTEGER PRIMARY KEY AUTOINCREMENT, StartDate TEXT, EndDate Text, Notes Text )`

export const HealthCheckSchema =
    `CREATE TABLE HEALTHCHECKLOG (TimeStamp TEXT, Reason TEXT)`