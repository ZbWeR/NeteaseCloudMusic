<template>
  <img class="bgImg" :src="musicInfo.al.picUrl" alt="" />
  <div class="detailTop">
    <svg class="icon" aria-hidden="true" @click="updateDetailShow">
      <use xlink:href="#icon-shanglajiantou"></use>
    </svg>
    <div class="topText">
      <h1 v-if="isStatic" ref="musicName">{{ musicInfo.name }}</h1>
      <Vue3Marquee
        v-else
        style="color: #fff; font-size: 0.4rem; padding: 0 10px"
        >{{ musicInfo.name }}</Vue3Marquee
      >
      <p>{{ getSubInfo(musicInfo.ar) }}</p>
    </div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-fenxiang"></use>
    </svg>
  </div>
  <Transition name="fade" mode="out-in">
    <div class="detailBody" v-if="!showLyric" @click="showLyric = !showLyric">
      <img
        class="needle"
        :class="isPlaying ? 'needle_active' : ''"
        src="@\assets\needle-ab.png"
        alt=""
      />
      <img class="cd_border" src="@\assets\cd.png" alt="" />
      <img
        class="cd_img"
        :class="isPlaying ? 'cd_img_active' : ''"
        :src="musicInfo.al.picUrl"
        alt=""
      />
      <div class="funcIcons">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use></svg
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai1"></use></svg
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-renqun"></use></svg
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use></svg
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
    </div>
    <div
      class="detailLyric"
      ref="lyricBox"
      v-else
      @click="showLyric = !showLyric"
    >
      <p
        v-for="(item, index) in lyric"
        :key="index"
        :class="
          currentTime * 1000 >= item.sec && currentTime * 1000 < item.nextTime
            ? 'lrc_active'
            : ''
        "
      >
        {{ item.lrc }}
      </p>
    </div>
  </Transition>

  <div class="controller">
    <div class="playProgress">
      <div class="progressTime">
        {{ formatTime(currentTime) }}
      </div>
      <div class="progressBox">
        <div
          class="progress_line"
          :style="{ width: `${(currentTime * 100) / srcTime}%` }"
        ></div>
        <div
          class="progress_point"
          :style="{ left: `${(currentTime * 100) / srcTime}%` }"
        ></div>
      </div>
      <div class="progressTime">
        {{ formatTime(srcTime) }}
      </div>
    </div>

    <div class="playIcons">
      <!-- TODO: 随机播放,isRand标识随机模式,historyList用于随机模式下存储历史歌曲 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiaoxunhuan"></use></svg
      ><svg class="icon" aria-hidden="true" @click="changeIndex(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg class="icon play-icon" aria-hidden="true" @click="togglePlay">
        <use :xlink:href="isPlaying ? '#icon-zanting1' : '#icon-bofang2'"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeIndex(1)">
        <use xlink:href="#icon-xiayishou"></use></svg
      ><svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { Vue3Marquee } from "vue3-marquee";
import { useMapState, useMapMutations } from "@/utils/useVuex.js";

const musicName = ref(null);
const lyricBox = ref(null);
const isStatic = ref(true);
const showLyric = ref(false);

const props = defineProps(["musicInfo", "togglePlay", "lyricText", "srcTime"]);
const { isPlaying, currentTime, playingIndex } = useMapState([
  "isPlaying",
  "currentTime",
  "playingIndex",
]);
const { updateDetailShow, updatePlayingIndex } = useMapMutations([
  "updateDetailShow",
  "updatePlayingIndex",
]);

onMounted(() => {
  if (checkOverflow(musicName.value)) {
    isStatic.value = false;
  }
});

