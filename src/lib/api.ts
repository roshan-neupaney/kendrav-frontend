import { env } from '$env/dynamic/private';

export interface BaseResponse <T> {
    status: number;
    message: string | string[];
    data: T
}

const baseUrl = env.BASE_URL;

const createApi = {
	post: async <P, R>(
		url: string,
		payload: P,
		fetchFn: typeof fetch = fetch,
		headers?: { [key: string]: string }
	): Promise<BaseResponse<R>> => {
		const res = await fetchFn(`${baseUrl}/${url}`, {
			method: 'POST',
			body: JSON.stringify(payload),
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

