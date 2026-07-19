import { BASE_URL } from '$lib/constants/envVariables';

export interface BaseResponse <T> {
    status: number;
    message: string | string[];
    data: T
}

const createApi = {
	post: async <P, R>(
		url: string,
		payload: P,
		fetchFn: typeof fetch = fetch,
		headers?: { [key: string]: string }
	): Promise<BaseResponse<R>> => {
		const res = await fetchFn(`${BASE_URL}/${url}`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				...(headers ? headers : {}),
				'Content-Type': headers?.['Content-Type'] ? headers?.['Content-Type'] : 'application/json'
			}
		});
		return res.json();
	},
	get: async <R>(
		url: string,
		fetchFn: typeof fetch = fetch,
		headers?: { [key: string]: string }
	): Promise<BaseResponse<R>> => {
		const res = await fetchFn(`${BASE_URL}/${url}`, {
			method: 'GET',
			headers: {
				...(headers ? headers : {}),
				'Content-Type': headers?.['Content-Type'] ? headers?.['Content-Type'] : 'application/json'
			}
		});
		return res.json();
	}
};

export {
    createApi as api
}

