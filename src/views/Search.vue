<template>
  <div class="searchTopBox">
    <div
      class="searchTop"
      :style="{ backgroundColor: state.searchResult.length ? '#fff' : '' }"
    >
      <svg class="icon" aria-hidden="true" @click="handleBack">
        <use xlink:href="#icon-xitongfanhui"></use>
      </svg>
      <div class="inputBox">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input
          type="text"
          :placeholder="state.defaultWords"
          v-model="state.inputKeyWords"
          @keydown.enter="handleSearch"
        />
        <div class="svgContainer">
          <svg
            v-show="state.inputKeyWords != '' || state.searchResult.length"
            class="icon icon-cancel"
            aria-hidden="true"
            @click="clearSearchResult"
          >
            <use xlink:href="#icon-cancel"></use>
          </svg>
        </div>
      </div>
      <button @click="handleSearch">搜索</button>
    </div>
  </div>
  <div class="searchHistory" v-if="state.dataState === 0">
    <div class="header">
      <h1>搜索历史</h1>
      <svg class="icon" aria-hidden="true" @click="clearHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="content">
      <span
        v-for="(item, index) in state.historyList"
        :key="index"
        @click="searchFromHistory(item)"
        >{{ item }}</span
      >
    </div>
  </div>
  <div class="loader" v-else-if="state.dataState === 1">
    <div class="justify-content-center jimu-primary-loading"></div>
  </div>
  <div class="resultList" v-else>
    <div class="header">
      <svg class="icon play-icon" aria-hidden="true">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <h1>播放全部</h1>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
    <div class="content">
      <div
        class="musicBox"
        v-for="(item, index) in state.searchResult"
        :key="index"
        @click="playMusic(item.id)"
      >
        <div class="textInfo">
          <h2 v-html="highLight(item.name)"></h2>
          <p v-html="getSubInfo(item)"></p>
        </div>
        <div class="svgContainer" @click.stop="console.log('TODO:播放MV')">
          <svg class="icon" aria-hidden="true" v-if="item.mvid">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
        <div class="svgContainer">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="loader" v-if="state.nowPageIndex < state.maxPages">
      <div class="justify-content-center jimu-primary-loading"></div>
    </div>
    <p class="endAlert" v-else>我也是有底线的哦~</p>
  </div>
</template>

<script setup>
import {
  getDefaultWords,
  getSearchResult,
  getMusicDetail,
} from "@/request/api/search";
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { useMapState, useMapMutations } from "@/utils/useVuex";
import { debounce } from "@/utils/debounce";

const state = reactive({
  defaultWords: "",
  historyList: [],
  inputKeyWords: "",
  // 分页信息
  searchResult: [], // 源数据,分批次请求获取
  maxPages: 0, // 最大页数
  nowPageIndex: 1, //当前页码
  perNum: 30, // 每页的数据条数
  dataState: 0, // 数据状态: 0 未查询, 1 查询中,2 查询完成
});
const $router = useRouter();
const { musicPlayList, playingIndex } = useMapState([
  "musicPlayList",
  "playingIndex",
]);
const { updatePlayingIndex, updatePlayList } = useMapMutations([
  "updatePlayingIndex",
  "updatePlayList",
]);
let tmpKeyWords = "";
let isLoading = false;

onMounted(async () => {
  // 获取默认搜索关键词
  let res = await getDefaultWords();
  state.defaultWords = res.data.data.showKeyword;
  // 从本地存储中获取搜索记录
  let localHistoryList = localStorage.getItem("historyList");
  if (localHistoryList !== null) {
    state.historyList = JSON.parse(localHistoryList);
  }
  // 监听滚动事件
  window.addEventListener("scroll", loadMoreDebounce);
});

// 搜索:仅渲染初次返回的部分数据
async function handleSearch() {
  console.log("--search--");
  let { inputKeyWords, perNum, nowPageIndex } = state;
  // 默认值处理
  if (state.inputKeyWords == "") inputKeyWords = state.defaultWords;
  tmpKeyWords = inputKeyWords; // 避免每次输入都调用highLight函数
  state.dataState = 1;

  // 发起请求获取数据
  let {
    data: {
      result: { songs, songCount },
    },
  } = await getSearchResult(inputKeyWords, perNum, (nowPageIndex - 1) * perNum);
  state.searchResult = songs;
  state.maxPages = Math.ceil(songCount / perNum);
  state.dataState = 2;

  // 添加历史记录
  let index = state.historyList.findIndex((item) => item == inputKeyWords);
  let tmpArray = [inputKeyWords, ...state.historyList];
  if (index !== -1) {
    tmpArray.splice(index + 1, 1);
  }
  state.historyList = tmpArray;
  localStorage.setItem("historyList", JSON.stringify(state.historyList));
}

// 回退按钮
function handleBack() {
  if (state.searchResult.length === 0) $router.go(-1);
  else clearSearchResult();
}
// 清除搜索结果并清空输入框
function clearSearchResult() {
  state.searchResult = [];
  state.dataState = 0;
  state.inputKeyWords = "";
}

// 清空搜索历史
const clearHistory = () => {
  state.historyList = [];
  localStorage.removeItem("historyList");
};

