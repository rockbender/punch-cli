export const SessionSchema = 
    `CREATE TABLE SESSION ( StartDateTime TEXT, EndDateTime Text, Notes Text )`;

export const SessionLogSchema =
    `CREATE TABLE SESSIONLOG (id INTEGER PRIMARY KEY AUTOINCREMENT, StartDateTime TEXT, EndDateTime Text, Notes Text )`

export const HealthCheckSchema =
    `CREATE TABLE HEALTHCHECKLOG (TimeStamp TEXT, Reason TEXT)`