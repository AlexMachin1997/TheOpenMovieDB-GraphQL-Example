const setValues = require("./index");

describe("setValues", () => {
  const input = [
    { name: "New girl", release_date: "2014-09-24" },
    { name: "Westworld", release_date: "2016-09-24" },
    { name: "The Walking Dead", release_date: "2010-09-24" },
  ];

  const output = [
    { name: "New girl", release_date: "2014" },
    { name: "Westworld", release_date: "2016" },
    { name: "The Walking Dead", release_date: "2010" },
  ];

  const response = setValues(input);

  describe("release_date value generating", () => {
    it("New girl should return 2014", () => {
      const NewGirlInput = response.find((el) => el.name === "New girl");
      const NewGirlOutput = output.find((el) => el.name === "New girl");
      expect(NewGirlInput.release_date).toBe(NewGirlOutput.release_date);
    });

    it("Westworld should return 2016", () => {
      const WestworldInput = response.find((el) => el.name === "New girl");
      const WestworldOutput = output.find((el) => el.name === "New girl");
      expect(WestworldInput.release_date).toBe(WestworldOutput.release_date);
    });

    it("The Walking Dead should return 10", () => {
      const TheWalkingDeadInput = response.find(
        (el) => el.name === "The Walking Dead"
      );
      const TheWalkingDeadOutput = output.find(
        (el) => el.name === "The Walking Dead"
      );
      expect(TheWalkingDeadInput.release_date).toBe(
        TheWalkingDeadOutput.release_date
      );
    });
  });
});
