export const ServerSideGet = (url: string) => {
	const resData = {
		data: [],
		message: '',
		status: 0
	};
};

export const PostMethod = async <T, R>(url: string, payload: T, contentType: string = 'applicaton/json'): Promise<R> => {
	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': contentType
		}
	});
    return res.json();
};
