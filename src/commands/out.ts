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

    // this.getDuration(now, now);

    if(currentSession != null) {
      this._db.endSession(now);
      this.log(`Session ended at ${chalk.green(now.formattedDateTime())}.`)
    } else {
      this.log('No active session found. type punch in to start a new session.')
    }
  }

  getDuration(startDate: Date, endDate: Date): void {
    let now = new Date();

    startDate = now;
    
    now.setMinutes(now.getMinutes() + 20);
    endDate = now;

    let m1 = moment(startDate);
    let m2 = moment(endDate);

    let duration = m1.diff(m2);

    console.log('duration is ', duration);
  }
}