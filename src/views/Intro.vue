<template>
  <div class="intro">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <!-- <swipe class="swipe">
      <swipe-item v-for="image in store.images" :key="image.id">
        <van-image :src="image.img" fit="cover" width="100%" height="100%" />
      </swipe-item>
    </swipe>-->

    <cell-group class="margin-top-xs">
      <cell>
        <div class="title font-medium text-xl">{{store.name}}</div>
        <div class="introduce font-regular text-sm">{{store.introduce}}</div>
      </cell>
    </cell-group>

    <cell-group class="margin-top-xs">
      <cell>
        <div class="title font-medium text-xl">经营范围</div>
        <div class="scope font-regular text-sm">{{store.business_scope}}</div>
      </cell>
    </cell-group>

    <cell-group class="margin-top-xs">
      <cell>
        <div class="title font-medium text-xl">联系电话</div>
        <div class="scope font-regular text-sm">{{store.phone}}</div>
      </cell>
      <cell>
        <div class="title font-medium text-xl">公司地址</div>
        <div class="scope font-regular text-sm">{{store.address}}</div>
      </cell>
    </cell-group>
  </div>
</template>

<script>
import { NavBar, CellGroup, Cell } from "vant";

export default {
  data() {
    return {
      store: {}
    };
  },
  components: {
    // VanImage: Image,
    CellGroup,
    Cell,
    NavBar
    // Swipe,
    // SwipeItem
  },
  async created() {
    const id = this.$route.params.id;
    await this.$http.get(`api/store/${id}`).then(data => {
      this.store = data;
    });
  }
};
</script>

<style scoped>
.swipe {
  height: 600px;
}

/* .cell {
  padding: 20px 30px;
} */

.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title {
  color: #fff;
}

.van-nav-bar .van-icon {
  color: #fff;
}
</style>