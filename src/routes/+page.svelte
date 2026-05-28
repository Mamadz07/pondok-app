<script lang="ts">
	import { goto } from '$app/navigation';

	function daftarSekarang() {
		goto('/daftar');
	}

	function loginAdmin() {
		goto('/login');
	}
</script>

<svelte:head>
	<title>Pondok App</title>
</svelte:head>

<div class="min-h-screen bg-gray-100">

	<!-- Navbar -->
	<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b">
		<div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

			<div>
				<h1 class="text-2xl font-bold text-black">
					Pondok App
				</h1>
			</div>

			<div class="flex items-center gap-4">

				<a
					href="#fitur"
					class="text-gray-600 hover:text-black transition"
				>
					Fitur
				</a>

				<a
					href="#daftar"
					class="text-gray-600 hover:text-black transition"
				>
					Pendaftaran
				</a>

				<button
					onclick={loginAdmin}
					class="bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition"
				>
					Login Admin
				</button>

			</div>

		</div>
	</nav>

	<!-- Hero -->
	<section class="bg-black text-white px-8 pt-36 pb-24 overflow-hidden">

		<div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

			<!-- Left -->
			<div>

				<div class="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
					<div class="w-2 h-2 rounded-full bg-green-400"></div>

					<p class="text-sm text-gray-300">
						Pendaftaran Santri Dibuka
					</p>
				</div>

				<h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6">
					Sistem Pendaftaran
					Santri Modern
				</h1>

				<p class="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
					Platform digital untuk mempermudah proses pendaftaran santri
					secara online dengan proses cepat, aman, dan terverifikasi.
				</p>

				<div class="flex flex-wrap gap-4">

					<button
						onclick={daftarSekarang}
						class="bg-white text-black px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition"
					>
						Daftar Sekarang
					</button>

					<button
						class="border border-white/20 px-7 py-4 rounded-2xl hover:bg-white/10 transition"
					>
						Pelajari Lebih Lanjut
					</button>

				</div>

			</div>

			<!-- Right -->
			<div class="relative">

				<div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

				<div class="relative bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

					<div class="grid grid-cols-2 gap-5">

						<div class="bg-white/10 rounded-3xl p-6">
							<h2 class="text-4xl font-bold">
								100+
							</h2>

							<p class="text-gray-300 mt-3">
								Santri Aktif
							</p>
						</div>

						<div class="bg-white/10 rounded-3xl p-6">
							<h2 class="text-4xl font-bold">
								24H
							</h2>

							<p class="text-gray-300 mt-3">
								Pendaftaran Online
							</p>
						</div>

						<div class="bg-white/10 rounded-3xl p-6">
							<h2 class="text-4xl font-bold">
								Mudah
							</h2>

							<p class="text-gray-300 mt-3">
								Proses Cepat
							</p>
						</div>

						<div class="bg-white/10 rounded-3xl p-6">
							<h2 class="text-4xl font-bold">
								Aman
							</h2>

							<p class="text-gray-300 mt-3">
								Data Terlindungi
							</p>
						</div>

					</div>

				</div>

			</div>

		</div>

	</section>

	<!-- Fitur -->
	<section
		id="fitur"
		class="max-w-7xl mx-auto px-8 py-24"
	>

		<div class="text-center mb-16">

			<h2 class="text-5xl font-bold mb-5">
				Kenapa Memilih Kami?
			</h2>

			<p class="text-gray-500 text-lg max-w-2xl mx-auto">
				Sistem modern yang memudahkan calon santri dan admin pondok
				dalam proses pendaftaran.
			</p>

		</div>

		<div class="grid md:grid-cols-3 gap-8">

			<div class="bg-white rounded-[32px] p-8 border shadow-sm hover:-translate-y-1 transition">

				<div class="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
					1
				</div>

				<h3 class="text-2xl font-bold mb-4">
					Pendaftaran Mudah
				</h3>

				<p class="text-gray-600 leading-relaxed">
					Calon santri dapat melakukan pendaftaran langsung melalui website
					tanpa harus datang ke pondok.
				</p>

			</div>

			<div class="bg-white rounded-[32px] p-8 border shadow-sm hover:-translate-y-1 transition">

				<div class="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
					2
				</div>

				<h3 class="text-2xl font-bold mb-4">
					Verifikasi Admin
				</h3>

				<p class="text-gray-600 leading-relaxed">
					Setiap data pendaftar akan diverifikasi admin sebelum diterima
					menjadi santri aktif.
				</p>

			</div>

			<div class="bg-white rounded-[32px] p-8 border shadow-sm hover:-translate-y-1 transition">

				<div class="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
					3
				</div>

				<h3 class="text-2xl font-bold mb-4">
					Data Aman
				</h3>

				<p class="text-gray-600 leading-relaxed">
					Seluruh data tersimpan aman dan dikelola langsung oleh admin
					pondok secara digital.
				</p>

			</div>

		</div>

	</section>

	<!-- CTA -->
	<section
		id="daftar"
		class="px-8 pb-24"
	>

		<div class="max-w-6xl mx-auto bg-black text-white rounded-[40px] p-14 text-center relative overflow-hidden">

			<div class="absolute top-0 left-0 w-full h-full bg-white/5"></div>

			<div class="relative">

				<h2 class="text-5xl font-bold mb-6">
					Siap Menjadi Bagian Dari Pondok?
				</h2>

				<p class="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
					Lakukan pendaftaran sekarang dan tunggu proses verifikasi
					dari admin pondok.
				</p>

				<button
					onclick={daftarSekarang}
					class="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
				>
					Daftar Sekarang
				</button>

			</div>

		</div>

	</section>

</div>