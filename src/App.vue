<template>
  <router-view />
  <FooterPlay v-show="showFooterMusic"></FooterPlay>
</template>

<script setup>
import FooterPlay from "./components/FooterPlay.vue";
import { useMapState } from "./utils/useVuex";

const { showFooterMusic } = useMapState(["showFooterMusic"]);
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
* {
  ::-webkit-scrollbar {
    display: none !important;
  }
}

.icon {
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
li {
  list-style: none;
}
body {
  background-color: #f8f9fd;
  height: 100%;
}
a {
  color: black;
}
</style>
