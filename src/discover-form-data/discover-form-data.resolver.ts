import { Resolver, Query, Args } from '@nestjs/graphql';

import { DiscoverFormDataService } from './discover-form-data.service';
import { DiscoverFormData, ENTERTAINMENT_TYPES, RESOURCE_TYPE } from '../graphql.schema';

@Resolver('DiscoverFormData')
export class DiscoverFormDataResolver {
	constructor(private readonly discoverFormDataService: DiscoverFormDataService) {}

	@Query()
	formData(
		@Args('entertainmentType') entertainmentType: ENTERTAINMENT_TYPES,
		@Args('resourceType') resourceType: RESOURCE_TYPE,
		@Args('defaultValues') defaultValues: DiscoverFormData
	) {
		return this.discoverFormDataService.getDiscoverFormData({
			entertainmentType,
			isAuthenticated: false,
			resourceType,
			defaultValues
		});
	}
}
