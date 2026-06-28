import { RegisterSchema, type RegisterFormData } from '$lib/services/register/register.validation';
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
		const form = await superValidate(request, zod4(RegisterSchema));
		console.log('form', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const res = await PostMethod<RegisterFormData, unknown>(RegisterApi, form.data, fetch);
			console.log('res', res);
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
			return message(
					form,
					{
						text: 'OOPS! Something went wrong!',
						success: false
					},
					{ status: 400 }
				);
		}
	}
} satisfies Actions;
