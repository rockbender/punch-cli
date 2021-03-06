export {};

import * as moment from "moment";
import { getFormattedDuration } from "../Util/util";

declare global {
  interface Date {
    formattedDateTime(): string;
    duration(toDateTime: Date): string;
  }
}

const MONTH_NAMES_SHORT: ReadonlyArray<string> = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

Date.prototype.formattedDateTime = function (): string {
  return `${this.toLocaleTimeString()} of ${
    MONTH_NAMES_SHORT[this.getMonth()]
  } ${this.getDate()}, ${this.getFullYear()}`;
};

Date.prototype.duration = function (toDateTime: Date): string {
  const m1 = moment(this);
  const m2 = moment(toDateTime);

  const seconds = m2.diff(m1, "s");

  return getFormattedDuration(seconds);
};
