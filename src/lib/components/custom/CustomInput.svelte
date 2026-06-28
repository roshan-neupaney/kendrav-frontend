<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import type { SuperForm } from 'sveltekit-superforms';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import Input from '../ui/input/input.svelte';

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

	const { value } = formFieldProxy(form, name as string);
</script>

<Form.Field {form} {name}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Input {...props} {type} {placeholder} {required} {autocomplete} bind:value={$value} />
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
