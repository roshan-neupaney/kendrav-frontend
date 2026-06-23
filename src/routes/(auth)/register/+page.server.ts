import { RegisterSchema, type RegisterFormData } from '$lib/services/register/register.validation';
import { formatErrors } from '$lib/utils/zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PostMethod } from '$lib/constants/methods';
import { RegisterApi } from '$lib/constants/endpoints';

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const requestData = await request.formData();

			const formData = {
				full_name: requestData.get('full_name'),
				email: requestData.get('email'),
				password: requestData.get('password'),
				confirm_password: requestData.get('confirm_password'),
                
			};

			const validatedData = RegisterSchema.safeParse(formData);
			if (!validatedData.success) {
				return fail(400, {
					errors: formatErrors(validatedData.error)
				});
			}

			const res = await PostMethod<RegisterFormData, unknown>(
				RegisterApi,
				validatedData.data,
				fetch
			);
			if (res.status === 200) {
				return fail(400, {
					message: res.message,
					success: true
				});
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
