import { Command } from "@oclif/command";
import "../Extensions/DateExtension";
import DataService from "../Store/DataService";
import { getFormattedDuration } from "../Util/util";

export default class LogCommand extends Command {
  static description = "View the historical sessions.";
  static aliases = ["l"];

  _db = new DataService();

  async run() {
    const { args, flags } = this.parse(LogCommand);

    const sessionLogs: ISessionLog[] = this._db.getSessionLogs();

    sessionLogs.map((log) => {
      log.StartDateTime = new Date(log.StartDateTime).formattedDateTime();
      log.EndDateTime = new Date(log.EndDateTime).formattedDateTime();
      log.Duration = getFormattedDuration((log.Duration as unknown) as number);
    });

    this._db.close();

    console.table(sessionLogs);
  }
}
