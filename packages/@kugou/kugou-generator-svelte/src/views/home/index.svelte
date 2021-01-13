<script>
import NavigationBar from '@/components/navigation-bar'
import logo from '@/assets/img/logo.png'
</script>

<style lang="scss">
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

<section class="home">
  <NavigationBar />
  <main>
    <img alt="logo" src={logo} />
    <div class="home__title">Hello Kugou!</div>
    <a class="home__link" href="http://open.kugou.com/docs/mini-app/#/README" target="_blank" rel="noopener noreferrer">开发者文档</a>
  </main>
</section>
