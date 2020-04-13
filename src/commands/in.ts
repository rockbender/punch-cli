import {Command} from '@oclif/command';
import '../Extensions/DateExtension';
import * as chalk from 'chalk';

export class InCommand extends Command {
  async run() {
    const now = new Date();
    const log = console.log;

    log(`Welcome, punching in at ${chalk.green(now.formattedDateTime())}`);
  }
}