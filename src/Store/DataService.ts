import { CoreDataService } from './CoreDataService';
import { DbTables } from './Schemas/Tables';

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
            const stmt = this.dbo.prepare(`SELECT * FROM ${DbTables.SessionLog.Name}`);
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
                let stmt = this.dbo.prepare(`INSERT INTO ${DbTables.SessionLog.Name}(StartDateTime, EndDateTime, Notes) VALUES(?, ?, ?)`);

                stmt.run(currentSession.StartDateTime, date.toISOString(), currentSession.Notes);

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
        this.dbo.close((err: any) => {
            if(err) {
                console.log('Failed to close the database ', err);
            } else {
                console.log('Closed the database connection.');
            }
        });
    }
}