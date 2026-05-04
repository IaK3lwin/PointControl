<script lang="ts">
	import { ServiceEnflatable, ServiceFood } from "$lib/domain/services";
	import { type TimesOptions as ValuesTimeOption } from "$lib/domain/services";
	import Cronus from "$lib/domain/cronus";
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";
    import { Cent } from "$lib/domain/cents";

	let {
		service,
		change,
	}: {
		service: ServiceEnflatable;
		change: (service: ServiceEnflatable | ServiceFood) => void;
	} = $props();

	let minselected: string | null = $state(null);

	let price: string = $derived(service.getPrice().toReal());

	let isFinish: boolean = $derived(service.isFinish);
	let select: HTMLSelectElement | null = $state(null);
	let buttonStar: HTMLButtonElement | null = $state(null);
	let timeView: string = $state("00:00:00");
	let isRun: boolean = $state(false);
	let startTimeState: boolean = $state(false)
	let coldownEffect: boolean = false
	let tagName: string = $derived(service.tag)


	
	$effect(() => {
		
		console.log("effet codou");
		if (minselected) {
			price = minselected;
			service.setPrice(Cent.convertValueToCent(minselected));
			console.log("price service: ", price)
		}

		if (select != null) {
			select.disabled = isFinish ? true : false;
		}

		buttonStar ? (buttonStar.disabled = isFinish) : null;
		if (isFinish) {
			change(service)
		}

		console.log("tagname atualiza com valor de: ", tagName)
		service.tag = tagName



		
	});

	const time: Cronus = new Cronus();
	function startTime() {
		console.log("testando o Chorus");

		time.setCallback(() => {
			timeView = time.getHourFormat();
			isRun = time.isRun();
			if (time.getIsfinish()) {
				console.log("time acabou o tempo")
				service.isFinish = time.getIsfinish()
				isFinish = time.getIsfinish()
				change(service)
			}
			
		});

		console.log("testando o valor do minseletec")

		if (minselected) {
			console.log(minselected);
			let valueClean = minselected.replace("R$", "").replace(",", ".");
			console.log(valueClean);
			time.start(Number(valueClean), "m");
			startTimeState = true
		}
	}

	function pauseTime() {
		if (isRun) {
			time.pause()
			return
		}

		time.resume()
	}
</script>

<div class="card" class:running={isRun} class:done={isFinish}>
	<details>
	<div class="top">
		<div>
			<h2>{service.getName()}</h2>
			<p>{price}</p>
		</div>

		<div>
			<select bind:value={minselected} bind:this={select}>
				<option value={null} selected>tempo</option>
				{#each [5, 10, 1] as value}
					<option
						value={Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(value)}>{value}min</option
					>
				{/each}
			</select>
		</div>

		<span >
			{#if isFinish}
				"Terminou"	
				{:else}
				{isRun ? 'rodando' : 'aguardando'}
			{/if}
		</span>
	</div>

	<summary>{service.getName() + " || " + price}</summary>
		<div class="fieldTag">
			<label for="Apelido">apelido: </label>
			<input type="text" bind:value={tagName} placeholder="Ex: Fulano">
		</div>
		<div class="timer" class:running={isRun} class:done={isFinish}>
		
			<div class="time">{!isFinish ? timeView : 'Terminou'}</div>
		
		
		</div>
		{#if !startTimeState && !isFinish}
		<button bind:this={buttonStar} onclick={startTime}>
			<h2>Iniciar</h2>
		</button>
		{/if}
		{#if startTimeState && !isFinish}
		<button onclick={pauseTime}>
			<h2>{isRun ? 'Pausar' : 'Continuar'}</h2>
		</button>
		
		{/if}
	</details>
</div>

<style>
	summary {
		width: 100%;
	}
	.card {
		display: grid;
		width: auto;
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

	.fieldTag {
		display: flex;
		gap: .4rem;

		& input {
			all: unset;
		}

	}	

	.running {
		background: #9a6b00;
	}

	.done {
		& span {
			background: #0a6d2a;
		} 
		& button > h2, h2 {
			color: #0a6d2a;

		}	
		.timer {
			color: #0a6d2a;
		}
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
