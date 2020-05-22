
import StatusCommand from '../../src/commands/status';
import DataService from '../../src/Store/DataService';
import { mocked } from 'ts-jest/utils';
import Base from '../../src/Util/testBase';

jest.mock('../../src/Store/DataService');

describe('status command tests', () => {

    let dataServiceMock: DataService;

    beforeEach(() => {

        dataServiceMock = Base.dataServiceMock;

        mocked(DataService).mockImplementation(() => {
            return dataServiceMock
        })
    });

    it('session not null expect logs not called', async () => {

        await StatusCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.getSessionLogs).toHaveBeenCalledTimes(0);
    })

    it('session null expect logs 0 called', async () => {

        dataServiceMock.getSession = jest.fn().mockReturnValue(null);
        dataServiceMock.getSessionLogs = jest.fn().mockReturnValue([]);
        
        await StatusCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.getSessionLogs).toHaveBeenCalledTimes(1);
    })

    it('session null expect logs > 0 and called', async () => {
        dataServiceMock.getSession = jest.fn().mockReturnValue(null);

        await StatusCommand.run([]);

        expect(dataServiceMock.getSessionLogs).toBeCalledTimes(1);
    })
}) 