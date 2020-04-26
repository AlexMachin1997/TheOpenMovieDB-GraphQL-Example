const generateReviewEndpoint = require("./");
const { API_URI, API_VERSION, API_KEY } = require("../../../config");

describe("generateReviewEndpoint", () => {
  it("Should return the full reviews endpoint (TV)", () => {
    // Generated URL
    const input = generateReviewEndpoint(12, "tv");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/reviews?api_key=${API_KEY}&language=en-US&page=1`;

    // Test
    expect(input).toMatch(expectedOutput);
  });

  it("Should return the full reviews endpoint (Movie)", () => {
    // Generated URL
    const input = generateReviewEndpoint(12, "movie");

    // Actual URL
    const expectedOutput = `${API_URI}/${API_VERSION}/movie/12/reviews?api_key=${API_KEY}&language=en-US&page=1`;

    // Test
    expect(input).toMatch(expectedOutput);
  });
});
