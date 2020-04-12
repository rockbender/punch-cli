import {Command} from '@oclif/command';
import '../Extensions/DateExtension';

export class GoodbyeCommand extends Command {
  async run() {
    const now = new Date();
    console.log(`Welcome, punching in at ${now.formattedDateTime()} \n` );
  }
}