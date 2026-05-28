<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let username = '';
	let password = '';

	let loading = false;

	function kembali() {
		goto('/');
	}

	async function login() {

		if (!username || !password) {

			toast.error(
				'Username dan password wajib diisi'
			);

			return;
		}

		loading = true;

		const res = await fetch(
			'/api/login',
			{
				method: 'POST',

				headers: {
					'Content-Type':
						'application/json'
				},

				body: JSON.stringify({
					username,
					password
				})
			}
		);

		const data =
			await res.json();

		if (!data.success) {

			toast.error(
				data.message ||
				'Login gagal'
			);

			loading = false;
			return;
		}

		toast.success(
			'Login berhasil'
		);

		window.location.href =
			'/dashboard';
	}
</script>

<svelte:head>
	<title>Login Admin</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6 relative overflow-hidden">

	<!-- Blur -->
	<div class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

	<div class="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

	<!-- Card -->
	<div class="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden border border-white/20">

		<!-- Header -->
		<div class="bg-black text-white p-8">

			<button
				onclick={kembali}
				class="mb-6 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl text-sm"
			>
				← Kembali
			</button>

			<h1 class="text-4xl font-bold mb-3">
				Login Admin
			</h1>

			<p class="text-gray-300">
				Masuk untuk mengelola data pondok
			</p>

		</div>

		<!-- Form -->
		<div class="p-8 space-y-6">

			<!-- Username -->
			<div>

				<label class="block mb-3 font-semibold text-gray-700">
					Username
				</label>

				<input
					bind:value={username}
					placeholder="Masukkan username"
					class="w-full border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none rounded-2xl px-5 py-4 transition"
				/>

			</div>

			<!-- Password -->
			<div>

				<label class="block mb-3 font-semibold text-gray-700">
					Password
				</label>

				<input
					type="password"
					bind:value={password}
					placeholder="Masukkan password"
					class="w-full border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none rounded-2xl px-5 py-4 transition"
				/>

			</div>

			<!-- Button -->
			<button
				onclick={login}
				disabled={loading}
				class="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50"
			>

				{#if loading}
					Memproses...
				{:else}
					Login
				{/if}

			</button>

		</div>

	</div>

</div>