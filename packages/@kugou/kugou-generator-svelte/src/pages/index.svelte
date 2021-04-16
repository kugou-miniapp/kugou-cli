<script lang="ts">
  import Router from "svelte-spa-router";
  import Index from '@/views/index/index.svelte'

  const routes = {
    '/': Index,
  }
</script>

<style lang="scss">
@import url('@/styles/index.scss');
</style>

<Router routes={routes}></Router>
