const reorderGroupByReleaseDate = require("./index");

describe("reorderGroupByReleaseDate", () => {
  const data = [
    {
      release_date: "05/05/2020",
      name: "Devs",
    },
    {
      release_date: "-",
      name: "Westworld",
    },
    {
      release_date: "05/05/2010",
      name: "The Walking Dead",
    },
  ];

  const expectedResult = [
    {
      release_date: "-",
      name: "Westworld",
    },
    {
      release_date: "05/05/2020",
      name: "Devs",
    },
    {
      release_date: "05/05/2010",
      name: "The Walking Dead",
    },
  ];

  it("Westworld should be the first element in the array", () => {
    const response = reorderGroupByReleaseDate(data);
    expect(response).toStrictEqual(expectedResult);
  });
});
