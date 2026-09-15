<script lang="ts">
	import { page } from '$app/state';

	const { userData } = page.data;
	
	console.log('userData', userData);
    const callbackUrl = 'http://localhost:5173/channel/facebook/callback'
</script>

<div>home</div>
<a href="/pasdf/create">Create</a>

<button onclick={() => {
    window.location.href = `https://www.facebook.com/v26.0/dialog/oauth?client_id=957260226693711&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=pages_read_engagement&pages_messaging&response_type=code`
}}>
    Connect Facebook
</button>
