<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { MailIcon } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import CustomInput from '$lib/components/custom/CustomInput.svelte';
	import { untrack } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/custom/Button.svelte';
	import { ForgotPasswordSchema } from '$lib/services/forgot-password/forgotPassword.validation';

	let { data }: PageProps = $props();

	const form = untrack(() =>
		superForm(data.form, {
			validators: zod4Client(ForgotPasswordSchema),
			validationMethod: 'oninput',
			onUpdated({ form }) {
				if (form.message.success) {
					toast.success(form.message?.text);
				}
			}
		})
	);

	const { message, enhance, submitting } = form;
    console.log('message', $message)
</script>

<svelte:head>
	<title>Forgot Password | Kendrav</title>
</svelte:head>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div class="flex justify-center">
				<div
					class="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl"
				>
					<MailIcon class="size-6" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">Forgot password?</Card.Title>
			<Card.Description>Enter your email and we'll send you a reset link</Card.Description>
		</Card.Header>
		<Card.Content>
			<!-- {#if $message?.text}
				<div class="bg-destructive/10 text-destructive mb-4 rounded-md p-3 text-sm">
					{$message.text}
				</div>
			{/if} -->
			{#if $message?.success}
				<div class="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
					A reset link has been sent to your email.
				</div>
			{:else}
				<form method="POST" use:enhance class="space-y-6">
					<CustomInput
						{form}
						name="email"
						label="Email"
						placeholder="your@example.com"
						type="email"
						required
					/>
					<Button
						label="Send Reset Link"
						type="submit"
						class="w-full"
						isDisable={$submitting}
						isLoading={$submitting}
                        loadingText='Sending...'
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
