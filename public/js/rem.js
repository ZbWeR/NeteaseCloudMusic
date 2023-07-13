function remSize() {
    // 获取设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) deviceWidth = 750;
    if (deviceWidth <= 320) deviceWidth = 320;
    // 设计稿750px下1rem=100px
    document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`;
    document.querySelector('body').style.fontSize = '0.3rem';
}
remSize();
window.onresize = function () {
    remSize();
}