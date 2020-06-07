const { gql } = require('apollo-server');

const typeDef = gql`
	type Cast {
		cast_id: Int
		character: String
		credit_id: String
		gender: Int
		id: Int
		name: String
		order: Int
		image: String
	}
`;

module.exports = typeDef;
