<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    onMount(() => {
        if (data.success) {
            toast.success('Login Successfully')
            goto('/personal_12/home', { replaceState: true })
        } else {
            toast.error('Google login failed')
            goto('/login', { replaceState: true })
        }
    })
</script>