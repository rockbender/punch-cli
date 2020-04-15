import {Command} from '@oclif/command'
import '../Extensions/DateExtension';
import { DataService } from '../Store/DataService';
import chalk = require('chalk');

export class OutCommand extends Command {
  
  static description = 'End the current session.'

  _db = new DataService();
  
  async run() {
    const now = new Date();

    let currentSession: ISession = null as unknown as ISession;

    await this._db.getSession().then((data: ISession) => {
      currentSession = data;
    });

    if(currentSession != null) {
      this._db.endSession(now);
      this.log(`Ended session at ${chalk.green(now.formattedDateTime())}.`)
    } else {
      this.log('No active session found. type punch in to start a new session.')
    }
  }
}