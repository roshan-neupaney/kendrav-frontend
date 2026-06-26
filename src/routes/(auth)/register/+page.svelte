<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ZapIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { RegisterSchema } from '$lib/services/register/register.validation';
	import * as Form from '$lib/components/ui/form/index.js';
	import { enhance } from '$app/forms';
	import CustomInput from '$lib/components/custom/CustomInput.svelte';

	let { data }: PageProps = $props();

	let { form: initialForm } = data;

	const form = superForm(initialForm, {
		validators: zod4Client(RegisterSchema)
	});

	const { form: formData, message, errors } = form;
	// $effect(() => {
	// 	console.log('form', $formData)
	// })
	// $effect(() => {
	// 	if (form?.success) {
	// 		toast.success(form.message);
	// 		goto('/login', { replaceState: true });
	// 	}
	// });
</script>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div class="flex justify-center">
				<div
					class="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl"
				>
					<ZapIcon class="size-6" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">Create an account</Card.Title>
		</Card.Header>
		<Card.Content>
			{#if $message?.text}
				<div class="bg-destructive/10 text-destructive mb-4 rounded-md p-3 text-sm">
					{$message?.text}
				</div>
			{/if}
			<form method="POST" use:enhance class="space-y-4">
				<CustomInput
					{form}
					name={'full_name'}
					label="Full Name"
					placeholder="John Doe"
					value={$formData.full_name}
					required
				/>
				<CustomInput
					{form}
					name={'email'}
					label="Email"
					placeholder="john@example.com"
					type='email'
					value={$formData.email}
					required
				/>
				<CustomInput
					{form}
					name={'password'}
					label="Password"
					placeholder="6+ characters"
					value={$formData.password}
					type='password'
					required
				/>
				<CustomInput
					{form}
					name={'confirm_password'}
					label="Confirm Password"
					placeholder="Re-enter your password"
					value={$formData.confirm_password}
					type='password'
					required
				/>
				<Form.Button type="submit" class="w-full">Create account</Form.Button>
			</form>
		</Card.Content>
		<Card.Footer class="justify-center">
			<p class="text-muted-foreground text-sm">
				Already have an account?
				<a href="/login" class="text-primary underline-offset-4 hover:underline">Sign in</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
