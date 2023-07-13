import service from "..";

// 根据歌单Id获取歌单详情: 封面 / 点赞评论转发等数据
export function getMusicItemList(listId) {
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${listId}`
    })
}
// 根据歌单Id获取歌单所有歌曲
export function getTracksList(listId, limit = 0, offset = 20) {
    let str = `/playlist/track/all?id=${listId}&offset=${offset}`;
    if (limit) str += `&limit=${limit}`;
    return service({
        method: 'GET',
        url: str
    })
}

// 根据歌曲Id获取歌词详细数据
export function getMusicLyric(songId) {
    return service({
        method: 'GET',
        url: `/lyric?id=${songId}`
    })
}

// 根据歌曲Id获取播放链接
export function getMusicUrl(songId) {
    return service({
        method: 'GET',
        url: `/song/url?id=${songId}`
    })
}
