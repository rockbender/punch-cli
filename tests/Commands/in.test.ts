
import InCommand from '../../src/commands/in';
import DataService from '../../src/Store/DataService';
import { mocked } from 'ts-jest/utils';

jest.mock('../../src/Store/DataService');

describe('test in command', () => {
    const dataServiceMock = {
        getSession: jest.fn().mockReturnValue({
            StartDateTime: '2020-05-01T10:30:00.500Z'
        } as ISession),
        addSession: jest.fn(),
        close: jest.fn()
    } as unknown as DataService;

    beforeEach(() => {
        mocked(DataService).mockImplementationOnce(() => {
            return dataServiceMock
        })
    });

    //TODO Rishi - When the order of these tests are changed, running suite test fails. Check mock clear works

    it('current session expect session not created', async () => {

        await InCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.addSession).toBeCalledTimes(0);
    })

    it('current session null expect session created', async () => {
        dataServiceMock.getSession = jest.fn().mockReturnValue(null);

        await InCommand.run([]);

        expect(dataServiceMock.getSession).toBeCalledTimes(1);
        expect(dataServiceMock.addSession).toBeCalledTimes(1);
    })
});