export class Pagination<T> {
	readonly results: Array<T>;
	readonly meta: {
		page: number;
		pageCount: number;
		total: number;
	};

	constructor(results: Array<T>, pageNumber: number, pageCount: number, total: number) {
		this.results = results;
		this.meta = {
			page: pageNumber,
			pageCount,
			total
		};
	}
}
