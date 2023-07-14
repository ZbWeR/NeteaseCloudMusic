<template>
  <div class="loginContainer">
    <div class="loginBox" :class="state.status === 801 ? '' : 'active'">
      <h1>开启音乐之旅</h1>
      <div class="imgBox">
        <img
          :src="
            state.qrImgSrc !== '#'
              ? state.qrImgSrc
              : 'data:image/png;base64,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'
          "
          alt=""
        />
        <div class="mask" v-if="state.status !== 801">
          <img v-if="state.status === 802" :src="state.avatarUrl" alt="" />
        </div>
      </div>
      <div class="alertMsg">
        <div class="confirm" v-if="state.status === 802">
          <p>
            欢迎 <span>{{ state.userName }}</span> !
          </p>
          <p>扫码成功,请在手机上确认</p>
        </div>
        <div
          class="failure"
          v-else-if="state.status === 800"
          @click="handleNotLoggedIn"
        >
          <p>二维码失效</p>
          <p>
            点击此处刷新
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiazai"></use>
            </svg>
          </p>
        </div>
        <p v-else>请使用<span>网易云手机app</span>扫码登录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getQRKey, getQRImg, checkLoginStatus } from "@/request/api/login";
import { onMounted, reactive } from "vue";
import { useMapMutations, useMapState } from "@/utils/useVuex";
import { useRouter } from "vue-router";

const router = useRouter();
const { updateLoginState } = useMapMutations(["updateLoginState"]);
const { loginState } = useMapState(["loginState"]);
const state = reactive({
  qrImgSrc: "#",
  avatarUrl: "",
  status: 801,
  userName: "",
});
let qrKey = "";
let timer;

async function handleLoggedIn() {
  alert("您已登录");
  router.go(-1);
}

async function handleNotLoggedIn() {
  state.status = 801;
  let {
    data: {
      data: { unikey },
    },
  } = await getQRKey();
  qrKey = unikey;
  let {
    data: {
      data: { qrimg },
    },
  } = await getQRImg(qrKey);
  state.qrImgSrc = qrimg;

  timer = setInterval(async () => {
    let { data } = await checkLoginStatus(qrKey);
    console.log(data.message);
    state.status = data.code;
    if (data.code === 800) {
      clearInterval(timer);
    } else if (data.code === 802) {
      if (data.avatarUrl !== undefined) state.avatarUrl = data.avatarUrl;
      if (data.nickname !== undefined) state.userName = data.nickname;
    } else if (data.code === 803) {
      alert("授权登录成功");
      clearInterval(timer);
      // 保存 cookie , 更新登录状态 , 跳转首页
      localStorage.setItem("cookie", data.cookie);
      updateLoginState(true);
      router.push({ name: "home" });
    }
  }, 3000);
}

onMounted(async () => {
  if (loginState.value) {
    await handleLoggedIn();
  } else {
    alert("请先登录");
    await handleNotLoggedIn();
  }
});
</script>
<style lang="less" scoped>
.loginContainer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  // background-image: linear-gradient(320deg, #fad0c4 0%, #ffd1ff 100%);

  .loginBox {
    width: 80%;
    height: 6rem;
    padding: 20px;
    background-color: #fff;
    border-radius: 0.4rem;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transition: all 0.3s;
    > h1 {
      letter-spacing: 0.06rem;
      font-size: 0.44rem;
    }
    > .imgBox {
      width: 3.7rem;
      height: 3.7rem;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-radius: 0.4rem;
      position: relative;
      overflow: hidden;
      border: 0.02rem solid #ccc;
      .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        > img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
      }
    }
    .alertMsg {
      text-align: center;
      .failure {
        > p {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.1rem;
          > svg {
            width: 0.4rem;
            height: 0.4rem;
            fill: #4b96f8;
          }
        }
      }
      p > span {
        margin: 5px;
        color: #ec4141;
      }
    }
  }
  .active {
    height: 7rem;
  }
}
.loginContainer {
  margin: 0;
  min-height: 100vh;
  background-image: radial-gradient(closest-side, #f7f5dd, rgba(0, 0, 0, 0)),
    radial-gradient(closest-side, #cfc7f8, rgba(0, 0, 0, 0)),
    radial-gradient(closest-side, #c0fcf7, rgba(0, 0, 0, 0)),
    radial-gradient(closest-side, #f093fb, rgba(0, 0, 0, 0)),
    radial-gradient(closest-side, #ebbba7, rgba(0, 0, 0, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax 60vmax, 10vmax 10vmax,
    -30vmax 0vmax, 00vmax 50vmax;
  background-repeat: no-repeat;
  animation: bgmovement 5s linear infinite;
}

/* 模糊蒙版 */
.loginContainer::before {
  content: "";
  display: block;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  backdrop-filter: blur(5px);
}

/* 动画锚点 */
@keyframes bgmovement {
  0%,
  100% {
    background-size: 120vmax 120vmax, 80vmax 80vmax, 90vmax 90vmax,
      110vmax 110vmax, 90vmax 90vmax;
    background-position: -70vmax -30vmax, 60vmax -30vmax, 10vmax 10vmax,
      -30vmax 0vmax, 0vmax 50vmax;
  }

  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 80vmax 80vmax;
    background-position: -30vmax -40vmax, 50vmax -40vmax, 0vmax -20vmax,
      -40vmax 5vmax, -10vmax 45vmax;
  }

  50% {
    background-size: 90vmax 90vmax, 110vmax 110vmax, 85vmax 85vmax,
      80vmax 80vmax, 70vmax 70vmax;
    background-position: -50vmax -50vmax, 40vmax -30vmax, 0vmax 0vmax,
      -20vmax 10vmax, -15vmax 40vmax;
  }

  75% {
    background-size: 110vmax 110vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 85vmax 85vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
      -10vmax 5vmax, -10vmax 45vmax;
  }
}
</style>