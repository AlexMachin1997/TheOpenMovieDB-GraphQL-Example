const filterGroupByMediaType = require("./index");

describe("filterGroupByMediaType", () => {
  const input = [
    { media_type: "movie", name: "Star Wars" },
    { media_type: "tv", name: "Westworld" },
    { media_type: "movie", name: "Fast and furious" },
  ];

  describe("TV", () => {
    const response = filterGroupByMediaType("TV", input);
    const shows = input.filter((el) => el.media_type === "tv");

    it("Should return only the shows with media_type = tv", () => {
      expect(response).toStrictEqual(shows);
    });

    it("Should return a length of 1", () => {
      expect(response.length).toBe(1);
    });
  });

  describe("MOVIE", () => {
    const response = filterGroupByMediaType("MOVIE", input);
    const movies = input.filter((el) => el.media_type === "movie");

    it("Should return only the shows with media_type = movie", () => {
      expect(response).toStrictEqual(movies);
    });

    it("Should return a length of 2", () => {
      expect(response.length).toBe(2);
    });
  });

  describe("ALL", () => {
    const response = filterGroupByMediaType("ALL", input);

    it("Should return all the shows and tvs", () => {
      expect(response).toStrictEqual(response);
    });

    it("Should return a length of 3", () => {
      expect(response.length).toBe(3);
    });
  });

  describe("No mediaType provided", () => {
    const response = filterGroupByMediaType("", input);

    it("Should return all the shows and tvs", () => {
      expect(response).toStrictEqual(response);
    });

    it("Should return a length of 3", () => {
      expect(response.length).toBe(3);
    });
  });
});
