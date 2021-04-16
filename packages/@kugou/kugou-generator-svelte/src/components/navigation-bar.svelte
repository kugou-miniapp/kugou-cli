<script lang="ts">
  import { systemInfo, capsuleHeight, isKugouMiniApp } from '@/utils/const'

  export let title = '';
  export let showback = true;
  export let onBack;
  export let color = '#fff';
  export let type = 1;

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    if (type === 1) {
      history.back()
    } else if(isKugouMiniApp) {
      window.MiniApp.navigateBack({
        delta: 1
      });
    }
  }
</script>

<header class="navigation-bar">
  <div class="navigation-bar__content" style={ `height: ${capsuleHeight / 16}rem;margin-top: ${(systemInfo.toolBarMoreTop || 42) / 16}rem;` }>
    {#if showback}
    <span class="navigation-bar__icon">
      <i class="weui-icon-back-arrow-thin" style="background-color:{color}" on:click={handleBack} />
    </span>
    {/if}
    <div>{title}</div>
  </div>
</header>

<style lang="scss">
.navigation-bar {
  position: fixed;
  z-index: 1000;
  width: 100%;
  color: white;
  top: 0;
  left: 0;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 0 0 30px;

    div {
      font-size: 36px;
      width: 100%;
      text-align: left;
    }
  }

  &__icon {
    position: relative;
    height: 36px;
    margin-top: 4px;
    margin-right: 20px;
  }
}

.weui-icon-back-arrow-thin {
  @include button;
  width: 22px;
  height: 36px;
  vertical-align: top;
}

.weui-icon-back-arrow-thin {
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2019.438L8.955%2020.5l-7.666-7.79a1.02%201.02%200%20010-1.42L8.955%203.5%2010%204.563%202.682%2012%2010%2019.438z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
}

[class^="weui-icon-"] {
  display: inline-block;
  mask-position: 50% 50%;
  mask-repeat: no-repeat;
  mask-size: 100%;
  background-color: currentColor;
}

</style>
