<template>
  <div class="home">
    <navBar
      :title="$route.meta.title"
      :z-index="9"
      @click-right="navTo('/user')"
      class="font-regular"
      fixed
    >
      <icon name="user-o" slot="right" size="20px" color="#fff"/>
    </navBar>

    <search @onSearch="onSearch"/>
    <info :is-show="show.info" @onHide="show.info = false"/>
    <layout
      :is-show="show.layout"
      :data="modules"
      @onHide="show.layout = false"
      @onPin="store => center = store.coordinate"
    />

    <market :is-show="show.market" :data="store"/>
    <store :is-show="show.store" :data="store"/>

    <amap :stores="stores" :center="center"/>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import Search from "@/components/search.vue";
import Info from "@/components/info.vue";
import Layout from "@/components/layout.vue";
import Amap from "@/components/amap.vue";
import Store from "@/components/store.vue";
import Market from "@/components/market.vue";

export default {
  name: "home",
  data() {
    return {
      store: { name: "", area: { name: "" }, type: ''},
      modules: [],
      stores: [],
      center: [120.670856, 28.000986],
      show: {
        info: true,
        layout: false,
        store: false,
        market: false
      }
    };
  },
  components: {
    Market,
    Search,
    Icon,
    NavBar,
    Info,
    Layout,
    Store,
    Amap
  },
  methods: {
    navTo(url) {
      this.$router.push(url);
    },
    async onSearch(data) {
      await this.search(data);

      (this.show.info = false), (this.show.layout = true);
    },
    async search(data) {
      await this.$http
        .get("/module/store", { name: data.search, area: data.code })
        .then(data => {
          this.modules = data;
          this.stores = [];

          data.map(v => {
            this.stores = this.stores.concat(v.stores);
          });

          this.stores.map(store => {
            store.events = {
              click: () => {
                this.pin(store);
              }
            };
          });

          if (this.stores.length) {
            this.center = this.stores[0].coordinate;
          }
        });
    },
    pin(store) {
      this.show.info = false;
      this.show.layout = false;

      if (store.type == 'store') {
        this.show.store = true;
      }

      if (store.type == 'market') {
        this.show.market = true;
      }

      this.store = store;
    }
  },
  async created() {
    this.search({});
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}

.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title {
  color: #fff;
}
</style>