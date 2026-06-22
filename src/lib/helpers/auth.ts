import { env } from "$env/dynamic/private";

const baseUrl = env.BASE_URL;

export const PostMethod = async <T, R>(
	url: string,
	payload: T,
	fetchFn: typeof fetch = fetch,
	headers?: {[key: string]: string}
): Promise<R> => {
	const res = await fetch(`${baseUrl}/${url}`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			...(headers ? headers : {}),
			'Content-Type': headers?.['Content-Type'] ? headers?.['Content-Type'] : 'application/json',
		}
	});
	console.log('res', res)
	if (!res.ok) {
		throw new Error(`HTTP Error: ${res.statusText}`);
	}
	return res.json();
};
