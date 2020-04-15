import { resolve } from 'dns';
import { rejects } from 'assert';

const sqlite3 = require('sqlite3').verbose();

export class DataService {
    
    _db: any;

    constructor() {
        this._db = new sqlite3.Database('punch.db', (error: any) => {
            if(error) {
                console.log('Error opening the db.')
            } else {
                // console.log('Successfully connected to the db.');
            }
        });
    }

    async getSession(): Promise<ISession> {
        const promise = new Promise<ISession>((resolve, reject) => {
            this._db.get('SELECT * FROM SESSION', [], (err: any, result: ISession) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })

        return promise;
    }

    async getSessionLogs(): Promise<ISessionLog[]> {
        const promise = new Promise<ISessionLog[]>((resolve, reject) => {
            this._db.all('SELECT * FROM SESSIONLOG', [], (err: any, result: ISessionLog[]) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })

        return promise;
    }

    addSession(date: Date): void {
        const promise = new Promise<ISession>((resolve, reject) => {
            this._db.serialize(() => {
                this._db
                .run('DELETE FROM SESSION')
                .run(`INSERT INTO SESSION VALUES('${date.toISOString()}', '', '')`)
                .each('SELECT * FROM SESSION', (err: any, row: any) => {
                    if(err) {
                        console.log('Error Starting a new session ', err);
                        reject();
                    } else {
                        resolve();
                    }
                })
            });
        });
    }

    endSession(date: Date): void {
        let session: ISession;
        const promise = new Promise((resolve, reject) => {
            this._db.serialize(() => {
                this._db.all('SELECT * FROM SESSION', (err: any, rows: ISession[]) => {
                    if(rows.length > 0) {
                        this._db.run(`INSERT INTO SESSIONLOG(StartDateTime, EndDateTime, Notes) 
                        VALUES (
                            '${rows[0].StartDateTime}',
                            '${date.toISOString()}',
                            '${rows[0].Notes}'
                        )`, (err: any) => {
                            if(err) {
                                console.log("Inserting into SessionLog threw error ", err);
                                reject();
                            } else {
                                resolve();
                            }
                        })
                    }
                }).run('DELETE FROM SESSION', (err: any) => {
                    if(err) {
                        console.log('Error clearing session.');
                        reject();
                    } else {
                        resolve();
                    }
                })
            })
        })
    };

    close(): void {
        this._db.close((err: any) => {
            if(err) {
                console.log('Failed to close the database ', err);
            } else {
                // console.log('Closed the database connection.');
            }
        });
    }
}