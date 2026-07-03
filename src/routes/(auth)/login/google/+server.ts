import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as arctic from 'arctic';
import { google } from '$lib/services/oauth';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = arctic.generateState();
	const codeVerifier = arctic.generateCodeVerifier();
	const scopes = ['email', 'profile'];
    if(!google) {
        error(400, 'Google Provider not found');
    }
	const url = google.createAuthorizationURL(state, codeVerifier, scopes);

	cookies.set('google_auth_state', state, {
		httpOnly: true,
		path: '/',
		secure: false,
		maxAge: 60 * 10
	});

	cookies.set('google_auth_codeVerifier', codeVerifier, {
		httpOnly: true,
		path: '/',
		secure: false,
		maxAge: 60 * 10
	});
	redirect(302, url);
};
