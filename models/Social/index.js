const { gql } = require('apollo-server');

const typeDef = gql`
	type Social {
		facebook: String
		instagram: String
		twitter: String
		homepage: String
	}
`;

module.exports = typeDef;
