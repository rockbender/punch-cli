import {Command} from '@oclif/command'
import '../Extensions/DateExtension';
import { DataService } from '../Store/DataService';

export class LogCommand extends Command {
  
  static description = 'View the historical sessions.'

  _db = new DataService();

  async run() {
    let sessionLogs: ISessionLog[] = [];
    await this._db.getSessionLogs().then((logs: ISessionLog[]) => {
      sessionLogs = logs;
    });

    console.log('Session Logs: \n', sessionLogs);
  }
}
