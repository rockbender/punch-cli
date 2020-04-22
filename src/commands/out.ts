import {Command} from '@oclif/command'
import '../Extensions/DateExtension';
import { DataService } from '../Store/DataService';
import chalk = require('chalk');
import * as moment from 'moment';

export class OutCommand extends Command {
  
  static description = 'End the current session.'

  _db = new DataService();
  
  async run() {

    const {args, flags} = this.parse(OutCommand);

    const now = new Date();
    const currentSession: ISession = this._db.getSession();

    if(currentSession != null) {
      this._db.endSession(now);
      
      const startDateTime = new Date(currentSession.StartDateTime);
      
      this.log(`\nGoodbye, Session ended. \n`);
      this.log('Summary:\n');
      this.log(chalk.cyan('\tDuration:\t'), chalk.cyan('7h 45m'));
      this.log(chalk.green('\tStart: \t\t'), chalk.green(startDateTime.formattedDateTime()));
      this.log(chalk.green('\tEnd: \t\t'), chalk.green(now.formattedDateTime()));

    } else {
      this.log('No active session found. type punch in to start a new session.')
    }

    this._db.close();
  }
}