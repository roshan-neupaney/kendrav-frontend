import { superValidate, message } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { ForgotPasswordSchema, type ForgotPasswordFormData } from "$lib/services/forgot-password/forgotPassword.validation";
import { zod4 } from "sveltekit-superforms/adapters";
import { PostMethod } from "$lib/constants/methods";
import { fail } from "@sveltejs/kit";
import { ForgotPasswordApi } from "$lib/constants/endpoints";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(ForgotPasswordSchema)),
    };
};

export const actions = {
	default: async (event) => {
		const { request, fetch } = event;

		const form = await superValidate(request, zod4(ForgotPasswordSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const res = await PostMethod<
				ForgotPasswordFormData,
				unknown
			>(ForgotPasswordApi, form.data, fetch);
			if (res.status === 200) {
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