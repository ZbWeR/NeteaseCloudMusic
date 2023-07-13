import service from "..";

// 获取首页轮播图
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2',
    });
}

// 获取歌单推荐数据
// limitNum 为返回歌单的数量
export function getMusicList(limitNum = 7) {
    return service({
        method: 'GET',
        url: `/personalized?limit=${limitNum}`
    });
}
