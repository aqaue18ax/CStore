<template>
  <popup position="bottom" :overlay="false" v-model="isShow">
    <div class="store shadow">
      <div class="shop">
        <div class="title text-xl font-medium">{{data.name}}</div>
        <div class="cover">
          <img :src="data.cover || avatar" width="88" height="88">
        </div>
        <div class="address_info text-df flex">
          <div class="area">{{data.area.name}}</div>
          <div class="hr">|</div>
          <div class="address">{{data.address}}</div>
        </div>
        <div class="opening text-df padding-tb-xs">营业时间 08:30-17:30</div>
        <div class="btn flex justify-around align-center">
          <div class="flex align-center"><img :src="home" width="16" class="padding-right-xs" />门店简介</div>
          <div class="flex align-center"><img :src="brand" width="16" class="padding-right-xs" />品牌形象</div>
          <div class="flex align-center"><img :src="operation" width="16" class="padding-right-xs" />运营状况</div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
import { Popup, Icon } from "vant";
import avatar from "@/assets/avatar.png";
import home from "@/assets/home.png";
import brand from "@/assets/brand.png";
import operation from "@/assets/operation.png";

export default {
  data() {
    return {
      avatar,
      home,
      brand,
      operation
    };
  },
  props: {
    data: Object,
    isShow: Boolean
  },
  components: {
    Popup,
    Icon
  }
};
</script>

<style scoped>
.store {
  padding: 20px 20px 0 20px;
}

.title {
  padding: 10px 0;
}

.hr {
  padding: 0 20px;
}

.cover {
  position: absolute;
  top: -84px;
  right: 20px;
}

.cover img {
  border-radius: 50%;
  border: 2px solid #fff;
}

.btn {
  margin-top: 10px;
  border-top: 2px solid #d3d3d3;
  padding: 26px 0;
}
</style>

<style>
.van-popup {
  overflow-y: initial;
}
</style>