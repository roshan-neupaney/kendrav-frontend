import { loginSchema, type LoginFormData } from '$lib/services/login/login.validation';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { formatErrors } from '$lib/utils/zod';
import { LoginApi } from '$lib/constants/endpoints';
import { PostMethod } from '$lib/constants/methods';
import type { LoginResponse } from '$lib/services/login/login.types';

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		try {
			const formData = await request.formData();
			const data = {
				email: formData.get('email'),
				password: formData.get('password')
			};

			const result = loginSchema.safeParse(data);
			if (!result.success) {
				return fail(400, {
					errors: formatErrors(result.error)
				});
			}
			const res = await PostMethod<LoginFormData, LoginResponse>(LoginApi, result.data, fetch);
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
				return {
					message: res.message,
					success: true
				};
			} else {
				return fail(400, {
					message: res.message,
					success: false
				});
			}
		} catch (error) {
			return fail(400, {
					message: 'Something went wrong!',
					success: false
				});
		}
	}
} satisfies Actions;
