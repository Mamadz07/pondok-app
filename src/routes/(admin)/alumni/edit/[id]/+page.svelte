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
		tahun_lulus,
		nama_wali,
		no_hp_wali,
	} = data.alumni;

	let loading = false;

	let formError = '';
	let errors: any = {};

	function kembali() {
		goto('/alumni');
	}

	function hasError(
		field: string
	) {
		return errors[field];
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

	async function submitForm() {

		errors = {};
		formError = '';

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

			formError =
				'Semua form wajib diisi';

			toast.error(
				formError
			);

			return;
		}

		// VALIDASI NOMOR HP
		if (
			!validasiNomor(no_hp) ||
			!validasiNomor(no_hp_wali)
		) {

			formError =
				'Nomor HP tidak valid';

			toast.error(
				formError
			);

			return;
		}

		loading = true;

		const res = await fetch(
			'/api/alumni',
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
					tahun_lulus,
					nama_wali,
					no_hp_wali
				})
			}
		);

		const result =
			await res.json();

		if (!res.ok) {

			errors =
				result.errors
					?.fieldErrors || {};

			formError =
				result.message ||
				'Periksa kembali form';

			toast.error(
				formError
			);

			loading = false;
			return;
		}

		toast.success(
			'Data alumni berhasil diupdate'
		);

		window.location.href =
			'/alumni';
	}
</script>

<svelte:head>
	<title>Edit Alumni</title>
</svelte:head>

<div class="max-w-3xl mx-auto">

	<!-- HEADER -->
	<div class="flex items-center justify-between mb-8">

		<div>

			<h1 class="text-4xl font-bold">
				Edit Alumni
			</h1>

			<p class="text-gray-500 mt-2">
				Update data alumni pondok
			</p>

		</div>

		<button
			onclick={kembali}
			class="bg-gray-100 hover:bg-gray-200 transition px-5 py-3 rounded-2xl"
		>
			← Kembali
		</button>

	</div>

	<!-- ERROR -->
	{#if formError}

		<div class="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

			<p class="font-semibold mb-1">
				Terjadi kesalahan
			</p>

			<p>
				{formError}
			</p>

		</div>

	{/if}

	<!-- CARD -->
	<div class="bg-white rounded-[32px] border shadow-sm p-8">

		<!-- NAMA -->
		<div class="mb-6">

			<label for="nama" class="block mb-3 font-semibold">
				Nama Alumni
			</label>

			<input
				id="nama"
				bind:value={nama}
				placeholder="Nama alumni"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('nama')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- NO HP -->
		<div class="mb-6">

			<label for="no_hp" class="block mb-3 font-semibold">
				Nomor HP
			</label>

			<input
				id="no_hp"
				bind:value={no_hp}
				placeholder="08xxxxxxxxxx"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('no_hp')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- TEMPAT LAHIR -->
		<div class="mb-6">

			<label for="tempat_lahir" class="block mb-3 font-semibold">
				Tempat Lahir
			</label>

			<input
				id="tempat_lahir"
				bind:value={tempat_lahir}
				placeholder="Tempat lahir"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('tempat_lahir')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- TANGGAL LAHIR -->
		<div class="mb-6">

			<label for="tanggal_lahir" class="block mb-3 font-semibold">
				Tanggal Lahir
			</label>

			<input
				id="tanggal_lahir"
				type="date"
				bind:value={tanggal_lahir}
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('tanggal_lahir')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- NAMA WALI -->
		<div class="mb-6">

			<label for="nama_wali" class="block mb-3 font-semibold">
				Nama Wali
			</label>

			<input
				id="nama_wali"
				bind:value={nama_wali}
				placeholder="Nama wali"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('nama_wali')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- NO HP WALI -->
		<div class="mb-6">

			<label for="no_hp_wali" class="block mb-3 font-semibold">
				Nomor HP Wali
			</label>

			<input
				id="no_hp_wali"
				bind:value={no_hp_wali}
				placeholder="08xxxxxxxxxx"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('no_hp_wali')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- TAHUN LULUS -->
		<div class="mb-6">

			<label class="block mb-3 font-semibold">
				Tahun Lulus
			</label>

			<input
				type="number"
				bind:value={tahun_lulus}
				placeholder="2026"
				class={`w-full border rounded-2xl px-5 py-4 outline-none transition
				${
					hasError('tahun_lulus')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- ALAMAT -->
		<div class="mb-8">

			<label class="block mb-3 font-semibold">
				Alamat
			</label>

			<textarea
				rows="5"
				bind:value={alamat}
				placeholder="Alamat alumni"
				class={`w-full border rounded-2xl px-5 py-4 outline-none resize-none transition
				${
					hasError('alamat')
					? 'border-red-500 bg-red-50'
					: 'border-gray-200 focus:ring-2 focus:ring-black/10'
				}`}
			/>

		</div>

		<!-- BUTTON -->
		<button
			onclick={submitForm}
			disabled={loading}
			class="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-50"
		>

			{#if loading}
				Menyimpan...
			{:else}
				Update Alumni
			{/if}

		</button>

	</div>

</div>