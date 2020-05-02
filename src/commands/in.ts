import {Command, flags} from '@oclif/command';
import '../Extensions/DateExtension';
import * as chalk from 'chalk';
import { DataService } from '../Store/DataService';

export class InCommand extends Command {

  static description = 'Start a new work session. Use -f to restart current session.';
  static aliases = ['i'];
  static flags = {
    force: flags.boolean({char: 'f'}) // (-f, --force)
  };

  _db = new DataService();
  
  async run() {
    
    const {args, flags} = this.parse(InCommand);

    const now = new Date();
    const currentSession: ISession = this._db.getSession();

    if(flags.force) {
      this.doPunchIn(now);
    } else {
      if(currentSession != null) {
        let startDateTime = new Date(currentSession.StartDateTime);
        this.log(`\nSession running since, ${chalk.green(startDateTime.formattedDateTime())}. To reset, type in ${chalk.blue('punch in -f')}`);
      } else {
        this.doPunchIn(now);
      }
    }

    this._db.close();
  }

  doPunchIn(date: Date) {
    this._db.addSession(date);
    this.log(`\n Welcome, session started at: \n\n\t ${chalk.green(date.formattedDateTime())}`);
  }

}
