<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/components/Header.svelte'
	import "$lib/global.css"

	let { children } = $props();

	async function detectUpdateSW() {
		const registration = await navigator.serviceWorker.ready

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing

			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('new updated available. relaod to update?')) {
						newSW.postMessage({type : 'SKIP_WAITING'})
						console.log("b")
					}

				}
			})
		})
	}
	
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
		width: 100%;
		height: 100vh;
	}
</style>
