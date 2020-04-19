import {Command} from '@oclif/command'
import '../Extensions/DateExtension';
import { DataService } from '../Store/DataService';

export class LogCommand extends Command {
  
  static description = 'View the historical sessions.'

  _db = new DataService();

  async run() {

    const {args, flags} = this.parse(LogCommand);

    const sessionLogs: ISessionLog[] = this._db.getSessionLogs();

    sessionLogs.map(log => {
      log.StartDateTime = (new Date(log.StartDateTime).formattedDateTime());
      log.EndDateTime = (new Date(log.EndDateTime).formattedDateTime());
    });

    console.log('Session Logs: \n', sessionLogs);
  }
}
