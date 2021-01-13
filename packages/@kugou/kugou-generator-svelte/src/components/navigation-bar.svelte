<script>
  import { onMount } from 'svelte'
  import { systemInfo, capsuleHeight } from '@/utils/const'

  export let title = '';
  export let showback = true;
  export let onBack;
  export let color = '#fff';
  export let type = 1;

  let height = 0;


  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    if (type === 1) {
      history.goBack()
    } else {
      window.MiniApp && window.MiniApp.navigateBack({
        delta: 1
      });
    }
  };

  onMount(() => {
    height = capsuleHeight
  });
</script>

<header class="navigation-bar" style="height:{height}px;top:{Number(systemInfo.statusBarHeight || 20)}px;">
  <span class="navigation-bar__icon" class:is-hidden={!showback}>
    <i class="weui-icon-back-arrow-thin" style="background-color:{color}" on:click={handleBack} />
  </span>
  <div>{title}</div>
</header>

<style lang="scss">
.navigation-bar {
  position: fixed;
  z-index: 1000;
  width: 100%;
  color: white;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  div {
    font-size: 36px;
    padding-left: 20px;
    width: 100%;
    text-align: center;
    line-height: 1;
    font-weight: bold;
  }
  &__icon {
    position: absolute;
    height: 36px;
    top: 50%;
    left: 40px;
    transform: translate(0, -50%);
    opacity: 1;
    transition: opacity 500ms ease-in-out;
    &.is-hidden {
      opacity: 0;
    }
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
