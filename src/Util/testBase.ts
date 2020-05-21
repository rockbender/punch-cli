import DataService from "../Store/DataService";

export default class base {

    private static session = {
        StartDateTime: '2020-05-21T01:24:26.606Z',
        EndDateTime: '2020-05-21T01:52:21.236Z',
        Notes: 'mock notes'
    } as ISession;

    private static sessionLogs: ISessionLog[] = [
        {   
            Id: 1,
            StartDateTime: '2020-05-21T01:24:26.606Z',
            EndDateTime: '2020-05-21T01:52:21.236Z',
            Duration: '28 minutes',
            Notes: 'mock notes'
         } as ISessionLog,
         { 
            Id: 2,
            StartDateTime: '2020-05-21T01:24:26.606Z',
            EndDateTime: '2020-05-21T01:26:26.236Z',
            Duration: '2 minutes',
            Notes: 'mock notes'
         } as ISessionLog,
         { 
            Id: 3,
            StartDateTime: '2020-05-21T01:24:26.606Z',
            EndDateTime: '2020-05-21T01:34:21.236Z',
            Duration: '10 minutes',
            Notes: 'mock notes'
         } as ISessionLog
    ];

    static get dataServiceMock() {
        const mock = {
            getSession: jest.fn().mockReturnValue(this.session),
            getSessionLogs: jest.fn().mockReturnValue(this.sessionLogs),
            addSession: jest.fn(),
            close: jest.fn(),
            endSession: jest.fn(),

        } as unknown as DataService;

        return mock;
    }
}