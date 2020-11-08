const { gql } = require('apollo-server');

const typeDef = gql`
	type Video {
		id: String
		name: String
		url: String
		type: String
		site: String
	}
`;

module.exports = typeDef;
