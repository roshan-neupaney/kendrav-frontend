<script>
	import { goto } from '$app/navigation';

    let { children } = $props();
    console.log('hlello')
    // goto('/asdf/home')
</script>

<div>hello</div>

{@render children()}