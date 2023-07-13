<template>
  <ItemMusicTop :itemMusic="state.playlist"></ItemMusicTop>
  <ItemMusicBody :playlist="state.playlist"></ItemMusicBody>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList } from "@/request/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicBody from "@/components/item/ItemMusicBody.vue";

export default {
  setup() {
    const state = reactive({
      playlist: {},
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      console.log("root");
      console.dir(res.data);
      state.playlist = res.data.playlist;
      // 保存请求数据防止页面刷新导致的丢失
      sessionStorage.setItem("playList", JSON.stringify(state.playlist));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicBody,
  },
};
</script>

<style lang="less" scoped>
</style>