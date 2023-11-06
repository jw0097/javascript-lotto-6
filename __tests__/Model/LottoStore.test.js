import LottoStore from "../../src/Model/LottoStore";
import Lotto from "../../src/Lotto";

jest.mock("../../src/Lotto");

let lottoIndex = 0;
const mockLottos = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 7],
  [1, 2, 7, 8, 9, 10],
  [1, 2, 3, 4, 7, 10],
];

let matchResultIndex = 0;
const mockMatchResult = [
  {
    lottoWinningNumbersMatchCount: 6,
    bonousNumberMatchCount: 0,
  },
  {
    lottoWinningNumbersMatchCount: 5,
    bonousNumberMatchCount: 1,
  },
  {
    lottoWinningNumbersMatchCount: 2,
    bonousNumberMatchCount: 1,
  },
  {
    lottoWinningNumbersMatchCount: 4,
    bonousNumberMatchCount: 1,
  },
];

Lotto.mockImplementation(() => {
  return {
    getNumbers: jest.fn(() => mockLottos[lottoIndex++]),
    matchNumbers: jest.fn(() => mockMatchResult[matchResultIndex++]),
  };
});

let lottoStore;
describe("LottoStore 클래스 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    lottoStore = new LottoStore(mockLottos.length);
  });
  test("LottoStore 인스턴스를 생성할 수 있어야 한다.", () => {
    // then
    expect(lottoStore).toBeDefined();
  });

  test("LottoStore 인스턴스가 생성되면 purchaseQuantit 값 만큼의 Lotto 인스턴스가 생성되야 한다.", () => {
    // then
    expect(Lotto).toBeCalledTimes(mockLottos.length);
  });

  test("getLottoNumbers 메서드가 존재해야 한다.", () => {
    expect(typeof lottoStore.getLottoNumbers).toBe("function");
  });

  test("getLottoNumbers 메서드가 구매한 로또들의 번호를 반환해야 한다.", () => {
    const lottoNumbers = lottoStore.getLottoNumbers();
    expect(lottoNumbers).toEqual(mockLottos);
  });

  test("getLottoMatchResult 메서드가 존재해야 한다.", () => {
    expect(typeof lottoStore.getLottoMatchResult).toBe("function");
  });

  test("getLottoMatchResult 메서드를 호출하면 당첨 번호와 비교해여 생성된 matchResult를 반환해야 한다.", () => {
    const lottoWinningNumbers = [1, 2, 3, 4, 5, 6];
    const bonousNumber = [7];
    const expectedMatchResult = {
      fifthPlace: 0,
      fourthPlace: 1,
      thirdPlace: 0,
      secondPlace: 1,
      firstPlace: 1,
      returnRate: 50751250,
    };
    const matchResult = lottoStore.getLottoMatchResult({ lottoWinningNumbers, bonousNumber });
    expect(matchResult).toEqual(expectedMatchResult);
  });
});
