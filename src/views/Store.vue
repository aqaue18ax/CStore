<template>
  <div class="store" v-cloak>
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <swipe class="swipe" @change="onChange">
      <swipe-item v-for="image in store.images" :key="image.id">
        <van-image :src="image.img" fit="cover" width="100%" height="100%" />
      </swipe-item>

      <div class="swipe__indicators flex align-end justify-between" slot="indicator">
        <div class="info text-white padding-left-sm">
          <div class="name text-bold">{{store.name}}</div>
          <div class="area flex align-center padding-top-xs text-df">
            <icon name="location"/>
            <span>{{toArea(store.areaInfo.code)}}</span>
          </div>
        </div>
        <div class="indicators flex padding-right-sm">
          <div
            v-for="(image, key) in store.images"
            :key="image.id"
            class="van-swipe__indicator"
            :class="{'van-swipe__indicator--active': key === index}"
          ></div>
        </div>
      </div>
    </swipe>

    <cell-group>
      <!-- <cell title="店面资料" class="text-lg text-bold text-blue" /> -->
      <div class="van-title text-blue text-lg text-bold solid-bottom">店面资料</div>
      <cell
        title="店面简介"
        is-link
        :to="{name: 'input', query: {type: 'textarea', title: '店面简介', key: 'introduce', id:store.id ,value: store.introduce}}"
      />
      <cell
        title="经营范围"
        is-link
        :to="{name: 'input', query: {type: 'textarea', title: '经营范围', key: 'business_scope', id:store.id ,value: store.business_scope}}"
      />
      <cell
        title="联系电话"
        is-link
        :to="{name: 'input', query: {type: 'text', title: '联系电话', key: 'phone', id:store.id ,value: store.phone}}"
      />
      <cell
        title="公司地址"
        is-link
        :to="{name: 'input', query: {type: 'text', title: '公司地址', key: 'address', id:store.id ,value: store.address}}"
      />
    </cell-group>

    <div class="cell-group padding-sm" v-if="store.children.length">
      <div class="cell" @click="navTo(store.id)" v-for="store in store.children" :key="store.id">
        <div class="store padding-bottom-sm text-df">
          <img :src="store.cover" width="100%" height="100%" class="radius">
          <div class="info flex justify-between padding-top-xs">
            <div class="name">{{store.name}}</div>
            <div class="area flex align-center">
              <icon name="location"/>
              <span>{{toArea(store.areaInfo.code)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Icon, CellGroup, Cell, Image } from "vant";
import toArea from "@/utils/toArea";

export default {
  data() {
    return {
      store: {areaInfo: {}, children: []},
      index: 0
    };
  },
  computed: {},
  components: {
    VanImage: Image,
    NavBar,
    Icon,
    Swipe,
    SwipeItem,
    CellGroup,
    Cell
  },
  methods: {
    navTo(id) {
      this.$router.push({ name: "store", query: { id } });
    },
    onChange(index) {
      this.index = index;
    },
    toArea
  },
  created() {
    const id = this.$route.query.id;
    this.$http.get(`store/${id}`).then(data => {
      this.store = data;
    });
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.query.id;
    this.$http.get(`store/${id}`).then(data => {
      this.store = data;
    });

    next();
  }
};
</script>

<style scoped>
.cell-group {
  background: #fff;
}

.van-nav-bar .van-icon {
  color: #333;
}

.swipe {
  height: 600px;
}

.swipe__indicators {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.van-swipe__indicator {
  background-color: black;
}

.van-swipe__indicator--active {
  background-color: #1989fa;
}

.text-blue .van-cell__title {
  color: #1989fa;
}

.van-title {
  line-height: 24px;
  padding: 10px 15px;
}
</style>
