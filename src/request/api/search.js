import service from "..";

// 获取默认搜索关键词
export function getDefaultWords() {
    return service({
        url: '/search/default',
        method: 'GET'
    })
}

/**
 * 根据关键词返回搜索结果
 * @param {string} keywords - 搜索关键词
 * @param {number} limit - 返回结果的数量限制
 * @param {number} offset - 返回结果的偏移量
 * @param {number} type - 搜索类型，默认为1即单曲
 * @returns {Promise} 返回搜索结果的Promise对象
 */
export function getSearchResult(keywords, limit, offset, type = 1) {
    return service({
        method: 'GET',
        url: `/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`
    })
}
/**
 * 根据歌曲Id获取歌曲详细信息
 * @param {number} songId 
 * @returns {Promise} 返回搜索结果的Promise对象
 */
export function getMusicDetail(songId) {
    return service({
        method: 'GET',
        url: `/song/detail?ids=${songId}`
    })
}
