import { error, isRedirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { google } from '$lib/config/oauth';
import axios from 'axios';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ cookies, url }) => {
	try {
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
		const accessToken = tokens.accessToken();

		const base_url = env.BASE_URL;

		const res = await axios.post(
			`${base_url}/auth/google/`,
			{
				access_token: accessToken
			}
		);
		if (res?.status === 200 && (res?.data?.access || res?.data?.refresh)) {
			const access_token = res?.data?.access;
			const refresh_token = res?.data?.refresh;
			cookies.set('access_token', access_token, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24,
				secure: false
			});
			cookies.set('refresh_token', refresh_token, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				secure: false
			});
            console.log('hello')
			redirect(302, '/create/idea');
		} else {
			redirect(302, '/login');
		}
	} catch (error) {
		if(isRedirect(error)) throw error;
		redirect(302, '/login');
	}
};
