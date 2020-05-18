import '../../src/Extensions/DateExtension';

describe('date extension tests', () => {
    it('formattedDateTime test', () => {
        const date = new Date('2020-01-06T15:53Z');
        const actual = date.formattedDateTime();

        expect(actual).toBe('7:53:00 AM of Jan 6, 2020');
    });

    it('duration test for xh ym', () => {
        const date1 = new Date('2020-01-06T15:53Z');
        let date2 = new Date('2020-01-06T16:58Z');

        let actual = date1.duration(date2);

        expect(actual).toBe('1h 05m');
    });

    it('duration test for y minutes', () => {
        const date1 = new Date('2020-01-06T15:10Z');
        let date2 = new Date('2020-01-06T15:22Z');

        let actual = date1.duration(date2);

        expect(actual).toBe('12 minutes');
    });
})