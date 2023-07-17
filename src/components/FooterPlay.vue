<template>
  <div class="footerPlay">
    <div class="alImg">
      <img :src="musicPlayList[playingIndex].al.picUrl" alt="" />
    </div>
    <div class="musicInfo" @click="updateDetailShow">
      <p>
        {{ musicPlayList[playingIndex].name }}
        <span>{{ getSubInfo(musicPlayList[playingIndex].ar) }}</span>
      </p>
    </div>
    <svg class="icon" aria-hidden="true" @click="togglePlay" v-if="!isPlaying">
      <use xlink:href="#icon-bofang1"></use>
    </svg>
    <svg class="icon" aria-hidden="true" @click="togglePlay" v-else>
      <use xlink:href="#icon-zanting"></use>
    </svg>
    <svg class="icon playlist" aria-hidden="true">
      <use xlink:href="#icon-playlist"></use>
    </svg>
    <audio
      ref="audio"
      @canplay="duration = audio.duration"
      :src="`https://music.163.com/song/media/outer/url?id=${musicPlayList[playingIndex].id}.mp3`"
    ></audio>
    <van-popup :show="detailShow" position="bottom" :style="{ height: '100%' }">
      <MusicDetail
        :musicInfo="musicPlayList[playingIndex]"
        :togglePlay="togglePlay"
        :lyricText="lyricText"
        :srcTime="duration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>

<script setup>
import MusicDetail from "./item/MusicDetail.vue";
import { ref, watch } from "vue";
import {
  useMapState,
  useMapMutations,
  useMapActions,
} from "@/utils/useVuex.js";

let { musicPlayList, playingIndex, isPlaying, detailShow, lyricText } =
  useMapState([
    "musicPlayList",
    "playingIndex",
    "isPlaying",
    "detailShow",
    "lyricText",
  ]);
const { updateIsPlaying, updateDetailShow, updateCurrentTime } =
  useMapMutations(["updateIsPlaying", "updateDetailShow", "updateCurrentTime"]);
const { getLyric } = useMapActions(["getLyric"]);
const audio = ref(null);
let duration = ref(5940); // 给个初始值
let interval = null;

function getSubInfo(item) {
  let artist = item.map((v) => v.name);
  return `- ${artist.join("/")}`;
}

function musicRunning() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (audio.value.ended) {
      clearInterval(interval);
      updateIsPlaying(false);
    }
    updateCurrentTime(audio.value.currentTime);
  }, 1000);
}

const togglePlay = () => {
  const isPaused = audio.value.paused;
  updateIsPlaying(isPaused);
  if (isPaused) {
    audio.value.play();
    musicRunning();
  } else {
    audio.value.pause();
    clearInterval(interval);
  }
};

/* 
  监听 歌单 与 正在播放歌曲下标 的变化
  变化后则自动播放音乐,并获取新的歌词
  更新播放状态和播放时间
*/
watch(
  () => [playingIndex.value, musicPlayList.value],
  (newVal) => {
    audio.value.autoplay = true;
    musicRunning();
    getLyric(newVal[1][newVal[0]].id);
    duration = audio.value.duration;
    updateIsPlaying(true);
    updateCurrentTime(audio.value.currentTime);
  }
);
</script>

<style lang="less" scoped>
.footerPlay {
  width: 100%;
  height: 1.2rem;
  background-color: rgba(255, 255, 255, 0.95);
  position: fixed;
  bottom: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0 0 10px rgb(204 204 204 / 57%);
  .alImg {
    > img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      overflow: hidden;
    }
  }
  .musicInfo {
    width: 55%;
    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      > span {
        color: #999;
      }
    }
  }
  .icon.playlist {
    width: 0.4rem;
  }
}
</style>