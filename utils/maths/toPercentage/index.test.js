const toPercentage = require("./");

describe("generateYear unit test's", () => {
  test("It should return 40", () => {
    // Data
    const input = toPercentage(6.4);
    const expectedOutput = 64;

    // Test
    expect(input).toBe(expectedOutput);
  });

  test("It should return 50", () => {
    // Data
    const input = toPercentage(5);
    const expectedOutput = 50;

    // Test
    expect(input).toBe(expectedOutput);
  });

  test("It should return 10", () => {
    // Data
    const input = toPercentage(1);
    const expectedOutput = 10;

    // Test
    expect(input).toBe(expectedOutput);
  });
});
