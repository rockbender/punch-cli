import { DbTables, Table } from './Schemas/Tables';
import { boolean } from '@oclif/command/lib/flags';
// const sqlite3 = require('sqlite3').verbose();
// import sqlite3 = require('better-sqlite3');
const Database = require('better-sqlite3');

/*
 * Description:
 * Core Database support, makes dbo available and disaster recovery in case db becomes corrupt
 */
export class CoreDataService {
    
    readonly DB_NAME: string = "punch.db";
    readonly DB_TABLES: Table[] = [DbTables.Session, DbTables.SessionLog, DbTables.HealthCheck];

    dbo: any;

    constructor() {
        console.log('Running Core data service...');

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
            this.dbo = Database(this.DB_NAME, {fileMustExist: true, verbose: (data: any) => {
                console.log('checkDbExists log', data);
            }});

            console.log('Db found, connection opened.');
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
            this.dbo = Database(this.DB_NAME, {verbose: (data: any) => {
                console.log('db logger ', data);
            }});

            console.log('Created new db.');

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
                console.log('Creating table', table.Name);
                stmt.run();
            }
            catch (err) {
                console.log(`Error creating table ${table.Name}, error: ${err}`);
            }
        });
    }

    /*
     * NOTE: Is only an algorithm right now
     * Perhaps its better to just recreate db regardless?
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