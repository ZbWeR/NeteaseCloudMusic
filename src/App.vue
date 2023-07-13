<template>
  <router-view />
  <FooterPlay></FooterPlay>
</template>

<script>
import FooterPlay from "./components/FooterPlay.vue";
export default {
  setup() {},
  components: {
    FooterPlay,
  },
};
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
