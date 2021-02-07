import DataService from "../../Store/DataService";
import OutCommand from "../../commands/out";
import { mocked } from "ts-jest/utils";

jest.mock("../../Store/DataService");

describe("out command test", () => {
  let dataServiceMock = ({
    getSession: jest.fn().mockReturnValue({
      StartDateTime: new Date("1992-01-02").toISOString(),
    }),
    endSession: jest.fn(),
    close: jest.fn(),
  } as unknown) as DataService;

  beforeEach(() => {
    mocked(DataService).mockImplementation(() => {
      return dataServiceMock;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("session expect endSession called", async () => {
    await OutCommand.run([]);

    expect(dataServiceMock.endSession).toBeCalledTimes(1);
  });

  it("session null expect endSession not called", async () => {
    dataServiceMock.getSession = jest.fn().mockReturnValue(null);

    await OutCommand.run([]);

    expect(dataServiceMock.endSession).toBeCalledTimes(0);
  });
});
