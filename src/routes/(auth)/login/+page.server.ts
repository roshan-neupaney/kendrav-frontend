import { loginSchema } from '$lib/services/login/login.validation';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { formatErrors } from '$lib/utils/zod';
import { LoginPost } from '$lib/services/login/login.api';

export const actions = {
	default: async ({ request, fetch }) => {
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
		return await LoginPost('login', result.data, fetch);
	}
} satisfies Actions;
