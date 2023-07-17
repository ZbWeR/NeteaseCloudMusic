<template>
  <div class="itemMusicNav">
    <svg
      class="icon"
      aria-hidden="true"
      style="
         {
          width: 0.5rem;
          height: 0.5rem;
        }
      "
      @click="$router.go(-1)"
    >
      <use xlink:href="#icon-xitongfanhui"></use>
    </svg>
    <h1>歌单</h1>
    <svg
      class="icon"
      aria-hidden="true"
      style="
         {
          width: 0.5rem;
          height: 0.5rem;
        }
      "
    >
      <use href="#icon-sousuo"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use href="#icon-gengduo-shuxiang"></use>
    </svg>
  </div>
  <van-sticky offset-top="-5rem">
    <div class="itemMusicTop">
      <img :src="itemMusic.coverImgUrl" />
      <div class="itemDetail">
        <img :src="itemMusic.coverImgUrl" />
        <div class="itemText">
          <h1>{{ itemMusic.name }}</h1>
          <div class="creator">
            <img :src="itemMusic?.creator?.avatarUrl" class="avatar" />
            <p>{{ itemMusic?.creator?.nickname }}</p>
            <svg class="icon" aria-hidden="true">
              <use href="#icon-youjiantou"></use>
            </svg>
          </div>
          <p>
            {{ itemMusic.description }}
          </p>
        </div>
      </div>
      <div class="iconList">
        <div class="iconBox">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-zhuanfa"></use>
          </svg>
          <p>
            {{ formatNumber(itemMusic.shareCount) }}
          </p>
        </div>
        <div class="iconBox">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-comment"></use>
          </svg>
          <p>
            {{ formatNumber(itemMusic.commentCount) }}
          </p>
        </div>
        <div class="iconBox like">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-batch-add"></use>
          </svg>
          <p>
            {{ formatNumber(itemMusic.subscribedCount) }}
          </p>
        </div>
      </div>
    </div>
  </van-sticky>
</template>

<script>
export default {
  setup(props) {
    // 防止页面刷新导致数据丢失 / 异步获取数据传值延迟
    if (props.itemMusic.creator === undefined) {
      // console.log("-- access session --");
      let tmpData = sessionStorage.getItem("playList");
      if (tmpData) props.itemMusic.creator = JSON.parse(tmpData).creator;
    }
    const formatNumber = (num) => {
      return num > 10000 ? `${(num / 10000).toFixed(1)}万` : num;
    };
    return { formatNumber };
  },
  props: ["itemMusic"],
};
</script>

<style lang="less" scoped>
.itemMusicNav {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 0.6rem;
  position: fixed;
  z-index: 999;
  h1 {
    font-size: 0.4rem;
    font-weight: 400;
    letter-spacing: 0.04rem;
    color: #fff;
    width: 60%;
  }
  > .icon {
    fill: #fff;
  }
}
.itemMusicTop {
  width: 100%;
  height: 6.5rem;
  position: relative;
  overflow: hidden;
  .itemDetail {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 1.4rem 0.2rem 0 0.2rem;
    .itemText {
      width: 55%;
      > h1 {
        color: #fff;
        letter-spacing: 1px;
        font-size: 0.36rem;
      }
      p {
        color: rgba(255, 255, 255, 0.7);
        margin-top: 0.1rem;
        font-size: 0.28rem;
      }
      > h1,
      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .creator {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        > img {
          width: 0.5rem;
          border: 0.02rem solid #fff;
          border-radius: 0.4rem;
        }
        > p {
          margin-top: 0;
          margin-left: 5px;
        }
        > svg {
          fill: rgba(255, 255, 255, 0.7);
          width: 0.4rem;
        }
      }
    }
    > img {
      width: 35%;
      flex-shrink: 0;
      box-shadow: 0px -8px 4px -3px rgba(255, 255, 255, 0.3);
      border-radius: 0.16rem;
    }
  }

  .iconList {
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    .iconBox {
      width: 28%;
      border-radius: 0.4rem;
      background-color: rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0.08rem 0.2rem;
      > p {
        color: #fff;
        font-size: 0.28rem;
        font-weight: 700;
      }
      > .icon {
        width: 0.4rem;
        fill: #fff;
      }
    }
    .like {
      background-color: #ff2c4f;
    }
  }
  > img {
    position: absolute;
    width: 100%;
    z-index: -1;
    filter: blur(30px);
  }
}
</style>