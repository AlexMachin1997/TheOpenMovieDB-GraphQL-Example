const { isEmpty } = require("lodash");

const generateQueryParameter = (url, args) => {
  // Query parameters supported within TheOpenMovieDB Discover endpoint
  let sortBy = args.sortBy;
  let genres = args.genres;
  let certifications = args.certifications;
  let userscore = args.userscore;
  let runtime = args.runtime;

  // Sort by query
  if (isEmpty(sortBy) === false) {
    url += `&sort_by=${sortBy}`;
  }

  // Generes query
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

  // Certifications query
  if (isEmpty(certifications) === false) {
    // Split the values passed in and for each certification provided join it with |
    const certs = certifications.split(",").join("|");
    url += `&certification=${certs}`;
  }

  // Userscore query
  if (isEmpty(userscore) === false) {
    // Add the query parameter required for the vote count
    url += `&vote_count.gte=${userscore}`;
  }

  // Runtime query
  if (isEmpty(runtime) === false) {
    url += `&with_runtime.gte=${runtime}`;
  }

  // Encode the created url
  let encodedURL = encodeURI(url);

  //  Return the new url back to the resolver
  return encodedURL;
};

module.exports = generateQueryParameter;
