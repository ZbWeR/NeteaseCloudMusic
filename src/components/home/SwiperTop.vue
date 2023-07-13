<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getBanner } from "@/request/api/home.js";

export default {
  setup() {
    const images = ref([]);
    onMounted(async () => {
      getBanner().then((res) => {
        images.value = res.data.banners;
      });
    });
    return { images };
  },
};
</script>

<style lang="less">
#swiperTop {
  margin: 0 0.2rem;
  .van-swipe {
    width: 100%;
    .van-swipe-item {
      width: 100%;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: #fff;
      transform: scale(1.3);
    }
  }
}
</style>