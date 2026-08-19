import { error, isRedirect } from '@sveltejs/kit';
import { google } from '$lib/services/oauth';
import { getLocation } from '$lib/utils';
import { UAParser } from 'ua-parser-js';
import type { PageServerLoad } from './$types';
import { PostMethod } from '$lib/constants/methods';
import type { LoginResponse } from '$lib/services/login/login.types';
import { GoogleAuthApi } from '$lib/constants/endpoints';

export const load: PageServerLoad = async (event) => {
	try {
		const { cookies, url, request, fetch } = event;
		const code = url.searchParams.get('code');
		const state = url.searchParams.get('state');

		const codeVerifier = cookies.get('google_auth_codeVerifier');
		const storedState = cookies.get('google_auth_state');

		cookies.delete('google_auth_codeVerifier', { path: '/' });
		cookies.delete('google_auth_state', { path: '/' });

		if (!code || !state || !codeVerifier || !storedState) error(400, 'Missing OAuth Parameters');

		if (state !== storedState) error(400, "State doesn't match");

		if (!google) error(404, 'Google Provider not found');

		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const idToken = tokens.idToken();

		const userAgent = request.headers.get('user-agent') || '';
		const parser = new UAParser(userAgent);
		const device_name = `${parser.getBrowser().name} on ${parser.getOS().name}`;

		const ip = event.getClientAddress();
		const location = await getLocation(ip);

		const device_id = cookies.get('device_id') || crypto.randomUUID();

		const res = await PostMethod<
			{ id_token: string; device_id: string; device_name: string; location: string },
			LoginResponse
		>(GoogleAuthApi, { id_token: idToken, device_id, device_name, location }, fetch);
		if (res?.status === 200 && (res?.data?.access_token || res?.data?.refresh_token)) {

			const access_token = res?.data?.access_token;
			const refresh_token = res?.data?.refresh_token;

			if (access_token) {
				cookies.set('access_token', access_token, {
					path: '/',
					httpOnly: true,
					maxAge: 60 * 15,
					secure: false
				});
			}
			if (refresh_token) {
				cookies.set('refresh_token', refresh_token, {
					path: '/',
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 7,
					secure: false
				});
			}
			cookies.set('device_id', device_id, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: false
			});
			return { success: true };
		} else {
			return { success: false };
		}
	} catch (error) {
		if (isRedirect(error)) throw error;
		return { success: false };
	}
};
