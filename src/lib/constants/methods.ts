import { api } from '$lib/services/api';

export const PostMethod = async <P, R>(url: string, payload: P, fetchFn: typeof fetch = fetch, headers?: { [key: string]: string }) => {
	const res = await api.post<P, R>(url, payload, fetchFn, headers);

	const message = Array.isArray(res.message)
		? res.message[0]
		: typeof res.message
			? res.message
			: '';
	return { ...res, message };
};

export const GetMethod = async <R>(url: string, fetchFn: typeof fetch = fetch, headers?: { [key: string]: string }) => {
	const res = await api.get<R>(url, fetchFn, headers);

	const message = Array.isArray(res.message)
		? res.message[0]
		: typeof res.message
			? res.message
			: '';
	return { ...res, message };
};
