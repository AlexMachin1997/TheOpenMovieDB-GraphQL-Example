const formatGroup = require("./index");

describe("formatGroup", () => {
  it("The arrays should match", () => {
    const inputData = [
      {
        first_air_date: "2016-10-02",
        name: "Westworld",
        media_type: "tv",
      },
      {
        release_date: "2020-04-24",
        original_title: "Black widow",
        media_type: "movie",
      },
    ];

    const expectedOutput = [
      {
        release_date: "2020",
        original_title: "Black widow",
        media_type: "movie",
      },
      {
        release_date: "2016",
        original_title: "Westworld",
        media_type: "tv",
      },
    ];

    const input = formatGroup(inputData, "ALL");

    expect(input).toStrictEqual(expectedOutput);
  });
});
