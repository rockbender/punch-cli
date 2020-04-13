import {Command} from '@oclif/command'
import '../Extensions/DateExtension';

export class OutCommand extends Command {
  async run() {
    const now = new Date();
    console.log('Goodbye, punching out at ', now.formattedDateTime());
  }
}