<script lang="ts">
  let { data } = $props();

  let {
    id,
    nama,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_wali,
    no_hp_wali,
    tanggal_masuk,
    status
  } = data.santri;

  async function updateData() {
    const res = await fetch(
      "/api/santri",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          id,
          nama,
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

    const result = await res.json();

    if (result.success) {
      window.location.href =
        "/santri";
    }
  }
</script>

<h1 class="text-3xl font-bold mb-5">
  Edit Santri
</h1>

<div class="max-w-xl bg-white border rounded-xl p-5">
  <div class="mb-3">
    <label>Nama</label>

    <input
      bind:value={nama}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>Tempat Lahir</label>

    <input
      bind:value={tempat_lahir}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>Tanggal Lahir</label>

    <input
      type="date"
      bind:value={tanggal_lahir}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>Alamat</label>

    <textarea
      bind:value={alamat}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>Nama Wali</label>

    <input
      bind:value={nama_wali}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>No HP Wali</label>

    <input
      bind:value={no_hp_wali}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-3">
    <label>Tanggal Masuk</label>

    <input
      type="date"
      bind:value={tanggal_masuk}
      class="w-full border p-2 rounded"
    />
  </div>

  <div class="mb-5">
    <label>Status</label>

    <select
      bind:value={status}
      class="w-full border p-2 rounded"
    >
      <option>Aktif</option>
      <option>Alumni</option>
      <option>Keluar</option>
    </select>
  </div>

  <button
    on:click={updateData}
    class="bg-black text-white px-4 py-2 rounded"
  >
    Update
  </button>
</div>