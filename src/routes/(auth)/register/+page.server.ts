import { RegisterSchema, type RegisterFormData } from '$lib/services/register/register.validation';
import { formatErrors } from '$lib/utils/zod';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PostMethod } from '$lib/constants/methods';
import { RegisterApi } from '$lib/constants/endpoints';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(RegisterSchema))
	};
};

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const form = await superValidate(request, zod4(RegisterSchema));
			if (!form.valid) {
				return fail(400, { form });
			}
			console.log('first');

			const res = await PostMethod<RegisterFormData, unknown>(RegisterApi, form.data, fetch);
			console.log(res);
			if (res.status === 201) {
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
			return fail(400, {
				message: 'Something went wrong!',
				success: false
			});
		}
	}
} satisfies Actions;
