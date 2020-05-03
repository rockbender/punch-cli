import {Command, flags} from '@oclif/command'
import { DataService } from '../Store/DataService'
import chalk = require('chalk');

export default class StatusCommand extends Command {
  
  static description = 'Shows the currently running session. If an active session is not found then the last session summary is shown.';
  static aliases = ['s'];

  _db = new DataService();

  async run() {
    const {args, flags} = this.parse(StatusCommand);

    const currentSession: ISession = this._db.getSession();

    if(currentSession == null) {

      this.log('\nNo active session found.');

      const sessions: ISession[] = this._db.getSessionLogs();

      if(sessions.length > 0) {
        this.log('\nLast session summary:\n');

        const lastSession = sessions[0];

        const startDateTime = new Date(lastSession.StartDateTime);
        const endDateTime = new Date(lastSession.EndDateTime);

        this.log(chalk.cyan('\tDuration:\t'), chalk.cyan(startDateTime.duration(endDateTime)));
        this.log(chalk.green('\tStart: \t\t'), chalk.green(startDateTime.formattedDateTime()));
        this.log(chalk.green('\tEnd: \t\t'), chalk.green(endDateTime.formattedDateTime()));
        this.log(chalk.green('\tNotes:\t\t'), chalk.green(lastSession.Notes === '' ? '-' : lastSession.Notes));
      }
    } else {

      this.log('\nCurrent session:\n');
      
      const now = new Date();
      const startDateTime = new Date(currentSession.StartDateTime);

      this.log(chalk.cyan('\tDuration:\t'), chalk.cyan(startDateTime.duration(now)));
      this.log(chalk.green('\tStart: \t\t'), chalk.green(startDateTime.formattedDateTime()));
      this.log(chalk.green('\tEnd: \t\t'), chalk.green('-'));
      this.log(chalk.green('\tNotes:\t\t'), chalk.green(currentSession.Notes === '' ? '-' : currentSession.Notes));
    }
  }
}
