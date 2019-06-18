<template>
  <div class="intro">
    <navBar :title="$route.meta.title" left-arrow @click-left="goBack" class="font-regular"></navBar>

    <swipe class="swipe">
      <swipe-item v-for="(image, key) in images" :key="key">
        <img :src="image" width="100%" height="100%">
      </swipe-item>
    </swipe>

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
import { NavBar, Swipe, SwipeItem, CellGroup, Cell } from "vant";
import img from "@/assets/store.png";

export default {
  data() {
    return {
      store: {},
      images: [img, img]
    };
  },
  components: {
    CellGroup,
    Cell,
    NavBar,
    Swipe,
    SwipeItem
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$http.get(`store/${id}`).then(data => {
      this.store = data
    });
  }
};
</script>

<style scoped>
.swipe {
  height: 400px;
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