import {Command, flags} from '@oclif/command';
import '../Extensions/DateExtension';
import * as chalk from 'chalk';
import DataService from '../Store/DataService';

export default class InCommand extends Command {

  static description = 'Start a new work session. Use -f to restart current session.';
  static aliases = ['i'];
  static flags = {
    force: flags.boolean({char: 'f'}), // (-f, --force)
    message: flags.string({char: 'm'}),
  };
  
  private db = new DataService();
  private flags = this.parse(InCommand).flags;
  
  async run() {
    
    const now = new Date();
    const currentSession: ISession = this.db.getSession();

    if (this.flags.force || currentSession == null) {

      this.doPunchIn(now);

    } else {
      
      let startDateTime = new Date(currentSession.StartDateTime);
      this.log(`\nSession running since, ${chalk.green(startDateTime.formattedDateTime())}. To reset, type in ${chalk.blue('punch in -f')}`);

    }

    this.db.close();
  }

  doPunchIn(date: Date) {

    const message = this.flags.message == null ? '' : this.flags.message;

    this.db.addSession(date, message);
    
    this.log(`\nWelcome, session started. \n`);
    this.log(`\tStartDateTime: \t${chalk.green(date.formattedDateTime())}`)

    if(message.length > 0) {
      this.log(`\tNote: \t\t${chalk.green(message)}`);
    }
  }
}
