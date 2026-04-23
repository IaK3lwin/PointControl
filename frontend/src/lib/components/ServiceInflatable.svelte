<script lang="ts">

  import { ServiceEnflatable } from "$lib/domain/services";


	let {
		service
	}: { service : ServiceEnflatable } = $props();

  
  let startedAt = $state<number | null>();
	let finished = $derived(service.isFinish);
	let now = $state(Date.now());
	let frameId: number | null = null;
	
	function startTimer() {
		if (startedAt || finished) return;

		startedAt = Date.now();
		loop();
	}

	function loop() {
		now = Date.now();

		if (remainingSeconds <= 0) {
			finished = true;
			cancelLoop();
			return;
		}

		frameId = requestAnimationFrame(loop);
	}

	function cancelLoop() {
		if (frameId) {
			cancelAnimationFrame(frameId);
			frameId = null;
		}
	}

	const timeDuration = service?.timeDuration ? service.timeDuration : 0

	const elapsedSeconds = $derived.by(() => {
		if (!startedAt) return 0;
		return Math.floor((now - startedAt) / 1000);
	});
	
	const remainingSeconds = $derived.by(() => {
		return Math.max(service?.timeDuration ?? 0 - elapsedSeconds, 0);
	});

	const progress = $derived.by(() => {
		return ((service?.timeDuration ?? 0 - remainingSeconds) / timeDuration) * 100;
	});

	const timeLabel = $derived.by(() => {
		const min = Math.floor(remainingSeconds / 60);
		const sec = remainingSeconds % 60;

		return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
	});
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div class="card">
	<div class="top">
		<div>
			<h2>{name}</h2>
			<p>{service.getPrice().toReal(service.getPrice().toCent())}</p>
		</div>

		<span class:running={startedAt && !finished} class:done={finished}>
			{#if finished}
				Finalizado
			{:else if startedAt}
				Em andamento
			{:else}
				Aguardando
			{/if}
		</span>
	</div>

	<div class="timer">
		<div class="time">{timeLabel}</div>

		<div class="bar">
			<div class="fill" style:width={`${progress}%`}></div>
		</div>
	</div>

	<button
		onclick={startTimer}
		disabled={!!startedAt || finished}
	>
		{#if finished}
			Usado
		{:else if startedAt}
			Rodando...
		{:else}
			Iniciar Timer
		{/if}
	</button>
</div>

<style>
	.card {
		display: grid;
		gap: 1rem;
		padding: 1rem;
		border-radius: 16px;
		background: #111;
		color: white;
	}

	.top {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.2rem;
	}

	p {
		margin: 0.2rem 0 0;
		opacity: 0.8;
	}

	span {
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		font-size: 0.8rem;
		height: fit-content;
		background: #333;
	}

	.running {
		background: #9a6b00;
	}

	.done {
		background: #0a6d2a;
	}

	.timer {
		display: grid;
		gap: 0.5rem;
	}

	.time {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}

	.bar {
		height: 10px;
		background: #2a2a2a;
		border-radius: 999px;
		overflow: hidden;
	}

	.fill {
		height: 100%;
		background: #3b82f6;
		transition: width 0.15s linear;
	}

	button {
		border: none;
		padding: 0.9rem;
		border-radius: 12px;
		font-weight: bold;
		cursor: pointer;
		background: #2563eb;
		color: white;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>