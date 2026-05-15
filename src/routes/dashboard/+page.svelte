<script lang="ts">
	let { data } = $props();
</script>

<h1 class="text-3xl font-bold mb-6">
	Dashboard
</h1>

<!-- Welcome Card -->
<div class="bg-white rounded-2xl shadow p-5 mb-6">
	<h2 class="text-xl font-semibold">
		Selamat Datang,
		{data.user.username}
	</h2>

	<p class="text-gray-500 mt-1">
		Role:
		{data.user.role}
	</p>
</div>

<!-- Statistik -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

	<!-- Santri -->
	<div class="bg-white rounded-2xl shadow p-5">
		<p class="text-gray-500">
			Total Santri
		</p>

		<h2 class="text-4xl font-bold mt-2">
			{data.stats.santri}
		</h2>
	</div>

	<!-- Alumni -->
	<div class="bg-white rounded-2xl shadow p-5">
		<p class="text-gray-500">
			Total Alumni
		</p>

		<h2 class="text-4xl font-bold mt-2">
			{data.stats.alumni}
		</h2>
	</div>

	<!-- Pendaftar -->
	<div class="bg-white rounded-2xl shadow p-5">
		<p class="text-gray-500">
			Total Pendaftar
		</p>

		<h2 class="text-4xl font-bold mt-2">
			{data.stats.pendaftar}
		</h2>
	</div>

	<!-- Users -->
	<div class="bg-white rounded-2xl shadow p-5">
		<p class="text-gray-500">
			Total Users
		</p>

		<h2 class="text-4xl font-bold mt-2">
			{data.stats.users}
		</h2>
	</div>

</div>