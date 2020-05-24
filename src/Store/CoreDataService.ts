/* istanbul ignore file */

import { DbTables, Table } from './Schemas/Tables';
const Database = require('better-sqlite3');
const path = require('path');

/*
 * Description:
 * Core Database support, makes dbo available and disaster recovery in case db becomes corrupt
 */
export class CoreDataService {
    
    readonly DB_NAME: string = "punch.db";
    readonly DB_TABLES: Table[] = [DbTables.Session, DbTables.SessionLog, DbTables.HealthCheck];

    dbo: any;
    dbPath: '';

    constructor() {

        this.dbPath = path.resolve(__dirname, '../data/' + this.DB_NAME);

        if(!this.canOpenConnectionStrict()) {
            this.setupAndOpenDbConnection();
        }
    }

    /*
     * Attempt to open db connection only if db exists.
     * If Db exists then dbo is set otherwise we must call setupAndOpenDbConnection().
     */
    private canOpenConnectionStrict(): boolean {
        try
        {
            this.dbo = Database(this.dbPath, {fileMustExist: true, verbose: (data: any) => {
                //log here
            }});

            // console.log('Db found, connection opened.');
            return true;
        }
        catch(err) {
            console.log('Db not found.');
        }

        return false;
    }

    /*
    * Create a new db with tables and set dbo.
    */
    private setupAndOpenDbConnection(): void {
        try {
            this.dbo = Database(this.dbPath, {verbose: (data: any) => {
                // console.log('db logger ', data);
            }});

            this.createTables();
        }
        catch(err) {
            console.log('Unable to create/open db.');
        }
    }

    /*
    * Create fresh set of tables
    */
    private createTables(): void {
        this.DB_TABLES.forEach((table) => {
            let stmt = this.dbo.prepare(table.Schema);
            try {
                stmt.run();
            }
            catch (err) {
                console.log(`Error creating table ${table.Name}, error: ${err}`);
            }
        });
    }

    /*
     * NOTE: Is only an algorithm right now
     * Perhaps its better to just recreate db regardless
     * Do a check on the database, and resolve issue. This could pontentially become an expensive call
     */
    private healthCheckDb(): void {
        // if(db exists) {
        //     if(tables exits) {
        //         if(can write to tables) {
        //             console.log('Health Check Status: ');
        //         } else {
        //             this.createTables();
        //         }
        //     } else {
        //         this.createDb();
        //         this.createTables();
        //     }
        // } else {
        //     this.createDb();
        //     this.createTables();
        // }

        throw new Error('Method not Implemented');
    }

    /*
     * Feed test data into the db
     */
    private feedTestData(): void {
        throw new Error('Method not Implemented');
    }
}