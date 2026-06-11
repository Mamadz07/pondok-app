<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let search =
		data.search;

	async function searchData() {

		const query =
			search.trim();

		if (!query) {

			goto('/pendaftar');
			return;
		}

		goto(
			`/pendaftar?search=${query}`
		);
	}

	async function setujui(
		id: number
	) {

		const confirmApprove =
			confirm(
				'Setujui pendaftar menjadi santri?'
			);

		if (!confirmApprove) {
			return;
		}

		const res = await fetch(
			'/api/pendaftar',
			{
				method: 'PUT',

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

		if (!res.ok) {

			toast.error(
				result.message ||
				'Gagal menyetujui pendaftar'
			);

			return;
		}

		toast.success(
			'Pendaftar berhasil dijadikan santri'
		);

		location.reload();
	}

	async function deleteData(
		id: number
	) {

		const confirmDelete =
			confirm(
				'Hapus data pendaftar?'
			);

		if (!confirmDelete) {
			return;
		}

		const res = await fetch(
			'/api/pendaftar',
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

		if (!res.ok) {

			toast.error(
				result.message ||
				'Gagal menghapus data'
			);

			return;
		}

		toast.success(
			'Data pendaftar berhasil dihapus'
		);

		location.reload();
	}
</script>

<svelte:head>
	<title>Data Pendaftar</title>
</svelte:head>

<div class="space-y-8">

	<!-- Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

		<div>

			<h1 class="text-5xl font-bold">
				Data Pendaftar
			</h1>

			<p class="text-gray-500 mt-3 text-lg">
				Kelola seluruh data pendaftar pondok
			</p>

		</div>

		<div class="bg-yellow-100 text-yellow-700 px-6 py-4 rounded-3xl">

			<p class="text-sm">
				Total Pendaftar
			</p>

			<h2 class="text-3xl font-bold mt-1">
				{data.pendaftar.length}
			</h2>

		</div>

	</div>

	<!-- TOPBAR -->
	<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

		<!-- SEARCH -->
		<div class="flex gap-3">

			<input
				bind:value={search}
				placeholder="Cari nama pendaftar..."
				class="border border-gray-200 rounded-2xl px-5 py-3 w-80 outline-none focus:ring-4 focus:ring-black/10"
			/>

			<button
				onclick={searchData}
				class="bg-black text-white px-6 rounded-2xl hover:scale-[1.02] transition"
			>
				Search
			</button>

		</div>

	</div>

	<!-- TABLE -->
	<div class="bg-white rounded-[32px] border shadow-sm overflow-hidden">

		<div class="overflow-x-auto">

			<table class="w-full">

				<thead class="bg-gray-50">

					<tr>

						<th class="p-5 text-left font-semibold">
							ID
						</th>

						<th class="p-5 text-left font-semibold">
							Nama
						</th>

						<th class="p-5 text-left font-semibold">
							No HP
						</th>

						<th class="p-5 text-left font-semibold">
							Alamat
						</th>

						<th class="p-5 text-left font-semibold">
							Status
						</th>

						{#if data.user.role === 'admin'}

							<th class="p-5 text-left font-semibold">
								Action
							</th>

						{/if}

					</tr>

				</thead>

				<tbody>

					{#if data.pendaftar.length === 0}

						<tr>

							<td
								colspan="6"
								class="p-16 text-center text-gray-500"
							>

								<h2 class="text-2xl font-semibold mb-2">
									Data Tidak Ditemukan
								</h2>

								<p>
									Belum ada data pendaftar tersedia
								</p>

							</td>

						</tr>

					{/if}

					{#each data.pendaftar as item (item.id)}

						<tr class="border-t hover:bg-gray-50 transition">

							<td class="p-5 font-medium">
								#{item.id}
							</td>

							<td class="p-5">
								{item.nama}
							</td>

							<td class="p-5">
								{item.no_hp}
							</td>

							<td class="p-5 max-w-xs truncate">
								{item.alamat}
							</td>

							<td class="p-5">

								<span class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
									Pending
								</span>

							</td>

							{#if data.user.role === 'admin'}

								<td class="p-5">

									<div class="flex gap-3 flex-wrap">

										<button
											onclick={() =>
												setujui(
													Number(item.id)
												)}
											class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl transition"
										>
											Setujui
										</button>

										<button
											onclick={() =>
												deleteData(
													Number(item.id)
												)}
											class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl transition"
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

	</div>

</div>
```
