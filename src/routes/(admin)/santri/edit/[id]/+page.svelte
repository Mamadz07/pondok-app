<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let {
		id,
		nama,
		no_hp,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali,
		tanggal_masuk,
		status
	} = data.santri;

	let loading = false;

	function kembali() {
		goto('/santri');
	}

	function validasiNomor(no: string) {

		if (!no.startsWith('08')) {
			return false;
		}

		if (!/^[0-9]+$/.test(no)) {
			return false;
		}

		if (no.length < 10) {
			return false;
		}

		return true;
	}

	async function updateData() {

		// VALIDASI
		if (
			!nama ||
			!no_hp ||
			!tempat_lahir ||
			!tanggal_lahir ||
			!alamat ||
			!nama_wali ||
			!no_hp_wali
		) {

			toast.error(
				'Semua form wajib diisi'
			);

			return;
		}

		// VALIDASI NOMOR
		if (
			!validasiNomor(no_hp)
		) {

			toast.error(
				'Nomor HP santri tidak valid'
			);

			return;
		}

		if (
			!validasiNomor(no_hp_wali)
		) {

			toast.error(
				'Nomor HP wali tidak valid'
			);

			return;
		}

		loading = true;

		const res = await fetch(
			'/api/santri',
			{
				method: 'PUT',

				headers: {
					'Content-Type':
						'application/json'
				},

				body: JSON.stringify({
					id,
					nama,
					no_hp,
					tempat_lahir,
					tanggal_lahir,
					alamat,
					nama_wali,
					no_hp_wali,
					tanggal_masuk,
					status
				})
			}
		);

		const result =
			await res.json();

		if (!res.ok) {

			toast.error(
				result.message ||
				'Gagal update data'
			);

			loading = false;
			return;
		}

		toast.success(
			'Data santri berhasil diupdate'
		);

		window.location.href =
			'/santri';
	}
</script>

<svelte:head>
	<title>Edit Santri</title>
</svelte:head>

<div class="max-w-3xl mx-auto">

	<!-- HEADER -->
	<div class="flex items-center justify-between mb-8">

		<div>

			<h1 class="text-4xl font-bold">
				Edit Santri
			</h1>

			<p class="text-gray-500 mt-2">
				Update data santri pondok
			</p>

		</div>

		<button
			onclick={kembali}
			class="bg-gray-100 hover:bg-gray-200 transition px-5 py-3 rounded-2xl"
		>
			← Kembali
		</button>

	</div>

	<!-- CARD -->
	<div class="bg-white border rounded-[32px] shadow-sm p-8">

		<div class="grid md:grid-cols-2 gap-6">

			<!-- NAMA -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Nama Santri
				</label>

				<input
					bind:value={nama}
					placeholder="Nama santri"
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- NO HP -->
			<div>

				<label class="block mb-2 font-semibold">
					Nomor HP
				</label>

				<input
					bind:value={no_hp}
					placeholder="08xxxxxxxxxx"
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- TEMPAT LAHIR -->
			<div>

				<label class="block mb-2 font-semibold">
					Tempat Lahir
				</label>

				<input
					bind:value={tempat_lahir}
					placeholder="Tempat lahir"
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- TANGGAL LAHIR -->
			<div>

				<label class="block mb-2 font-semibold">
					Tanggal Lahir
				</label>

				<input
					type="date"
					bind:value={tanggal_lahir}
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- TANGGAL MASUK -->
			<div>

				<label class="block mb-2 font-semibold">
					Tanggal Masuk
				</label>

				<input
					type="date"
					bind:value={tanggal_masuk}
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- NAMA WALI -->
			<div>

				<label class="block mb-2 font-semibold">
					Nama Wali
				</label>

				<input
					bind:value={nama_wali}
					placeholder="Nama wali"
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- NO HP WALI -->
			<div>

				<label class="block mb-2 font-semibold">
					No HP Wali
				</label>

				<input
					bind:value={no_hp_wali}
					placeholder="08xxxxxxxxxx"
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

			<!-- STATUS -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Status
				</label>

				<select
					bind:value={status}
					class="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black/10"
				>
					<option value="aktif">
						Aktif
					</option>

					<option value="keluar">
						Keluar
					</option>
				</select>

			</div>

			<!-- ALAMAT -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Alamat
				</label>

				<textarea
					rows="5"
					bind:value={alamat}
					placeholder="Alamat santri"
					class="w-full border rounded-2xl px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-black/10"
				/>

			</div>

		</div>

		<!-- BUTTON -->
		<div class="mt-8">

			<button
				onclick={updateData}
				disabled={loading}
				class="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-50"
			>

				{#if loading}
					Menyimpan...
				{:else}
					Update Santri
				{/if}

			</button>

		</div>

	</div>

</div>