// 渲染歌词
const lyric = computed(() => {
  if (lyric == "") return;
  let arr = props.lyricText.split(/[\r\n]+/).map((item) => {
    if (item == "") return;
    let minute = item.slice(1, 3);
    let second = item.slice(4, 6);
    let minsec = item.slice(7, 9);
    let sec =
      parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(minsec);
    let lrc = item.replace(/\[.*\]/, "");
    return { lrc, sec };
  });
  arr = arr.filter((item) => item !== undefined);
  arr.forEach((item, index) => {
    if (index === arr.length - 1) item.nextTime = -1;
    else item.nextTime = arr[index + 1].sec;
  });
  return arr;
});

// 判断歌曲标题是否溢出,溢出则转为跑马灯组件
function checkOverflow(item) {
  return item.scrollWidth > item.offsetWidth;
}

// 格式化时间
function formatTime(seconds) {
  seconds = parseInt(seconds);
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

// 从歌手数组中提取歌手信息
function getSubInfo(item) {
  let artist = item.map((v) => v.name);
  return `${artist.join("/")}`;
}

function changeIndex(val) {
  updatePlayingIndex(playingIndex.value + val);
}

// 监听时间变化让歌词滚动
watch(
  () => currentTime.value,
  (newVal) => {
    let lrcActive = document.querySelector("p.lrc_active");
    if (lrcActive === null) return;
    lyricBox.value.scrollTo({
      top: lrcActive.offsetTop - 250,
      behavior: "smooth",
    });
  }
);
</script>

<style lang="less" scoped>
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(55px) brightness(0.45);
}

.detailTop {
  display: flex;
  height: 1.4rem;
  align-items: center;
  padding: 0 0.2rem;
  justify-content: center;
  gap: 0.3rem;
  .topText {
    width: 65%;
    text-align: center;
    > h1 {
      color: #fff;
      font-size: 0.4rem;
      font-weight: 400;
      white-space: nowrap;
    }
    > p {
      display: inline-block;
      width: 70%;
      margin-top: 0.1rem;
      color: #ccc;
      font-size: 0.32rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  > svg {
    fill: #fff;
  }
}

.detailBody {
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: center;
  top: 0.4rem;
  position: relative;
  > .needle {
    width: 2rem;
    position: absolute;
    top: 0;
    left: calc(50% - 0.5rem);
    transition: all 1s;
    transform-origin: 0 0;
    z-index: 1;
    transform: rotate(-30deg);
  }
  > .needle_active {
    transform: rotate(0deg);
  }
  > .cd_border {
    position: absolute;
    width: 6rem;
    top: 2rem;
  }

  > .cd_img {
    position: absolute;
    width: 4rem;
    border-radius: 2rem;
    box-shadow: 0 0 8px 4px #000;
    top: 3rem;
    z-index: 1;
    animation: spin 10s linear infinite;
    animation-play-state: paused;
  }
  > .cd_img_active {
    animation-play-state: running !important;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .funcIcons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0.8rem;
    > svg {
      fill: #fff;
    }
  }
}

.detailLyric {
  height: 12rem;
  padding: 5rem 0.6rem;
  position: relative;
  top: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  transition: all 0.3s;
  > p {
    color: #bbb;
    text-align: center;
    margin-bottom: 0.6rem;
    font-size: 0.34rem;
    transition: all 0.3s;
  }
  .lrc_active {
    color: #fff;
    transform: scale(1.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.controller {
  position: relative;
  top: 0.5rem;
  padding: 0 0.2rem;
  svg {
    fill: #eee;
  }
  .funcIcons,
  .playIcons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .playIcons {
    margin-top: 0.2rem;
  }
  .play-icon {
    fill: #fff;
    height: 1.4rem;
    width: 1.4rem;
  }

  .playProgress {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .progressBox {
      width: 70%;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.6);
      position: relative;
      .progress_line {
        height: 2px;
        background-color: rgba(255, 255, 255, 0.8);
      }
      .progress_point {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.1rem;
        position: absolute;
        top: -0.08rem;
        transition: all 0.1s;
        background-color: #fff;
      }
    }
    .progressTime {
      color: #eee;
      font-size: 12px;
    }
  }
}
</style>