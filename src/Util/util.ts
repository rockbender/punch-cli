import * as moment from 'moment';

export function getFormattedDuration(seconds: number): string {

    const hours = moment.utc(moment.duration(seconds, "seconds").asMilliseconds()).format("H");
    const mins = moment.utc(moment.duration(seconds, "seconds").asMilliseconds()).format("mm");

    return hours !== '0' ? `${hours}h ${mins}m` : `${mins} minutes`;
}