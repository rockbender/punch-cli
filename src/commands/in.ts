import {Command, flags} from '@oclif/command';
import '../Extensions/DateExtension';
import * as chalk from 'chalk';
import { DataService } from '../Store/DataService';

export class InCommand extends Command {

  static description = 'Start a new work session. Use -f to restart current session.'
  static flags = {
    force: flags.boolean({char: 'f'}) // (-f, --force)
  }

  _db = new DataService();
  
  async run() {
    
    const {args, flags} = this.parse(InCommand);
    const now = new Date();
    
    let currentSession: ISession = null as unknown as ISession;

    await this._db.getSession().then((data: ISession) => {
      currentSession = data;
    });

    if(flags.force) {
      this.doPunchIn(now);
    } else {
      if(currentSession != null) {
        this.log(`Current session running since, ${chalk.green(currentSession.StartDateTime)}. To reset, type in ${chalk.blue('punch in -f')}`);
      } else {
        this.doPunchIn(now);
      }
    }

    this._db.close();
  }

  doPunchIn(date: Date) {
    this._db.addSession(date);
    this.log(`Welcome, punching in at ${chalk.green(date.formattedDateTime())}`);
  }

}
