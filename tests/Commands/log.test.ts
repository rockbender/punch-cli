import DataService from '../../src/Store/DataService';
import Base from '../../src/Util/testBase';
import LogCommand from '../../src/commands/log';
import { mocked } from 'ts-jest/utils';

jest.mock('../../src/Store/DataService');

describe('test log command', () => {

    let dataServiceMock = {} as DataService;

    beforeEach(() => {
        dataServiceMock = Base.dataServiceMock;

        mocked(DataService).mockImplementationOnce(() => {
            return dataServiceMock;
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('expect getSessionLogs is called', async () => {
        await LogCommand.run([]);
        expect(mocked(dataServiceMock.getSessionLogs)).toBeCalledTimes(1);
    })
})