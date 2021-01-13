<script>
  import { Router, Route } from "svelte-routing";
  import Home from '@/views/home'
</script>

<style lang="scss">
@import url(~@/styles/index.scss);
</style>

<Router>
  <Route path="/" component={Home} />
</Router>
