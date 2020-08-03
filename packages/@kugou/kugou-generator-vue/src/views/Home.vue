<template>
  <section class="home">
    <main>
      <img alt="logo" src="@/assets/img/logo.png" />
      <div class="home__title">Hello Kugou!</div>
      <a class="home__link" href="http://open.kugou.com/docs/mini-app/#/README" target="_blank" rel="noopener noreferrer">开发者文档</a>
    </main>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #282c34;
  display: flex;
  &__title {
    font-size: 60px;
    margin-top: 40px;
    color: #ffffff;
  }
  
  &__link {
    margin-top: 20px;
    text-decoration: underline;
    color: #61dafb;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    text-align: center;
  }
}
</style>