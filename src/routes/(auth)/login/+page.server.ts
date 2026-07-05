import { loginSchema, type LoginFormData } from '$lib/services/login/login.validation';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { LoginApi } from '$lib/constants/endpoints';
import { PostMethod } from '$lib/constants/methods';
import type { LoginResponse } from '$lib/services/login/login.types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { availableProviders } from '$lib/config/oauth';
import { google, providers } from '$lib/services/oauth';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(loginSchema)),
		availableProviders: availableProviders(providers)
	};
};

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const form = await superValidate(request, zod4(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const res = await PostMethod<LoginFormData, LoginResponse>(LoginApi, form.data, fetch);
			if (res.status === 200) {
				const access_token = res.data.access_token;
				const refresh_token = res.data.refresh_token;
				if (access_token) {
					cookies.set('access_token', access_token, {
						path: '/',
						maxAge: 60 * 60 * 24,
						httpOnly: true
					});
				}
				if (refresh_token) {
					cookies.set('refresh_token', refresh_token, {
						path: '/',
						maxAge: 60 * 60 * 24 * 7,
						httpOnly: true
					});
				}
				return message(form, {
					text: res.message,
					success: true
				});
			} else {
				return message(
					form,
					{
						text: res.message,
						success: false
					},
					{ status: 400 }
				);
			}
		} catch (error) {
			return message(
				form,
				{
					text: 'Something went wrong!',
					success: false
				},
				{ status: 400 }
			);
		}
	}
} satisfies Actions;
