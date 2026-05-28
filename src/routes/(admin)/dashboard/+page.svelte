<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard Admin</title>
</svelte:head>

<div class="space-y-8">

	<!-- Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

		<div>

			<h1 class="text-5xl font-bold">
				Dashboard
			</h1>

			<p class="text-gray-500 mt-3 text-lg">
				Selamat datang kembali,
				<span class="font-semibold text-black">
					{data.user.username}
				</span>
			</p>

		</div>

		<div class="bg-black text-white px-6 py-4 rounded-3xl shadow-lg">

			<p class="text-sm text-gray-300">
				Role
			</p>

			<h2 class="text-2xl font-bold mt-1">
				Administrator
			</h2>

		</div>

	</div>

	<!-- Statistik -->
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

		<!-- Santri -->
		<div class="bg-white rounded-[32px] border shadow-sm p-7 hover:-translate-y-1 transition">

			<div class="flex items-center justify-between">

				<div>

					<p class="text-gray-500">
						Total Santri
					</p>

					<h2 class="text-5xl font-bold mt-4">
						{data.stats.santri}
					</h2>

				</div>

				<div class="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl">
					S
				</div>

			</div>

		</div>

		<!-- Alumni -->
		<div class="bg-white rounded-[32px] border shadow-sm p-7 hover:-translate-y-1 transition">

			<div class="flex items-center justify-between">

				<div>

					<p class="text-gray-500">
						Total Alumni
					</p>

					<h2 class="text-5xl font-bold mt-4">
						{data.stats.alumni}
					</h2>

				</div>

				<div class="w-16 h-16 rounded-2xl bg-green-500 text-white flex items-center justify-center text-2xl">
					A
				</div>

			</div>

		</div>

		<!-- Pendaftar -->
		<div class="bg-white rounded-[32px] border shadow-sm p-7 hover:-translate-y-1 transition">

			<div class="flex items-center justify-between">

				<div>

					<p class="text-gray-500">
						Total Pendaftar
					</p>

					<h2 class="text-5xl font-bold mt-4">
						{data.stats.pendaftar}
					</h2>

				</div>

				<div class="w-16 h-16 rounded-2xl bg-yellow-500 text-white flex items-center justify-center text-2xl">
					P
				</div>

			</div>

		</div>

		<!-- Users -->
		<div class="bg-white rounded-[32px] border shadow-sm p-7 hover:-translate-y-1 transition">

			<div class="flex items-center justify-between">

				<div>

					<p class="text-gray-500">
						Total Users
					</p>

					<h2 class="text-5xl font-bold mt-4">
						{data.stats.users}
					</h2>

				</div>

				<div class="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl">
					U
				</div>

			</div>

		</div>

	</div>

	<!-- Info -->
	<div class="grid lg:grid-cols-2 gap-6">

		<!-- Welcome -->
		<div class="bg-white rounded-[32px] border shadow-sm p-8">

			<h2 class="text-3xl font-bold mb-5">
				Sistem Pondok
			</h2>

			<p class="text-gray-600 leading-relaxed text-lg">
				Dashboard ini digunakan untuk mengelola data pendaftar,
				santri, dan alumni pondok secara digital.
			</p>

		</div>

		<!-- Status -->
		<div class="bg-black text-white rounded-[32px] p-8">

			<h2 class="text-3xl font-bold mb-5">
				Status Sistem
			</h2>

			<div class="space-y-4">

				<div class="flex items-center justify-between bg-white/10 rounded-2xl p-4">

					<p>
						Database
					</p>

					<span class="text-green-400 font-semibold">
						Online
					</span>

				</div>

				<div class="flex items-center justify-between bg-white/10 rounded-2xl p-4">

					<p>
						Authentication
					</p>

					<span class="text-green-400 font-semibold">
						Aktif
					</span>

				</div>

				<div class="flex items-center justify-between bg-white/10 rounded-2xl p-4">

					<p>
						Admin Session
					</p>

					<span class="text-green-400 font-semibold">
						Aman
					</span>

				</div>

			</div>

		</div>

	</div>

</div>