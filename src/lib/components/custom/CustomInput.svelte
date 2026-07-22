<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import type { SuperForm } from 'sveltekit-superforms';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import Input from '../ui/input/input.svelte';
	import Button from '../ui/button/button.svelte';
	import { Eye, EyeOff } from '@lucide/svelte';

	let {
		form,
		name,
		placeholder,
		required = false,
		autocomplete = 'on',
		label,
		type = 'text'
	}: {
		form: SuperForm<any>;
		name: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		autocomplete?: 'on' | 'off';
		type?: 'text' | 'password' | 'email' | 'file' | 'radio';
	} = $props();

	const { value } = $derived.by(() => formFieldProxy(form, name as string));
	let showPassword = $state(false);
</script>

<Form.Field {form} {name}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}{required ? '*' : ''}</Form.Label>
			<div class="relative">
				<Input
					{...props}
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					{placeholder}
					{required}
					{autocomplete}
					bind:value={$value}
				/>
				{#if type === 'password'}
					<Button
						type="button"
						variant="ghost"
						size="icon"
						class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{#if showPassword}
							<EyeOff class="h-4 w-4 text-muted-foreground" />
						{:else}
							<Eye class="h-4 w-4 text-muted-foreground" />
						{/if}
					</Button>
				{/if}
			</div>
		{/snippet}
	</Form.Control>
	<Form.FieldErrors>
		{#snippet children({ errors, errorProps })}
			{#if errors.length > 0}
				<p class="text-destructive" {...errorProps}>{errors[0]}</p>
			{/if}
		{/snippet}
	</Form.FieldErrors>
</Form.Field>
