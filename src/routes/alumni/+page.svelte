<script lang="ts">
	import { goto } from "$app/navigation";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	let search =
		data.search;

	async function searchData() {

		if (!search.trim()) {
			goto("/alumni");
			return;
		}

		goto(
			`/alumni?search=${search}`
		);
	}

	async function deleteData(
		id: number
	) {

		const confirmDelete =
			confirm(
				"Hapus data alumni?"
			);

		if (
			!confirmDelete
		) return;

		const res =
			await fetch(
				"/api/alumni",
				{
					method:
						"DELETE",

					headers: {
						"Content-Type":
							"application/json"
					},

					body: JSON.stringify(
						{
							id
						}
					)
				}
			);

		const result =
			await res.json();

		if (
			result.success
		) {

			toast.success(
				"Data alumni dihapus"
			);

			location.reload();
		}
	}
</script>

<h1 class="text-3xl font-bold mb-6">
	Data Alumni
</h1>

<!-- TOPBAR -->
<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

	<!-- SEARCH -->
	<div class="flex gap-2">

		<input
			bind:value={search}
			placeholder="Cari alumni..."
			class="border border-gray-300 rounded-xl px-4 py-2 w-72 outline-none focus:ring-4 focus:ring-black/10"
		/>

		<button
			on:click={searchData}
			class="bg-black text-white px-4 rounded-xl"
		>
			Search
		</button>

	</div>

	<!-- BUTTON -->
	{#if data.user.role === "operator"}

		<a
			href="/alumni/tambah"
			class="bg-black text-white px-4 py-2 rounded-xl"
		>
			Tambah Alumni
		</a>

	{/if}

</div>

<!-- TABLE -->
<div class="bg-white shadow rounded-2xl overflow-hidden">

	<table class="w-full">

		<thead class="bg-gray-100">

			<tr>

				<th class="p-4 text-left">
					Nama
				</th>

				<th class="p-4 text-left">
					Tahun Lulus
				</th>

				<th class="p-4 text-left">
					Alamat
				</th>

				<th class="p-4 text-left">
					Pekerjaan
				</th>

				{#if data.user.role === "operator"}

					<th class="p-4 text-left">
						Action
					</th>

				{/if}

			</tr>

		</thead>

		<tbody>

			{#if data.alumni.length === 0}

				<tr>

					<td
						colspan="5"
						class="text-center p-5 text-gray-500"
					>
						Data alumni kosong
					</td>

				</tr>

			{/if}

			{#each data.alumni as item}

				<tr class="border-t hover:bg-gray-50">

					<td class="p-4">
						{item.nama}
					</td>

					<td class="p-4">
						{item.tahun_lulus}
					</td>

					<td class="p-4">
						{item.alamat}
					</td>

					<td class="p-4">
						{item.pekerjaan}
					</td>

					{#if data.user.role === "operator"}

						<td class="p-4">

	<div class="flex gap-2">

		<a
			href={`/alumni/edit/${item.id}`}
			class="bg-blue-500 text-white px-3 py-1 rounded-lg"
		>
			Edit
		</a>

		<button
			on:click={() =>
				deleteData(item.id)}
			class="bg-red-500 text-white px-3 py-1 rounded-lg"
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