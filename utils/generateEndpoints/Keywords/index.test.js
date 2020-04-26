const generateKeywordsEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateKeywordsEndpoint", () => {
  it("Should return the full discover endpoint (TV)", () => {
    // Generated URL
    const input = generateKeywordsEndpoint(12, "tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/keywords?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full discover endpoint (Movie)", () => {
    // Generated URL
    const input = generateKeywordsEndpoint(12, "movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/movie/12/keywords?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
