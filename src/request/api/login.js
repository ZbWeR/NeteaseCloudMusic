import service from "..";

/**
 * 获取用于校验扫码状态的key
 * @returns {Promise} 返回一个Promise对象，包含校验扫码状态的key
 */
export function getQRKey() {
    return service({
        method: 'GET',
        url: `/login/qr/key?timestamp=${Date.now()}`,
    })
}

/**
 * 由 key 获取base64格式的二维码图片
 * @param {string} key - 用于校验扫码状态的key
 * @returns {Promise} 返回一个Promise对象，包含base64格式的二维码图片数据
 */
export function getQRImg(key) {
    return service({
        method: 'GET',
        url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    })
}

/**
 * 由 key 校验扫码状态
 * @param {string} key - 用于校验扫码状态的key
 * @returns {Promise} 返回一个Promise对象，包含扫码状态的校验结果
 */
export function checkLoginStatus(key) {
    return service({
        method: 'GET',
        url: `/login/qr/check?key=${key}&timestamp=${Date.now()}&noCookie=true`,
    })
}
