import DataService from '../../Store/DataService';
import Base from '../../Util/testBase';
import LogCommand from '../../commands/log';
import { mocked } from 'ts-jest/utils';

jest.mock('../../Store/DataService');

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