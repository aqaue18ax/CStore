<template>
  <popup position="bottom" :overlay="false" v-model="isShow" zIndex="168">
    <div class="store shadow">
      <div class="shop">
        <div class="title text-xl font-medium">{{store.name}}</div>
        <div class="cover">
          <img :src="store.cover || avatar" width="88" height="88">
        </div>
        <div class="address_info text-df flex">
          <div class="area">{{store.area_info.name}}</div>
          <div class="hr">|</div>
          <div class="address">{{store.address}}</div>
        </div>
        <div class="opening text-df padding-tb-xs flex align-center">
          <icon name="clock-o padding-right-xs"/>营业时间 {{store.business_hours}}
        </div>
        <div class="btn-group flex justify-around align-center">
          <div class="flex align-center" @click="navTo(`/store/intro/${store.id}`)">
            <img :src="home" width="16" class="padding-right-xs">门店简介
          </div>
          <div class="flex align-center" @click="navTo(`/store/brand/${store.id}`)">
            <img :src="brand" width="16" class="padding-right-xs">品牌形象
          </div>
          <div class="flex align-center" @click="navTo(`/line/${store.id}`)">
            <img :src="operation" width="16" class="padding-right-xs">运营状况
          </div>
          <div class="flex align-center">
            <img :src="material" width="16" class="padding-right-xs">物料审批
          </div>
        </div>
      </div>
    </div>
    <div class="bbtn">
      <button class="btn bg-blue radius padding-tb-sm text-center" @click="$router.back()" style="width: 100%;">返回</button>
    </div>
  </popup>
</template>

<script>
import { Popup, Icon } from "vant";
import avatar from "@/assets/avatar.png";
import home from "@/assets/home.png";
import brand from "@/assets/brand.png";
import operation from "@/assets/operation.png";
import material from "@/assets/material.png";

export default {
  data() {
    return {
      avatar,
      home,
      brand,
      operation,
      material,
      isShow: false,
      store: { name: '', area: {}, area_info: {} }
    };
  },
  components: {
    Popup,
    Icon
  },
  methods: {
    navTo(url) {
      this.$router.push(url);
    },
    async find(id) {
      this.isShow = false;
      await this.$http.get(`api/store/${id}`).then(data => {
        this.store = data;
      });
      this.isShow = true;
    }
  },
  async created() {
    const id = this.$route.params.id;
    if (!this.$root.stores.length) {
      await this.$parent.search({});
      await this.find(id);
      this.$root.center = this.store.coordinate;
      this.$root.zoom = 18;
    } else {
      await this.find(id);
    }
  },
  activated() {
    this.isShow = true;
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    this.find(id);

    next();
  }
};
</script>

<style scoped>
.van-popup {
  background: transparent;
}

.store {
  padding: 20px 20px 0 20px;
  background: #fff;
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

.btn-group {
  margin-top: 10px;
  border-top: 2px solid #d3d3d3;
  padding: 26px 0;
}

.btn {
  width: 95%;
  border: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 9;
}

.bbtn {
  margin: 10px;
}
</style>

<style>
.van-popup {
  overflow-y: initial;
}
</style>