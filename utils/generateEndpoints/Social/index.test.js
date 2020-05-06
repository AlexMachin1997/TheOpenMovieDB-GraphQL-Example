const generateSocialEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateSingleItemLookEndpoint", () => {
  it("Should return the full external_id lookup endpoint (TV)", () => {
    // Generated URL
    const input = generateSocialEndpoint(12, "tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/external_ids?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full external_id lookup endpoint (TV)", () => {
    // Generated URL
    const input = generateSocialEndpoint(12, "movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/movie/12/external_ids?api_key=${API_KEY}`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});