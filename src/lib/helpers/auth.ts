export const ServerSideGet = (url: string) => {
	const resData = {
		data: [],
		message: '',
		status: 0
	};
};

export const PostMethod = async <T, R>(
	url: string,
	payload: T,
	fetchFn: typeof fetch = fetch,
	contentType: string = 'application/json'
): Promise<R> => {
	const res = await fetchFn(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': contentType
		}
	});
	if (!res.ok) {
		throw new Error(`HTTP Error: ${res.status}`);
	}
	return res.json();
};
