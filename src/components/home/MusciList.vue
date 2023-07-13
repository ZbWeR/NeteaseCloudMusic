<template>
  <div class="musicList">
    <div class="listTitle">
      <h1>推荐歌单</h1>
      <h2>查看更多</h2>
    </div>
    <div class="musicItems">
      <div
        class="musicItemBox"
        v-for="(item, index) in state.musicList"
        :key="index"
      >
        <router-link :to="{ path: 'itemMusic', query: { id: item.id } }">
          <div class="imgBox">
            <img :src="item.picUrl" alt="" />
            <span>{{ Math.floor(item.playCount / 10000) }}万</span>
            <svg class="icon play-icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
          <p>{{ item.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getMusicList } from "@/request/api/home.js";
export default {
  setup() {
    let state = reactive({
      musicList: [],
    });
    onMounted(async () => {
      let res = await getMusicList();
      state.musicList = res.data.result;
      console.dir(state);
    });
    return { state };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  padding: 0 0.2rem;
  .listTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 0.4rem;
      letter-spacing: 0.02rem;
    }
    h2 {
      font-size: 0.32rem;
      padding: 0 0.16rem;
      font-weight: 400;
      color: #999;
      border: 1px solid #ccc;
      border-radius: 0.2rem;
    }
  }
  .musicItems {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    margin-top: 0.2rem;
    height: 3rem;
    .musicItemBox {
      display: flex;
      justify-content: center;
      margin-left: 0.2rem;
      flex-direction: column;
      flex-basis: 30%;
      flex-shrink: 0;
      height: 100%;
      .imgBox {
        font-size: 0.28rem;
        position: relative;
        img {
          width: 100%;
          border-radius: 0.16rem;
        }
        .play-icon {
          position: absolute;
          fill: #fff;
          width: 0.4rem;
          height: 0.4rem;
          bottom: 5%;
          right: 5%;
        }
        span {
          font-size: 0.24rem;
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.02rem;
          position: absolute;
          top: 5%;
          right: 5%;
        }
      }
      p {
        margin-top: 0.1rem;
        width: 100%;
        font-size: 0.26rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .musicItemBox:first-child {
      margin: 0;
    }
  }
  .musicItems::-webkit-scrollbar {
    display: none;
    // 隐藏滚动条
  }
}
</style>