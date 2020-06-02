import {Command, flags} from '@oclif/command';
import '../Extensions/DateExtension';
import * as chalk from 'chalk';
import DataService from '../Store/DataService';

export default class InCommand extends Command {

  static description = 'Start a new session. Use -f to restart current session.';
  static aliases = ['i'];
  static flags = {
    force: flags.boolean({char: 'f'}), // (-f, --force)
    message: flags.string({char: 'm'}),
    amend: flags.string({char: 'a'})
  };
  
  private db = new DataService();
  private flags = this.parse(InCommand).flags;
  
  async run() {
    
    const now = new Date();
    const currentSession: ISession = this.db.getSession();

    if (this.flags.force || currentSession == null) {

      this.doPunchIn(now);

    } else if (this.flags.amend) {
      if(currentSession == null) {
        this.log('\nNo active session found to amend. Try the command without -a');
      } else {
        const message = this.flags.amend == null ? '' : this.flags.amend;
        this.db.updateCurrentSession(message);

        const currentSession = this.db.getSession();

        this.log('\nCurrent session:\n');
      
        const now = new Date();
        const startDateTime = new Date(currentSession.StartDateTime);
  
        this.log(chalk.yellow('\tDuration:\t'), chalk.yellow(startDateTime.duration(now)));
        this.log(chalk.green('\tStart: \t\t'), chalk.green(startDateTime.formattedDateTime()));
        this.log(chalk.green('\tEnd: \t\t'), chalk.green('-'));
        this.log(chalk.green('\tNotes:\t\t'), chalk.green(currentSession.Notes === '' ? '-' : currentSession.Notes));

      }
    } else {
      
      let startDateTime = new Date(currentSession.StartDateTime);
      this.log(`\nSession running since, ${chalk.green(startDateTime.formattedDateTime())}.\nTo reset, type in ${chalk.bold('punch in -f')}`);

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
