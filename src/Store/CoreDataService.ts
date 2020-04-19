import { DbTables, Table } from './Schemas/Tables';
const sqlite3 = require('sqlite3').verbose();
// import sqlite3 = require('better-sqlite3');

/*
 * Description:
 * This file is for app's first run and disaster recovery in case db becomes corrupt
 */
export class CoreDataService {
    
    readonly DB_NAME: string = "punch.db";
    readonly DB_TABLES: Table[] = [DbTables.Session, DbTables.SessionLog, DbTables.HealthCheck];

    dbo: any;

    constructor() {
        console.log('Running Core data service...');

        console.log('1');
        this.openOrCreateDb();
        console.log('4');
    }

    /*
    * Open db if exists or else create one and then open a connection to it.
    */
    private openOrCreateDb(): void {
        this.dbo = new sqlite3.Database(this.DB_NAME, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: any) => {
            if(err) {
                console.log('2. Failed to create a new database. ', err);
            } else {
                console.log('2. Created database.');
            }

            console.log('3');
        });
    }

    /*
    * Create fresh set of tables
    */
    private createTables(): void {
        this.DB_TABLES.forEach((table) => {
            this.dbo.exec(table.Schema, (err: any) => {
                if(err) {
                    console.log(`Failed to create table ${table.Name}, error ${err.message}`);
                } else {
                    console.log('Created table ', table.Name);
                }
            });
        });
    }

    /*
     * NOTE: Is only an algorithm right now
     * Perhaps its better to just recreate db regardless?
     * Do a check on the database, and resolve issue. This is an expensive call
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

    /*
    * Close the database connection
    */
    public closeDbConnection(): void {
        this.dbo.close((err: any) => {
            if(err) {
                console.log('Failed to close db connection ', err.message);
            }
        });
    }
}