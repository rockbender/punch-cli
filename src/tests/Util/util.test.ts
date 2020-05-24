import { getFormattedDuration } from "../../Util/util";

describe('test util functions', () => {
    it('expect only mins', async () => {
        const duration = 60
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("01 minutes");
    });

    it('expect hour and mins', () => {
        const duration = 60 * 60;
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("1h 00m");
    })

    it('expect 02 minutes', () => {
        const duration = 162.173;
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("02 minutes");
    })
});