import { api } from '$lib/services/api';

export const PostMethod = async <P, R>(
	url: string,
	payload: P,
	fetchFn: typeof fetch = fetch,
	workspace_id?: string,
	headers?: { [key: string]: string }
) => {
	let final_url = url;
	if (url.includes(':workspace_id')) {
		if (!workspace_id) {
			return { message: 'Workspace id is required', status: 400 };
		} else {
			final_url = url.replace(':workspace_id', workspace_id);
		}
	}
	const res = await api.post<P, R>(final_url, payload, fetchFn, headers);

	const message = Array.isArray(res.message)
		? res.message[0]
		: typeof res.message
			? res.message
			: '';
	return { ...res, message };
};

export const GetMethod = async <R>(
	url: string,
	fetchFn: typeof fetch = fetch,
	headers?: { [key: string]: string }
) => {
	const res = await api.get<R>(url, fetchFn, headers);

	const message = Array.isArray(res.message)
		? res.message[0]
		: typeof res.message
			? res.message
			: '';
	return { ...res, message };
};
