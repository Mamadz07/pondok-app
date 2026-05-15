<script lang="ts">
  let username = "";
  let password = "";
  let error = "";

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await res.json();

    if (!data.success) {
      error = data.message;
      return;
    }

    window.location.href = "/dashboard";
  }
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="w-full max-w-sm p-6 border rounded-xl">
    <h1 class="text-2xl font-bold mb-4">
      Login
    </h1>

    <input
      bind:value={username}
      placeholder="Username"
      class="w-full border p-2 mb-3 rounded"
    />

    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="w-full border p-2 mb-3 rounded"
    />

    {#if error}
      <p class="text-red-500 mb-3">
        {error}
      </p>
    {/if}

    <button
      on:click={login}
      class="w-full bg-black text-white p-2 rounded"
    >
      Login
    </button>
  </div>
</div>