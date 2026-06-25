<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ZapIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import {
		RegisterSchema,
		type RegisterFormData
	} from '$lib/services/register/register.validation';
	import * as Form from '$lib/components/ui/form/index.js';
	import { untrack } from 'svelte';

	// let { form }: PageProps = $props();
	let { data }: PageProps = $props();

	let { form: initialForm } = data;

	const form = superForm(initialForm, {
		validators: zod4Client(RegisterSchema)
	});

	const { form: formData, errors, message, enhance } = form;
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
				<Form.Field {form} name="full_name">
					<Form.Control>
						<Form.Label>Full Name</Form.Label>
						<Input
							type="text"
							placeholder="John Doe"
							required
							autocomplete="name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control>
						<Form.Label>Email</Form.Label>
						<Input
							placeholder="john@example.com"
							autocomplete="email"
							type="email"
							required
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						<Form.Label>Password</Form.Label>
						<Input
							type="password"
							placeholder="6+ characters"
							required
							autocomplete="new-password"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						<Form.Label>Confirm Password</Form.Label>
						<Input
							type="password"
							placeholder="Re-enter your password"
							required
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
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
