const generateDiscoverEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateDiscoverEndpoint", () => {
  it("Should return the full discover endpoint (TV)", () => {
    // Generated URL
    const input = generateDiscoverEndpoint("tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/discover/tv?api_key=${API_KEY}&page=1`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full discover endpoint (Movie)", () => {
    // Generated URL
    const input = generateDiscoverEndpoint("movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/discover/movie?api_key=${API_KEY}&page=1`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
