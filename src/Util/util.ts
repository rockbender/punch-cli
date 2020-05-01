import * as moment from 'moment';

export function getFormattedDuration(milliseconds: number): string {

    const hours = moment.utc(moment.duration(milliseconds, "milliseconds").asMilliseconds()).format("H");
    const mins = moment.utc(moment.duration(milliseconds, "milliseconds").asMilliseconds()).format("mm");

    return hours !== '0' ? `${hours}h ${mins}m` : `${mins} minutes`;
}