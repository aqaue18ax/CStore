<template>
  <div class="home">
    <navBar
      :title="$route.meta.title"
      :z-index="9"
      left-arrow
      @click-right="navTo('/user')"
      @click-left="navTo('/index-image')"
      class="font-regular"
      fixed
    >
    <icon name="user-o" slot="right" size="20px" color="#fff"/>
    </navBar>

    <search @onSearch="onSearch" />
    <count :isShow="show.count" />
    <!-- <info :is-show="show.info"/> -->

    <router-view></router-view>

    <amap :stores="stores" :center="center" :zoom="zoom" :range="range" />
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import Search from "@/components/search.vue";
// import Info from "@/components/info.vue";
import Count from "@/components/count.vue";
import Amap from "@/components/amap.vue";

export default {
  name: "home",
  data() {
    return {
      modules: [],
      show: {
        info: false,
        count: false
      }
    };
  },
  computed: {
    stores() {
        // return this.$root.stores;
      return this.$store.state.stores
    },
    center() {
      return this.$root.center;
    },
    zoom() {
      return this.$root.zoom;
    },
    range() {
      return this.$root.range;
    }
  },
  components: {
    Search,
    Icon,
    NavBar,
    // Info,
    Count,
    // Layout,
    Amap
  },
  methods: {
    navTo(url) {
      this.$router.push(url);
    },
    async onSearch(data) {
      this.$router.push(`/home/search?search=${data.search}`);
    },
    onFilter() {
      // console.log(this.storeData);
      // if (data.codes.length == 0) {
      //    this.$root.stores = this.storeData;
      // } else {
      //   this.$root.stores = this.stores.filter(item =>
      //     data.codes.find(code => code == parseInt(item.module_id))
      //   );
      // }
    },
    async search(data) {
      await this.$http
        .get("/api/module/store", {
          name: data.search,
          area: localStorage.getItem("area") || ""
        })
        .then(data => {
          this.modules = data;

          let stores = [];
          data.map(v => {
            stores = stores.concat(v.stores);
          });

          stores.map(store => {
            store.events = {
              click: () => {
                this.pin(store);
              }
            };
          });

          // this.$root.stores = stores;
          
          this.$store.dispatch('setStores', stores)
        });
    },
    pin(store) {
      this.show.info = false;
      this.show.count = false;
      if (store.type == "store") {
        this.$store.dispatch('setSelectStore', store)
        this.$router.push(`/home/store/${store.id}`);
      }

      if (store.type == "market") {
        this.$router.push(`/home/market/${store.id}`);
      this.$store.dispatch('setMapZoom', 16)
      }
    }
  },
  async created() {
    if (this.$route.name == "home") {
      this.show.info = true;
      this.show.count = true;
      await this.search({});
    }
  },
  beforeRouteUpdate(to, from, next) {
    // if (to.name == 'home') {
    //   this.show.count = false;
    //   this.show.info = false;
    // }

    if (to.name == "home/search") {
      this.show.count = false;
    }

    if (from.name == "home/market" && to.name == "home") {
      this.$root.range = [];
      this.search({});
    }

    if (from.name == "home/market" && to.name == "home/store") {
      this.search({});
    }

    if (from.name == "home/search") {
      // this.show.count = true
      this.search({});
    }

    next();
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

.van-nav-bar .van-icon {
  color: #fff;
}
</style>