// 处理歌手与专辑信息
function getSubInfo(item) {
  let artist = item.artists.map((v) => v.name);
  let str = `${artist.join("/")} - ${item.album.name}`;
  return highLight(str);
}
// 高亮搜索关键词
function highLight(str) {
  let keyWord = tmpKeyWords;
  let regex = new RegExp(keyWord, "gi");
  return str.replace(regex, `<span class="highlight">${keyWord}</span>`);
}
// 根据历史记录搜索
function searchFromHistory(str) {
  state.inputKeyWords = str;
  handleSearch();
}
// 根据歌曲id播放音乐
async function playMusic(songId) {
  let {
    data: { songs },
  } = await getMusicDetail(songId);
  musicPlayList.value.splice(playingIndex.value + 1, 0, songs[0]);

  updatePlayingIndex(playingIndex.value + 1);
  updatePlayList(musicPlayList.value);
}
// 判断是否滚动到最底部
function hasReachedEnd() {
  // 可视区域高度
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  // 滚动距离
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // 内容总高度
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );
  return documentHeight - scrollTop - windowHeight < 100;
}

// 加载更多
async function loadMore() {
  if (!hasReachedEnd() || isLoading || state.nowPageIndex == state.maxPages)
    return;
  isLoading = true;
  let { inputKeyWords, perNum } = state;
  console.log(state.nowPageIndex, state.maxPages);
  state.nowPageIndex += 1;
  let {
    data: { result, code },
  } = await getSearchResult(
    inputKeyWords,
    perNum,
    (state.nowPageIndex - 1) * perNum
  );
  if (code !== 200 || result.songs === undefined)
    state.nowPageIndex = state.maxPages;
  else state.searchResult = [...state.searchResult, ...result.songs];
  isLoading = false;
}
const loadMoreDebounce = debounce(loadMore, 100);
</script>

<style lang="less" scoped>
.searchTopBox {
  width: 100%;
  height: 1rem;
}
.searchTop {
  display: flex;
  padding: 0.2rem;
  width: 100%;
  height: 1rem;
  align-items: center;
  justify-content: space-around;
  gap: 0.2rem;
  position: fixed;
  top: 0;
  > svg {
    fill: #333;
    width: 0.5rem;
    height: 0.5rem;
  }
  .inputBox {
    flex-grow: 1;
    height: 0.8rem;
    padding: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 1rem;
    border: 1px solid #eee;
    svg,
    .svgContainer {
      width: 0.32rem;
      height: 0.32rem;
      fill: #999;
    }
    > input {
      border: none;
      outline: none;
      line-height: 100%;
      width: 70%;
      font-size: 0.32rem;
    }
  }
  > button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.32rem;
    color: #333;
  }
}

.searchHistory {
  width: 100%;
  margin-top: 0.4rem;
  padding: 0 0.3rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h1 {
      font-size: 0.3rem;
      letter-spacing: 0.04rem;
    }
    > svg {
      fill: #666;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .content {
    margin-top: 0.2rem;
    max-height: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    > span {
      display: inline-block;
      background-color: #fff;
      font-size: 0.28rem;
      color: #555;
      padding: 0.1rem 0.2rem;
      border-radius: 0.4rem;
      margin: 0.1rem;
    }
  }
}
.resultList {
  width: 100%;
  padding: 0.4rem 0.4rem 2rem 0.4rem;
  background-color: #fff;
  .header {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: space-between;
    > svg {
      width: 0.5rem;
      height: 0.5rem;
      fill: #555;
    }
    > .play-icon {
      fill: #ff2c4f;
    }
    > h1 {
      flex-grow: 1;
      font-size: 0.36rem;
      letter-spacing: 0.04rem;
    }
  }
  .content {
    margin-top: 0.2rem;
    .musicBox {
      width: 100%;
      height: 1.5rem;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .textInfo {
        width: 75%;
        > h2 {
          font-weight: 400;
          font-size: 0.32rem;
        }
        > p {
          margin-top: 0.1rem;
          font-size: 0.28rem;
          color: #999;
        }
        h2,
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .svgContainer {
        flex-shrink: 0;
        width: 0.5rem;
        height: 0.5rem;
        > svg {
          width: 100%;
          height: 100%;
          fill: #999;
        }
      }
    }
  }
  .loader {
    position: static;
    margin-top: 20px;
  }
  .endAlert {
    margin-top: 10px;
    color: #999;
    text-align: center;
  }
}
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: scale(0.5);
  .jimu-primary-loading:before,
  .jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: "";
  }

  .jimu-primary-loading:before {
    left: -0.3998rem;
  }

  .jimu-primary-loading:after {
    left: 0.3998rem;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }

  .jimu-primary-loading:before,
  .jimu-primary-loading:after,
  .jimu-primary-loading {
    background: #ff2c4f;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 0.272rem;
    height: 0.64rem;
  }

  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 0.136rem);
    top: calc(50% - 0.32rem);
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }

  @-webkit-keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 #ff2c4f;
      height: 0.64rem;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -0.16rem #ff2c4f;
      height: 0.8rem;
    }
  }

  @keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 #ff2c4f;
      height: 0.64rem;
    }
    40% {
      opacity: 1;
      box-shadow: 0 -0.16rem #ff2c4f;
      height: 0.8rem;
    }
  }
}

:deep(.highlight) {
  color: #4f7dad !important;
}
</style>