<template>
  <div class="top-nav">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-caidan"></use>
    </svg>
    <div class="top-title">
      <router-link :to="{ path: 'userInfo' }">
        <span>我的</span>
      </router-link>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <router-link :to="{ path: 'search' }">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style lang="less">
.top-nav {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .top-title {
    > span {
      font-size: 0.36rem;
      display: inline-block;
      padding: 0 0.2rem;
    }
    > span.active {
      font-weight: 700;
    }
  }
}
</style>