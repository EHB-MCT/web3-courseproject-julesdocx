<script>
	export let name;
	import Task from './Task.svelte';

	let taskname = '';
	let date = '';
	let tasks = [{
		name: 'Svelte to Do App',
		date: '04/10/2021'
	}];
	let count = tasks.length;

	const addTask = () => {
		tasks = [...tasks, {name: taskname, date: date, id: tasks.length +1}];
	}

	// remove indexed value
	const deleteTask = (index) => {
		tasks = [
			...tasks.slice(0, index),
			...tasks.slice(index + 1, tasks.length)
		];
	};

	$: {
		console.log(tasks)
		count = tasks.length;
	}


</script>

<main>

	<div class="app-container">
		<div>
			<h1>{count} {count === 1 ? 'thing' : 'things'} To Do in <b>{name}</b></h1>
		</div>

			{#each tasks as task, i}
			<div class="task-container">
					<Task stule="display: inline" {...task}/>
					<button class="button" on:click={() => deleteTask(i)}>delete</button>
			</div>
			{/each}

		<div class="task-container align-left">
			<label>Name</label>
			<input type="text" bind:value={taskname} placeholder="taskname...">
			<label>Date</label>
			<input type="text" bind:value={date} placeholder="date...">
	
			<button on:click={addTask}>
				Add task
			</button>
		</div>	
	</div>
	
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.app-container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.task-container {
		margin: 12px auto;
		padding: 12px;
		border-radius: 4px;
		border: 1px solid #F4F4F4;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.align-left {
		text-align: left;
	}

	button {
		background-color: white;
		color: #ff3700;
		border: solid 1px #ff3700;
	}

	button:hover {
		background-color: #ff3700;
		color: white;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.6s;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
		.task-container {
			width: 440px;
		}
	}
</style>