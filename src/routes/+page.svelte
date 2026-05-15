<script lang="ts">
  let { data } = $props();
</script>

<h1 class="text-3xl font-bold mb-5">
  Dashboard
</h1>

<div class="bg-white border rounded-xl p-5">
  <p>
    Welcome {data.user.username}
  </p>

  <p>
    Role: {data.user.role}
  </p>
</div>