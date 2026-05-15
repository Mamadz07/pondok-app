<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();

	let search = data.search;

	async function searchData() {
		const query =
			search.trim();

		if (!query) {
			goto('/santri');
			return;
		}

		goto(
			`/santri?search=${query}`
		);
	}

	async function deleteData(
		id: number
	) {
		const confirmDelete =
			confirm(
				'Hapus data?'
			);

		if (!confirmDelete) return;

		const res = await fetch(
			'/api/santri',
			{
				method: 'DELETE',
				headers: {
					'Content-Type':
						'application/json'
				},
				body: JSON.stringify({
					id
				})
			}
		);

		const result =
			await res.json();

		if (result.success) {
			location.reload();
		}
	}
</script>

<h1 class="text-3xl font-bold mb-5">
	Data Santri
</h1>

<!-- TOP BAR -->
<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

	<!-- SEARCH -->
	<div class="flex gap-2">
		<input
			bind:value={search}
			placeholder="Cari nama santri..."
			class="border rounded-lg px-4 py-2 w-72"
		/>

		<button
			on:click={searchData}
			class="bg-black text-white px-4 rounded-lg"
		>
			Search
		</button>
	</div>

	<!-- BUTTON -->
	{#if data.user.role === "operator"}
		<a
			href="/santri/tambah"
			class="bg-black text-white px-4 py-2 rounded-lg"
		>
			Tambah Santri
		</a>
	{/if}

</div>

<!-- TABLE -->
<div class="bg-white rounded-2xl shadow overflow-hidden">

	<table class="w-full">

		<thead class="bg-gray-100">
			<tr>
				<th class="p-3 text-left">
					ID
				</th>

				<th class="p-3 text-left">
					Nama
				</th>

				<th class="p-3 text-left">
					Alamat
				</th>

				<th class="p-3 text-left">
					Status
				</th>

				{#if data.user.role === "operator"}
					<th class="p-3 text-left">
						Action
					</th>
				{/if}
			</tr>
		</thead>

		<tbody>

			{#if data.santri.length === 0}
				<tr>
					<td
						colspan="5"
						class="p-5 text-center text-gray-500"
					>
						Data tidak ditemukan
					</td>
				</tr>
			{/if}

			{#each data.santri as item}

				<tr class="border-t hover:bg-gray-50">

					<td class="p-3">
						{item.id}
					</td>

					<td class="p-3">
						{item.nama}
					</td>

					<td class="p-3">
						{item.alamat}
					</td>

					<td class="p-3">
						<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
							{item.status}
						</span>
					</td>

					{#if data.user.role === "operator"}
						<td class="p-3">
							<div class="flex gap-2">

								<a
									href={`/santri/edit/${item.id}`}
									class="bg-blue-500 text-white px-3 py-1 rounded"
								>
									Edit
								</a>

								<button
									on:click={() =>
										deleteData(item.id)}
									class="bg-red-500 text-white px-3 py-1 rounded"
								>
									Delete
								</button>

							</div>
						</td>
					{/if}

				</tr>

			{/each}

		</tbody>

	</table>

</div>