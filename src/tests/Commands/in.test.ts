import InCommand from "../../commands/in";
import DataService from "../../Store/DataService";
import { mocked } from "ts-jest/utils";

jest.mock("../../Store/DataService");

describe("test in command", () => {
  let dataServiceMock = {} as DataService;

  beforeEach(() => {
    dataServiceMock = ({
      getSession: jest.fn().mockReturnValue({
        StartDateTime: "2020-05-01T10:30:00.500Z",
      }),
      addSession: jest.fn(),
      close: jest.fn(),
    } as unknown) as DataService;

    mocked(DataService).mockImplementation(() => {
      return dataServiceMock;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("current session null expect session created", async () => {
    dataServiceMock.getSession = jest.fn().mockReturnValue(null);

    await InCommand.run([]);

    expect(dataServiceMock.getSession).toBeCalledTimes(1);
    expect(dataServiceMock.addSession).toBeCalledTimes(1);
  });

  it("current session expect session not created", async () => {
    await InCommand.run([]);

    expect(dataServiceMock.getSession).toBeCalledTimes(1);
    expect(dataServiceMock.addSession).toBeCalledTimes(0);
  });
});
