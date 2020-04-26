const generateYear = require("./");

describe("generateYear unit test's", () => {
  test("It should return 2020", () => {
    // Data
    const input = generateYear("2020-04-25");
    const exepectedOutput = "2020";

    // Test
    expect(input).toBe(exepectedOutput);
  });

  test("It should return -", () => {
    // Data
    const input = generateYear("");
    const exepectedOutput = "-";

    // Test
    expect(input).toBe(exepectedOutput);
  });
});
