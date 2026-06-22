import { loginSchema } from '$lib/services/login/login.validation';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { formatErrors } from '$lib/utils/zod';
import { LoginPost } from '$lib/services/login/login.api';
import { LoginApi } from '$lib/constants/endpoints';
import { toast } from 'svelte-sonner';

export const actions = {
	default: async ({ request, fetch }) => {
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
		return await LoginPost(LoginApi, result.data, fetch);
	} catch (error) {
		toast.error('Something went wrong!')
		console.error(error)
	}
	}
} satisfies Actions;
