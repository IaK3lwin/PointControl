<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/components/Header.svelte'
	import "$lib/global.css"

	let { children } = $props();
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>PointControl</title>
</svelte:head>

<main>

	<Header />
	{@render children()}

</main>

<style>
	main {
		display: flex;
		flex-flow:column nowrap;
		height: 100vh;
	}
</style>
