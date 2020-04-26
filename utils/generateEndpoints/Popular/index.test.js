const generatePopularEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generatePopularEndpoint", () => {
  it("Should return the full popular endpoint (TV)", () => {
    // Generated URL
    const input = generatePopularEndpoint("tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/tv/popular?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full popular endpoint (Movie)", () => {
    // Generated URL
    const input = generatePopularEndpoint("movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/movie/popular?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
