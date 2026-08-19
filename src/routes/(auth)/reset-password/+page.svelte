<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { KeyIcon } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import CustomInput from '$lib/components/custom/CustomInput.svelte';
	import { untrack } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/custom/Button.svelte';
	import { ResetPasswordSchema } from '$lib/services/reset-password/resetPassword.validation';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
	let token = $derived(page.url.searchParams.get('token'));

	const form = untrack(() =>
		superForm(data.form, {
			validators: zod4Client(ResetPasswordSchema),
			validationMethod: 'oninput',
			onUpdated({ form }) {
				if (form.message.success) {
					toast.success(form.message?.text);
					goto('/login', { replaceState: true });
				}
			}
		})
	);

	const { message, enhance, submitting } = form;
</script>

<svelte:head>
	<title>Reset Password | Kendrav</title>
</svelte:head>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div class="flex justify-center">
				<div
					class="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl"
				>
					<KeyIcon class="size-6" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">Reset password?</Card.Title>
			<Card.Description>Enter your new password below</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if !token}
				<div class="items-center flex flex-col">
					<div
						class="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-red-500 dark:text-green-400 text-center w-full"
					>
						Reset Link is invalid or expired.
					</div>
					<Button label="Request a new link" href="/forgot-password" variant="outline" class="w-fit" />
				</div>
			{:else if !$message?.success && $message?.text}
				<div class="bg-destructive/10 text-destructive mb-4 rounded-md p-3 text-sm">
					{$message?.text}
				</div>
			{:else}
				<form method="POST" use:enhance class="space-y-6">
					<CustomInput
						{form}
						name="new_password"
						placeholder="Enter new password"
						type="password"
					/>
					<Button
						label="Reset Password"
						type="submit"
						class="w-full"
						isDisable={$submitting}
						isLoading={$submitting}
						loadingText="Sending..."
					/>
				</form>
			{/if}
		</Card.Content>
		<Card.Footer class="justify-center">
			<p class="text-muted-foreground text-sm">
				Remember your password?
				<a href="/login" class="text-primary underline-offset-4 hover:underline">Sign in</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
