
import StatusCommand from '../../src/commands/status';
import DataService from '../../src/Store/DataService';
import { mocked } from 'ts-jest/utils';

jest.mock('../../src/Store/DataService');

describe('status command tests', () => {

    const dataServiceMock = {
        getSessionLogs: jest.fn().mockReturnValue([]),
        getSession: jest.fn().mockReturnValue({
            StartDateTime: (new Date()).toISOString(),
            Notes: ''
        } as ISession)
    } as unknown as DataService;

    beforeEach(() => {
        mocked(DataService).mockImplementation(() => {
            return dataServiceMock
        })
    });

    it('session not null expect logs not called', async () => {

        await StatusCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.getSessionLogs).toHaveBeenCalledTimes(0);
    })

    it('session null expect logs called', async () => {

        dataServiceMock.getSession = jest.fn().mockReturnValue(null);
        
        await StatusCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.getSessionLogs).toHaveBeenCalledTimes(1);
    })
}) 