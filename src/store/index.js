import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'

export default createStore({
  state: {
    // 歌曲播放列表
    musicPlayList: [{
      "al": {
        "id": 137375366,
        "name": "lovestory （小提琴版）",
        "picUrl": "https://p1.music.126.net/l-Ek4q3oO4KSRhRHdqclBg==/109951166718693426.jpg",
        "tns": [],
        "pic_str": "109951166718693426",
        "pic": 109951166718693420
      },
      "ar": [
        {
          "id": 35946009,
          "name": "JOHN",
          "tns": [],
          "alias": []
        }
      ],
      id: 1902687013,
      name: 'lovestory （小提琴版）',
    }],
    // 正在播放歌曲的下标
    playingIndex: 0,
    // 是否处于播放状态
    isPlaying: false,
    // 是否处于显示歌词状态
    detailShow: false,
    // 歌词原始文本
    lyricText: "[00:00.00] 作词 : JOHN\n[00:01.00] 作曲 : JOHN\n[00:02.00] 编曲 : JOHN\n[99:00.00]纯音乐，请欣赏\n",
    // 歌曲已播放时间
    currentTime: 0,
    loginState: false,
    showFooterMusic: true,
  },
  getters: {
  },
  mutations: {
    updateIsPlaying: (state, value) => state.isPlaying = value,
    updatePlayList: (state, value) => state.musicPlayList = value,
    updatePlayingIndex: (state, value) => state.playingIndex = value,
    updateDetailShow: (state) => state.detailShow = !state.detailShow,
    updateLyricText: (state, value) => state.lyricText = value,
    updateCurrentTime: (state, value) => state.currentTime = value,
    updateLoginState: (state, value) => { state.loginState = value; console.log(233); },
    updateShowFooterMusic: (state, value) => state.showFooterMusic = value,
  },
  actions: {
    getLyric: async (context, value) => {
      let res = await getMusicLyric(value);
      context.commit('updateLyricText', res.data.lrc.lyric);
    }
  },
  modules: {
  }
})
