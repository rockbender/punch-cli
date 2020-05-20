import DataService from '../../src/Store/DataService';
import OutCommand from '../../src/commands/out';
import { mocked } from 'ts-jest/utils';

jest.mock('../../src/Store/DataService');

describe('out command test', () => {

    let dataServiceMock = {
        getSession: jest.fn().mockReturnValue(null),
        endSession: jest.fn(),
        close: jest.fn()
    } as unknown as DataService;

    mocked(DataService).mockImplementation(() => {
        return dataServiceMock
    });

    it('session expect endSession called', async () => {
        
        dataServiceMock.getSession = jest.fn().mockReturnValue({
            StartDateTime: (new Date()).toISOString()
        });

        await OutCommand.run([]);
        
        expect(dataServiceMock.endSession).toBeCalledTimes(1);
    });

    it('session null expect endSession not called', async () => {

        dataServiceMock.getSession = jest.fn().mockReturnValue(null);

        await OutCommand.run([]);
        
        console.log(dataServiceMock.getSession());
        expect(dataServiceMock.endSession).toBeCalledTimes(0);
    });
})