import { getFormattedDuration } from "../../src/Util/util";

describe('test util functions', () => {
    it('expect only mins', async () => {
        const duration = 60 * 1000
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("01 minutes");
    });

    it('expect hour and mins', () => {
        const duration = 60 * 1000 * 60;
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("1h 00m");
    })

    it('expect 00 minutes', () => {
        const duration = 45 * 1000;
        const actual = getFormattedDuration(duration);

        expect(actual).toBe("00 minutes");
    })
});