import { CoreDataService } from './CoreDataService';
import { DbTables } from './Schemas/Tables';
import moment = require('moment');

export class DataService extends CoreDataService {
    
    constructor() {
        super();    //Call the base class which does sets the dbo
    }

    getSession(): ISession {

        let result: ISession = null as unknown as ISession;

        try {
            let stmt = this.dbo.prepare(`SELECT * FROM ${DbTables.Session.Name}`);
            result = stmt.get();
        }
        catch(err) {
            console.log('Error getting session ', err);
        }

        return result;
    }

    getSessionLogs(): ISessionLog[] {

        let result: ISessionLog[] = [];
        
        try {
            const stmt = this.dbo.prepare(`SELECT * FROM ${DbTables.SessionLog.Name} order by id desc`);
            result = stmt.all();
        }
        catch(err) {
            console.log('Error getting session logs ', err);
        }

        return result;
    }

    addSession(date: Date): void {
        let stmt: any;

        try {
            console.log('Session (before)', this.getSession());

            stmt = this.dbo.prepare(`DELETE FROM ${DbTables.Session.Name}`);
            stmt.run();

            stmt = this.dbo.prepare(`INSERT INTO ${DbTables.Session.Name} VALUES(?, ?, ?)`);
            stmt.run(date.toISOString(), '', '');

            console.log('Session (after)', this.getSession());
        }
        catch(err) {
            console.log('Error throw while adding a new session ', err);
        }
    }

    endSession(date: Date): void {
        const trans = this.dbo.transaction(() => {
            console.log('Transaction started');

            try {
                let currentSession: ISession = this.getSession();
                let stmt = this.dbo.prepare(`INSERT INTO ${DbTables.SessionLog.Name}(
                    StartDateTime, EndDateTime, Duration, Notes) VALUES(?, ?, ?, ?)`);

                const st = moment(currentSession.StartDateTime);
                const et = moment(date.toISOString());

                stmt.run(currentSession.StartDateTime, date.toISOString(), et.diff(st, 'seconds'), currentSession.Notes);

                stmt = this.dbo.prepare(`DELETE FROM ${DbTables.Session.Name}`);
                stmt.run();
            }
            catch(err) {
                if(!this.dbo.inTransaction) {
                    console.log('Transaction abruptly ended with error ', err);
                } else {
                    console.log('Transaction failed without rolling back.');
                }
            }

            console.log('Transaction ended');
        });

        trans();
    }

    close(): void {
        try {
            this.dbo.close();
            console.log('Closed db connection');
        }
        catch(err) {
            console.log('Failed to close connection ', err);
        }
    }
}