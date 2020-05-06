const reorderGroupByYear = require("./index");

describe("reorderGroupByYear", () => {
  const input = [
    {
      release_date: "-",
      name: "Westworld",
    },
    {
      release_date: "06/05/2020",
      name: "Devs",
    },
    {
      release_date: "05/05/2010",
      name: "The Walking Dead",
    },
  ];

  const output = [
    {
      release_date: "06/05/2020",
      name: "Devs",
    },
    {
      release_date: "05/05/2010",
      name: "The Walking Dead",
    },
    {
      release_date: "-",
      name: "Westworld",
    },
  ];

  it("The order should be The Walking Dead, Devs and Westworld", () => {
    const response = reorderGroupByYear(input);
    expect(response).toStrictEqual(output);
  });
});
