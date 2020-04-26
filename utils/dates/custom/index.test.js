const formatDate = require("./");

describe("Custom date unit test's", () => {
  // Valid date
  test("It should return April 23rd, 2020", () => {
    expect(formatDate("2020-04-23", "MMMM Do, YYYY")).toBe("April 23rd, 2020");
  });

  // Default date (No date provided)
  test("It should the default date (--/--/----)", () => {
    expect(formatDate("", "MMMM Do, YYYY")).toBe("--/--/----");
  });

  // Invalid pattern
  test("It should return a pattern error message", () => {
    expect(formatDate("2020-04-23", "")).toBe("Please provide a pattern");
  });
});
