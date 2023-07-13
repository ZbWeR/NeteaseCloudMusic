<template>
  <div>
    <TopNav />
    <SwiperTop />
    <IconList></IconList>
    <MusciList></MusciList>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import SwiperTop from "@/components/home/SwiperTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusciList from "@/components/home/MusciList.vue";

export default {
  name: "HomeView",
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusciList,
  },
};
</script>
