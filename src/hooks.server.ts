import { TokenRefreshApi } from '$lib/constants/endpoints';
import { BASE_URL } from '$lib/constants/envVariables';
import { redirect, type HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const access_token = event.cookies.get('access_token');
	const device_id = event.cookies.get('device_id') || '';

	if (access_token) {
		request.headers.set('Authorization', `Bearer ${access_token}`);
	}
	request.headers.set('deviceId', device_id);

	const response = await fetch(request);

	if (response.status === 401) {
		const refresh_token = event.cookies.get('refresh_token');
		if (!refresh_token) {
			throw redirect(302, '/login');
		}
		const refreshRes = await fetch(`${BASE_URL}/api/v1/${TokenRefreshApi}`, {
			method: 'POST',
			body: JSON.stringify({ refresh: refresh_token }),
			headers: {
				'Content-Type': 'application/json',
				deviceId: device_id
			}
		});
		if (!refreshRes.ok) {
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			throw redirect(302, '/login');
		}
		const data = await refreshRes.json();
		const new_access_token = data.data.access_token;
		const new_refresh_token = data.data.refresh_token;

		event.cookies.set('access_token', new_access_token, {
			path: '/',
			maxAge: 60 * 15,
			httpOnly: true,
			secure: false
		});
		event.cookies.set('refresh_token', new_refresh_token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
			secure: false
		});

		request.headers.set('Authorization', `Bearer ${new_access_token}`);
		return fetch(request);
	}
	return response;
};
