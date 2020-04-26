const setValue = require("./");

describe("replaceKey unit test's", () => {
  const mockedData = {
    name: "Alex James Machin",
    dob: "25/04/2020",
  };

  it("It should return true", () => {
    mockedData.dob = setValue(mockedData, "dob", "20/11/1997");
    expect(mockedData.dob).toMatch("20/11/1997");
  });
});
