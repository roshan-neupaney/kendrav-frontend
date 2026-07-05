<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import type { Snippet } from 'svelte';
	import Spinner from '../ui/spinner/spinner.svelte';

	let {
		label,
		isLoading = false,
		isDisable = false,
		type = 'button',
		class: className = '',
		href,
		variant = 'default',
		children
	}: {
		label?: string;
		isLoading?: boolean;
		isDisable?: boolean;
		type?: 'submit' | 'reset' | 'button';
		class?: string;
		href?: string;
		variant?: 'default' | 'link' | 'outline' | 'secondary' | 'ghost' | 'destructive';
		children?: Snippet;
	} = $props();
</script>

<Form.Button {type} class={className} disabled={isDisable} {href} {variant}>
	{#if isLoading}
		<Spinner />
	{/if}
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
</Form.Button>
