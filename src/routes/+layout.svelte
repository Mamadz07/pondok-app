
<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';

  async function logout() {
    await fetch("/api/logout", {
      method: "POST"
    });

    window.location.href = "/login";
  }
</script>
<Toaster richColors />
<div class="min-h-screen flex">
  <!-- Sidebar -->
  <aside class="w-64 bg-black text-white p-5">
    <h1 class="text-2xl font-bold mb-8">
      Pondok App
    </h1>

    <nav class="flex flex-col gap-3">
      <a href="/dashboard">
        Dashboard
      </a>

      <a href="/santri">
        Santri
      </a>

      <a href="/alumni">
        Alumni
      </a>

      <a href="/pendaftar">
        Pendaftar
      </a>
    </nav>

    <button
      on:click={logout}
      class="mt-10 bg-red-500 px-3 py-2 rounded"
    >
      Logout
    </button>
  </aside>

  <!-- Content -->
  <main class="flex-1 p-5">
    <slot />
  </main>
</div>