const { gql } = require('apollo-server');

const typeDef = gql`
	type Network {
		name: String
		id: Int
		logoUrl: String
		originCountry: String
	}
`;

module.exports = typeDef;
