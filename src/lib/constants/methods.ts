import { api } from "$lib/api";

export const PostMethod = async <P, R>(url: string, payload: P, fetchFn: typeof fetch = fetch) => {
	const res = await api.post<P, R>(url, payload, fetchFn);
    console.log('res', res)
	const message = Array.isArray(res.message)
		? res.message[0]
		: typeof res.message
			? res.message
			: '';
	return { ...res, message };
};
