<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ZapIcon } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { RegisterSchema } from '$lib/services/register/register.validation';
	import CustomInput from '$lib/components/custom/CustomInput.svelte';
	import { untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/custom/Button.svelte';

	let { data }: PageProps = $props();

	const form = untrack(() =>
		superForm(data.form, {
			validators: zod4Client(RegisterSchema),
			validationMethod: 'oninput',
			onUpdated({ form }) {
				if (form.message.success) {
					toast.success('Login Successfull');
					goto('/login', {
						replaceState: true
					});
				}
			}
		})
	);

	const { message, enhance, submitting } = form;
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
			<form method="POST" use:enhance class="space-y-6">
				<CustomInput {form} name="full_name" label="Full Name" placeholder="John Doe" required />
				<CustomInput
					{form}
					name="email"
					label="Email"
					placeholder="john@example.com"
					type="email"
					required
				/>
				<CustomInput
					{form}
					name="password"
					label="Password"
					placeholder="6+ characters"
					type="password"
					required
				/>
				<CustomInput
					{form}
					name="confirm_password"
					label="Confirm Password"
					placeholder="Re-enter your password"
					type="password"
					required
				/>
				<Button
					label="Create account"
					type="submit"
					class="w-full"
					isDisable={$submitting}
					isLoading={$submitting}
				/>
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
