<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import type { SuperForm } from 'sveltekit-superforms';
	import Input from '../ui/input/input.svelte';
	import type { SuperFormErrors } from 'sveltekit-superforms/client';

	let {
		form,
		name,
		placeholder,
		required = false,
		autocomplete = 'on',
		label,
		value,
		type = 'text',
        errors
	}: {
		form: SuperForm<any>;
		name: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		autocomplete?: 'on' | 'off';
		value: string;
		type?: 'text' | 'password' | 'email' | 'file' | 'radio';
        errors?: SuperFormErrors<any>
	} = $props();
</script>

<Form.Field {form} {name}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Input {...props} {type} {placeholder} {required} {autocomplete} bind:value />
		{/snippet}
	</Form.Control>
	{#if $errors?.[name]?.[0]}
        <p class="text-destructive text-sm font-medium">{$errors[name][0]}</p>
    {/if}
</Form.Field>
