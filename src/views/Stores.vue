<template>
  <div class="stores" @touchstart="touchStart($event)" @touchmove="touchMove($event)">
    <navBar :title="$route.query.title" left-arrow @click-left="goBack" class="font-regular">
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
              <span>{{toArea(store.area.code)}}</span>
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
  computed: {
    pullUpReload() {
      return this.$store.state.pullUpReload;
    }
  },
  components: {
    NavBar,
    Icon,
    Popup,
    myArea: Area
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    touchMove(e) {
      if (e.targetTouches[0].pageY < this.startY) {
        this.judgeScrollBarToTheEnd();
      }
    },
    judgeScrollBarToTheEnd() {
      if (!this.pullUpReload) return;
      let innerHeight = document.querySelector(".stores").clientHeight;
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.clientHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + scrollHeight >= innerHeight) {
        this.page++;
        alert(this.page);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
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
