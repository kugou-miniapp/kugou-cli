<template>
  <header className="navigation-bar" :style="styles">
      <span className="navigation-bar__icon">
        <i className="weui-icon-back-arrow-thin" @click="handleBack" />
      </span>
    <div>{{ title }}</div>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
    barClick: Function
  },
  data() {
    return {
      height: 0
    }
  },
  computed: {
    styles() {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    handleBack() {
      if (this.backClick) {
        this.backClick();
      } else {
        window.MiniApp && window.MiniApp.navigateBack({
          delta: 1
        });
      }
    }
  },
  created() {
    window.MiniApp && window.MiniApp.getSystemInfo({
      success: res => {
        const height = Number(res.statusBarHeight || 0) * 2 + (res.brand === 'iphone' ? 24 : 20)
        this.height = height
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: fixed;
  z-index: 10000;
  width: 100%;
  color: white;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 36px;
    padding-left: 30px;
    width: 100%;
    text-align: left;
    line-height: 1;
    font-weight: bold;
  }
  &__icon {
    position: absolute;
    padding: 10px 30px;
    top: 50%;
    left: 40px;
    transform: translate(-50%, -50%);
  }
}

.weui-icon-back-arrow-thin {
  @include button;
  color: white;
  width: 22px;
  height: 36px;
}

.weui-icon-back-arrow-thin {
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2019.438L8.955%2020.5l-7.666-7.79a1.02%201.02%200%20010-1.42L8.955%203.5%2010%204.563%202.682%2012%2010%2019.438z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
}

[class^="weui-icon-"],
[class*=" weui-icon-"] {
  display: inline-block;
  vertical-align: middle;
  mask-position: 50% 50%;
  mask-repeat: no-repeat;
  mask-size: 100%;
  background-color: currentColor;
}
</style>
