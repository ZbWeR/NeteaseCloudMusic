<template>
  <van-sticky offset-top="1rem" @change="toggleFixed">
    <div
      class="tracksList"
      :style="{
        // height: `${70 + 100 * state.trackCount}px`,
        backgroundColor: `rgba(255, 255, 255, ${state.isFixed ? 1 : 0.9})`,
        marginTop: `${state.isFixed ? '0' : '-1rem'}`,
      }"
    >
      <!-- 头部导航 -->
      <div class="listTop">
        <svg class="icon icon-play" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="titleText">
          <h1>播放全部</h1>
          <p>({{ state.trackCount }})</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-list-check"></use>
        </svg>
      </div>
      <!-- 歌曲列表(采用虚拟列表优化) -->
      <div
        class="virtual-listItems"
        @scroll="handleScroll"
        :style="{ overflowY: `${state.isFixed ? 'auto' : ''}` }"
      >
        <div
          class="scroll-container"
          :style="{ height: `${75 * state.trackCount}px` }"
        ></div>
        <ul class="list" ref="listRef">
          <li
            v-for="(item, index) in showList"
            :key="index"
            @click="playMusic(calcIndex(index))"
          >
            <div class="liIndex">
              {{ calcIndex(index + 1) }}
            </div>
            <div class="musicInfo">
              <h1>
                {{ item.name }}
                <span>{{
                  item.alia.length ? `&nbsp;(${item.alia[0]})` : ""
                }}</span>
              </h1>
              <p>{{ getSubInfo(item) }}</p>
            </div>
            <div class="svgContainer" @click.stop="console.log('TODO:播放MV')">
              <svg class="icon" aria-hidden="true" v-if="item.mv">
                <use xlink:href="#icon-shipin"></use>
              </svg>
            </div>
            <div class="svgContainer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo-shuxiang"></use>
              </svg>
            </div>
          </li>
          <p v-if="state.start == state.trackCount - 13">我也是有底线的~</p>
          <p v-else>加载中...</p>
        </ul>
      </div>
    </div>
  </van-sticky>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { getTracksList } from "@/request/api/item";
import { useMapMutations } from "@/utils/useVuex.js";

export default {
  setup(props) {
    const state = reactive({
      tracks: [],
      trackCount: 1,
      isFixed: false,
      scrollTop: 0,
      start: 0,
      musicListId: 0,
    });
    const listRef = ref(null);
    let itemHeight = 75;
    watch(
      () => props.playlist,
      (newVal) => {
        state.tracks = newVal.tracks;
        state.musicListId = newVal.id;
        state.trackCount = newVal.trackCount;
      }
    );
    watch(
      () => state.musicListId,
      async (newVal) => {
        let res = await getTracksList(newVal);
        state.tracks = [...state.tracks, ...res.data.songs];
      }
    );

    const showList = computed(() => {
      let startIndex = Math.max(state.start - 5, 0);
      let endIndex = Math.min(state.start + 8 + 5, state.trackCount);
      return state.tracks.slice(startIndex, endIndex);
    });

    function getSubInfo(item) {
      let artist = item.ar.map((v) => v.name);
      return `${artist.join("/")} - ${item.al.name}`;
    }
    const { updatePlayList, updatePlayingIndex } = useMapMutations([
      "updatePlayList",
      "updatePlayingIndex",
    ]);
    const toggleFixed = (isFixed) => (state.isFixed = isFixed);
    const calcIndex = (i) => i + Math.max(0, state.start - 5);
    const playMusic = (i) => {
      updatePlayList(state.tracks);
      updatePlayingIndex(i);
    };
    const handleScroll = (e) => {
      state.scrollTop = e.target.scrollTop;
      state.start = Math.min(
        Math.floor(state.scrollTop / itemHeight),
        state.trackCount - 8 - 5
      );
      listRef.value.style.top = `${
        (state.start > 4 ? state.start - 4 : 0) * itemHeight
      }px`;
    };

    return {
      state,
      showList,
      itemHeight,
      listRef,
      toggleFixed,
      handleScroll,
      getSubInfo,
      playMusic,
      calcIndex,
    };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.tracksList {
  border-radius: 0.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 18rem;
  overflow: hidden;
  .listTop {
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(224, 239, 253, 0.2);
    > svg {
      fill: #282828;
      width: 0.4rem;
    }
    .icon-play {
      fill: #ff2c4f;
    }
    .titleText {
      width: 70%;
      display: flex;
      align-items: center;
      > h1 {
        font-size: 0.34rem;
        letter-spacing: 0.04rem;
      }
      > p {
        margin-left: 0.2rem;
        font-size: 0.28rem;
        color: #999;
      }
    }
  }
  .virtual-listItems {
    height: 13rem;
    width: 100%;
    position: relative;
    .list {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 0 0.2rem;
      > p {
        color: #999;
        text-align: center;
        margin: 0.2rem 0;
      }
      li {
        height: 1.5rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .liIndex {
          color: #999;
          font-size: 0.36rem;
        }
        .musicInfo {
          width: 60%;
          > h1 {
            font-size: 0.32rem;
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            > span {
              color: #999;
            }
          }
          > p {
            margin-top: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #999;
            font-size: 0.28rem;
          }
        }
        > .svgContainer {
          width: 0.5rem;
          > svg {
            fill: #999;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>