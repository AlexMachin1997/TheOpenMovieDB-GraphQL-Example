const generateCrewEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateCrewEndpoint", () => {
  it("Should return the full crew endpoint (TV)", () => {
    // Generated URL
    const input = generateCrewEndpoint(12, "tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/credits?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full crew endpoint (Movie)", () => {
    // Generated URL
    const input = generateCrewEndpoint(14, "movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/movie/14/credits?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
