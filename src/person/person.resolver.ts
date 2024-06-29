import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PersonService } from './person.service';
import { Person } from '../graphql.schema';

// import { Person } from '../graphql.schema';

@Resolver('Person')
export class PersonResolver {
	constructor(private readonly personService: PersonService) {}

	@Query()
	async person(@Args('id') personId: number) {
		return this.personService.getPerson(personId);
	}

	@ResolveField()
	async social(@Parent() person: Person) {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Movie query)
		const socials = await this.personService.getSocials(person.id ?? 0);

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: person.homepage
		};
	}

	@ResolveField()
	async credits(@Parent() person: Person) {
		return this.personService.getCredits(person.id ?? 0);
	}
}
