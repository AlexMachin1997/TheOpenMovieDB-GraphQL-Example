const axios = require("axios");
const { has, forEach, isEmpty } = require("lodash");

const { generateDiscoverEndpoint } = require("../../utils/generateEndpoints");

const generateImageURL = require("../../utils/generateImageURL");

const { formatDate } = require("../../utils/formatDates");

const DiscoverMoviesResolver = async (parent, args, context, info) => {
  // try {
  let url = generateDiscoverEndpoint("movie");

  let sortBy = args.sortBy;
  let genres = args.genres;
  let certifications = args.certifications;
  let userscore = args.userscore;
  let runtime = args.runtime;

  // Sort by trigger
  if (isEmpty(sortBy) === false) {
    url += `&sort_by=${sortBy}`;
  }

  // Generes trigger
  if (isEmpty(genres) === false) {
    // Genres query e.g. &with_genres=14&with_genres=15
    let genresQuery = "";

    // Split the numbers provided and for each number append it to genresQuery with a query parameter
    genres.split(",").map((data) => {
      genresQuery += `&with_genres=${data}`;
    });

    // Append the formatted genres query to the API URL
    url += genresQuery;
  }

  if (isEmpty(certifications) === false) {
    // Split the values passed in and for each certification provided join it with |
    const certs = certifications.split(",").join("|");
    url += `&certification=${certs}`;
  }

  if (isEmpty(userscore)) {
    // Add the query parameter required for the vote count
    url += `&vote_count.gte=${userscore}`;
  }

  if (isEmpty(runtime) === false) {
    url += `&with_runtime.gte=${runtime}`;
  }

  let TheDiscoverMovieURL = encodeURI(url);

  console.log(TheDiscoverMovieURL);
  // // Send a request to the discover movies endpoint
  // const response = await axios.get(TheDiscoverMovieURL);

  // const { data } = response;
  // const { results } = data;

  // // Format the data
  // forEach(results, (data) => {
  //   if (has(data, "poster_path") === true) {
  //     const { poster_path } = data;
  //     data.poster_path = generateImageURL(poster_path);
  //   }
  //   if (has(data, "backdrop_path") === true) {
  //     const { backdrop_path } = data;
  //     data.backdrop_path = generateImageURL(backdrop_path);
  //   }

  //   if (has(data, "release_date") === true) {
  //     const { release_date } = data;
  //     data.release_date = formatDate(release_date, "MMMM Do, YYYY");
  //   }
  // });

  // return results;
  // } catch (err) {
  //   console.log(err);
  //   console.log("The /Discover/Movie endpoint failed");
  //   return err.response;
  // }
};

module.exports = DiscoverMoviesResolver;
