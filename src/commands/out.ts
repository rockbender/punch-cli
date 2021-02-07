import { Command, flags } from "@oclif/command";
import "../Extensions/DateExtension";
import DataService from "../Store/DataService";
import chalk = require("chalk");

export default class OutCommand extends Command {
  static description = "End the current session.";
  static aliases = ["o"];
  static flags = {
    message: flags.string({
      char: "m",
      description: "Update the notes to the session to be ended.",
    }),
  };

  private _db = new DataService();
  private flags = this.parse(OutCommand).flags;

  async run() {
    const { args, flags } = this.parse(OutCommand);

    const now = new Date();
    const currentSession: ISession = this._db.getSession();

    if (currentSession != null) {
      const message =
        this.flags.message == null ? currentSession.Notes : this.flags.message;

      this._db.endSession(now, message);

      const startDateTime = new Date(currentSession.StartDateTime);

      this.log(`\nGoodbye, Session ended. \n`);
      this.log("Summary:\n");
      this.log(
        chalk.yellow("\tDuration:\t"),
        chalk.yellow(startDateTime.duration(now))
      );
      this.log(
        chalk.green("\tStart: \t\t"),
        chalk.green(startDateTime.formattedDateTime())
      );
      this.log(
        chalk.green("\tEnd: \t\t"),
        chalk.green(now.formattedDateTime())
      );
      this.log(chalk.green("\tNotes:\t\t"), chalk.green(message));
    } else {
      this.log(
        "No active session found. type punch in to start a new session."
      );
      this.log("To add/amend the note to the last session, use switch -m");

      //TODO Rishi - Implement amending the note the last session.
    }

    this._db.close();
  }
}
