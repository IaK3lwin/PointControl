<script lang="ts">

  import { ServiceEnflatable, ServiceFood } from "$lib/domain/services";
	import { type TimesOptions as ValuesTimeOption} from "$lib/domain/services"
    import { TimerResetIcon } from "@lucide/svelte";

	let {
		service,
		change
	}: { service : ServiceEnflatable, change : (service: ServiceEnflatable | ServiceFood) => void } = $props();
	let minselected: string | null = $state(null)
	$effect(() => {
		if (minselected) {
			console.log('esse é o valor; ', minselected)
			service.setPrice(minselected)
		}
		change(service)
	})	

		
</script>

<svelte:head>
	<title></title>
</svelte:head>

<div class="card">
	<div class="top">
		<div>
			<h2>{service.getName()}</h2>
			<p>{service.getPrice().toReal(service.getPrice().toCent())}</p>
		</div>

		<div>
			<select bind:value={minselected}>
				{#each [5, 10] as value}
					<option value={Intl.NumberFormat('pt-BR', { style : 'currency', currency : 'BRL'}).format(value)}>{value}min</option>	
				{/each}
			</select>
		</div>

		<span >
			{service.isFinish ? 'acabou' : 'aguardando'}
		</span>
	</div>

	<div class="timer">
		<div class="time"></div>

		<div class="bar">
			<div class="fill"></div>
		</div>
	</div>

	<button
	>
	
	</button>
</div>

<style>
	.card {
		display: grid;
		gap: 1rem;
		padding: 1rem;
		border-radius: 16px;
		background: #10111df8;
		border: 1px solid rgb(255, 255, 255);
		backdrop-filter: blur(10px) opacity(5%);
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