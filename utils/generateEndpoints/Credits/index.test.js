const generateCreditsEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateCreditsEndpoint", () => {
  it("Should return the full credits endpoint (TV)", () => {
    // Generated URL
    const input = generateCreditsEndpoint(12, "tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/person/12/combined_credits?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full credits endpoint (Movie)", () => {
    // Generated URL
    const input = generateCreditsEndpoint(14, "movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/person/14/combined_credits?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
