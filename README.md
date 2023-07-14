<div align='center'>
<h1 align='center'>🎵 仿网易云音乐移动端 🍧</h1>
<img src='https://img.shields.io/github/license/zbwer/NeteaseCloudMusic
'>
</div>
简介：拙劣的模仿罢了

技术栈： Vue | Vuex | Vue-Router

## ✨实现功能

- [x] 首页: :carousel_horse: 轮播图 / :musical_score: 歌单推荐 / :arrow_down: 底部播放组件
- [x] 歌单详情: :scroll: 虚拟滚动 / :arrow_forward: 点击播放
- [x] 搜索页面：:rocket: 懒加载分批次加载 / :mag: 历史记录存储与去重
- [x] 歌曲详情：:cd: 磁盘与磁针动画 / :musical_note: 歌词样式随歌曲播放变化
- [x] 底部播放组件：:file_cabinet: Vuex 存储歌单数据与播放下标实现全局状态管理
- [x] 登录页面：:key: Vue-Router路由守卫鉴权 / :camera: 二维码扫码登录

## 📝TODO 

- [ ] 切歌时 `index` 的范围合法性判断
- [ ] 首页音乐播放与导航栏的定位
- [ ] 关于【随机播放】功能的实现

> 1. 考虑在 vuex 中保存`isRand`标识启用了随机播放模式
> 2. 难点在于随机播放下播放历史的记录，考虑使用在 vuex 中使用栈来记录，随机模式下上一首出栈，下一首入栈。

- [ ] 关于【播放列表】页面的实现
- [ ] 封装全局 Toast 消息提示组件 
- [ ] 个人中心页面数据获取与渲染
- [ ] Transition 标签实现路由切换的过渡效果

## 🥰特别鸣谢

1. [【前端实战项目】手把手教你从零开始做一个网易云音乐](https://www.bilibili.com/video/BV1c44y1g7ac/?spm_id_from=333.337.search-card.all.click&vd_source=078d08e0de4b58aacb1aef1949540066)

2. [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)