<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ZapIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	$effect(() => {
		if (form?.success) {
			toast.success(form.message);
			goto('/login', { replaceState: true });
		}
	});
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
			{#if form?.message}
				<div class="bg-destructive/10 text-destructive mb-4 rounded-md p-3 text-sm">
					{form.message}
				</div>
			{/if}
			<form method="POST" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="name">Full Name</Label>
					<Input
						id="full_name"
						name="full_name"
						type="text"
						placeholder="John Doe"
						required
						autocomplete="name"
					/>
				</div>
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="john@example.com"
						required
						autocomplete="email"
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="8+ characters"
						required
						autocomplete="new-password"
					/>
				</div>
				<div class="space-y-2">
					<Label for="confirm_password">Confirm Password</Label>
					<Input
						id="confirm_password"
						name="confirm_password"
						type="password"
						placeholder="Re-enter your password"
						required
					/>
				</div>
				<Button type="submit" class="w-full">Create account</Button>
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
