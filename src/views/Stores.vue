<template>
  <div class="stores">
    <navBar :title="$route.query.title" left-arrow @click-left="$router.back()" class="font-regular">
      <div class="text-blue flex align-center" slot="right" @click="search = !search">
        <icon name="filter-o" color="#3672e7"/>
        <span>搜索</span>
      </div>
    </navBar>

    <div class="cell-group padding-sm" v-if="stores.length">
      <div class="cell" @click="navTo(store.id)" v-for="store in stores" :key="store.id">
        <div class="store padding-bottom-sm text-df">
          <img :src="store.cover" width="100%" height="100%" class="radius">
          <div class="info flex justify-between padding-top-xs">
            <div class="name">{{store.name}}</div>
            <div class="area flex align-center">
              <icon name="location"/>
              <span>{{toArea(store.area_info.code)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="error text-center padding-top-xl" v-else>
      <icon name="failure" size="8rem" color="#c0c0c2"/>
      <div>没有相关数据</div>
    </div>

    <popup v-model="search" position="bottom">
      <myArea
        :area-list="area"
        class="van-area"
        title="省市区选择"
        @onHide="search = false"
        @confirm="onSearch"
      />
    </popup>
  </div>
</template>

<style scoped>
.van-icon {
  color: #333;
}

.cell-group {
  background: #fff;
}

.van-picker {
  background: transparent;
}
</style>

<script>
import { NavBar, Icon, Popup } from "vant";
import Area from "@/components/area";
import area from "@/utils/area.js";
import toArea from "@/utils/toArea.js";

export default {
  data() {
    return {
      stores: [],
      page: 1,
      search: false,
      area
    };
  },
  components: {
    NavBar,
    Icon,
    Popup,
    myArea: Area
  },
  methods: {
    navTo(id) {
      this.$router.push({ name: "store", query: { id } });
    },
    toArea,
    async onSearch(area) {
      const module_id = this.$route.query.module_id;
      await this.$http.get(`/store`, { module_id, area: area[2].code }).then(data => {
        this.stores = data;
      });
    }
  },
  async created() {
    const module_id = this.$route.query.module_id;
    await this.$http.get(`/store`, { module_id }).then(data => {
      this.stores = data;
    });
  }
};
</script>
