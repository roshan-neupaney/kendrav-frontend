<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import Spinner from '../ui/spinner/spinner.svelte';

	let {
		label,
		isLoading = false,
		isDisable = false,
		type = 'button',
		class: className = ''
	}: {
		label: string;
		isLoading?: boolean;
		isDisable?: boolean;
		type?: 'submit' | 'reset' | 'button';
		class?: string;
	} = $props();
</script>

<Form.Button {type} class={className} disabled={isDisable}>
	{#if isLoading}
		<Spinner />
	{/if}
	{label}
</Form.Button>
