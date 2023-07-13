<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-remen"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai"></use>
      </svg>
      <span>私人漫游</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-songlist"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rank"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.iconList {
  display: flex;
  width: 100%;
  height: 1.6rem;
  padding: 0.2rem;
  justify-content: space-evenly;
  align-items: center;
  .iconItem {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span {
      color: #777;
      font-size: 0.28rem;
    }
    > svg {
      fill: #ff2c4f;
    }
  }
}
</style>