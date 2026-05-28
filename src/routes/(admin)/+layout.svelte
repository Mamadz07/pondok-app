<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();

	async function logout() {
		await fetch('/api/logout', {
			method: 'POST'
		});

		window.location.href = '/login';
	}
</script>

<div class="min-h-screen flex">
	<!-- Sidebar -->
	<aside class="w-64 bg-black text-white p-5">
		<h1 class="text-2xl font-bold mb-8">
			Pondok App
		</h1>

		<nav class="flex flex-col gap-3">
			<a href={resolve('/dashboard')}>
				Dashboard
			</a>

			<a href={resolve('/santri')}>
				Santri
			</a>

			<a href={resolve('/alumni')}>
				Alumni
			</a>

			<a href={resolve('/pendaftar')}>
				Pendaftar
			</a>
		</nav>

        

		<button
			onclick={logout}
			class="mt-10 bg-red-500 px-3 py-2 rounded"
		>
			Logout
		</button>
	</aside>

	<!-- Content -->
	<main class="flex-1 p-5 bg-gray-100">
		{@render children()}
	</main>
</div>