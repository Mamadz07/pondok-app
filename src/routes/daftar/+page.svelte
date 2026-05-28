<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let nama = '';
	let no_hp = '';

	let tempat_lahir = '';
	let tanggal_lahir = '';

	let alamat = '';

	let nama_wali = '';
	let no_hp_wali = '';

	let loading = false;

	function kembali() {
		goto('/');
	}

	function validasiNomor(
		no: string
	) {

		if (
			!no.startsWith('08')
		) {
			return false;
		}

		if (
			!/^[0-9]+$/.test(no)
		) {
			return false;
		}

		if (
			no.length < 10
		) {
			return false;
		}

		return true;
	}

	async function submitForm() {

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

		// VALIDASI HP SANTRI
		if (
			!validasiNomor(
				no_hp
			)
		) {

			toast.error(
				'Nomor HP santri tidak valid'
			);

			return;
		}

		// VALIDASI HP WALI
		if (
			!validasiNomor(
				no_hp_wali
			)
		) {

			toast.error(
				'Nomor HP wali tidak valid'
			);

			return;
		}

		loading = true;

		const res = await fetch(
			'/api/pendaftar',
			{
				method: 'POST',

				headers: {
					'Content-Type':
						'application/json'
				},

				body: JSON.stringify({
					nama,
					no_hp,
					tempat_lahir,
					tanggal_lahir,
					alamat,
					nama_wali,
					no_hp_wali
				})
			}
		);

		const result =
			await res.json();

		if (!res.ok) {

			toast.error(
				result.message ||
				'Pendaftaran gagal'
			);

			loading = false;
			return;
		}

		toast.success(
			'Pendaftaran berhasil dikirim'
		);

		window.location.href =
			'/';
	}
</script>

<svelte:head>
	<title>
		Pendaftaran Santri
	</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">

	<div class="w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden">

		<!-- HEADER -->
		<div class="bg-black text-white p-8">

			<button
				onclick={kembali}
				class="mb-6 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl"
			>
				← Kembali
			</button>

			<h1 class="text-4xl font-bold mb-3">
				Pendaftaran Santri
			</h1>

			<p class="text-gray-300">
				Silakan isi formulir dengan data yang benar
			</p>

		</div>

		<!-- FORM -->
		<div class="p-8 grid md:grid-cols-2 gap-6">

			<!-- NAMA -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Nama Lengkap
				</label>

				<input
					bind:value={nama}
					placeholder="Masukkan nama lengkap"
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
				/>

			</div>

			<!-- NO HP -->
			<div>

				<label class="block mb-2 font-semibold">
					No HP Santri
				</label>

				<input
					bind:value={no_hp}
					placeholder="08xxxxxxxxxx"
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
				/>

			</div>

			<!-- TEMPAT -->
			<div>

				<label class="block mb-2 font-semibold">
					Tempat Lahir
				</label>

				<input
					bind:value={tempat_lahir}
					placeholder="Contoh: Sidoarjo"
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
				/>

			</div>

			<!-- TANGGAL -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Tanggal Lahir
				</label>

				<input
					type="date"
					bind:value={tanggal_lahir}
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
				/>

			</div>

			<!-- ALAMAT -->
			<div class="md:col-span-2">

				<label class="block mb-2 font-semibold">
					Alamat Lengkap
				</label>

				<textarea
					rows="4"
					bind:value={alamat}
					placeholder="Masukkan alamat lengkap"
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none resize-none"
				/>

			</div>

			<!-- NAMA WALI -->
			<div>

				<label class="block mb-2 font-semibold">
					Nama Wali
				</label>

				<input
					bind:value={nama_wali}
					placeholder="Nama orang tua/wali"
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
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
					class="w-full border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black/10 outline-none"
				/>

			</div>

			<!-- BUTTON -->
			<div class="md:col-span-2">

				<button
					onclick={submitForm}
					disabled={loading}
					class="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-50"
				>

					{#if loading}
						Mengirim Data...
					{:else}
						Daftar Sekarang
					{/if}

				</button>

			</div>

		</div>

	</div>

</div>