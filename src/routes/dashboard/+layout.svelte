<script lang="ts">
	let { data, children } = $props();

	async function logout() {
		await fetch('/api/logout', {
			method: 'POST'
		});

		window.location.href = '/login';
	}
</script>

<div class="min-h-screen flex bg-gray-100">
	<!-- Sidebar -->

	<!-- Content -->
	<main class="flex-1 p-6">
		{@render children()}
	</main>
</div>