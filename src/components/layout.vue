<template>
  <popup position="bottom" :overlay="false" v-model="isShow">
    <div class="layout">
      <div class="content">
        <!-- <div class="title padding-tb-sm radius margin-bottom-xs">{{title}}分布图</div> -->
        <tabs
          class="bg-white tabs"
          background="#eee"
          animated
          swipeable
          @change="onChange"
          :color="color"
        >
          <tab :title="category.name" v-for="category in categories" :key="category.id">
            <div class="store" v-for="store in category.stores" :key="store.id" @click="pin(store)">{{store.name}}</div>
          </tab>
          <tab title="级别区分">
            <div class="area">
              <div class="color" style="background: #f8403a"></div>专业市场
            </div>
            <div class="area">
              <div class="color" style="background: #507fd9"></div>正泰门店
            </div>
            <div class="area">
              <div class="color" style="background: #34c6cd"></div>其他
            </div>
          </tab>
        </tabs>
        <button
          class="btn bg-blue margin-tb-xs radius padding-tb-sm text-center"
          @click="$router.push('/home')"
        >返回</button>
      </div>
    </div>
  </popup>
</template>

<script>
import { Popup, Tabs, Tab } from "vant";
export default {
  data() {
    return {
      isShow: true,
      index: 0
    };
  },
  computed: {
    categories() {
      return this.$parent.modules;
    },
    color() {
      return this.categories[this.index]
        ? this.categories[this.index].color
        : "#a0a0a0";
    }
  },
  components: {
    Popup,
    Tabs,
    Tab
  },
  methods: {
    pin(store) {
      this.$root.center = store.coordinate;
    },
    onChange(index) {
      this.index = index;
    }
  },
  created() {
    const { code, search } = this.$route.query;
    this.$parent.search({ code, search });
    this.$parent.show.info = false;
  },
  activated() {
    this.isShow = true;
  },
  beforeRouteUpdate(to, from, next) {
    const { code, search } = to.query;
    this.$parent.search({ code, search });

    next();
  }
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}

.content {
  width: 680px;
  margin: 0 auto;
}

/* .title {
  font-size: 32px;
  text-align: center;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
} */

.btn {
  width: 100%;
  border: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 9;
}

.tabs {
  height: 360px;
}

.van-popup {
  background: transparent;
}

.store {
  text-align: center;
  padding: 26px 20px;
  margin: 0 30px;
  border-bottom: 1px solid #b0b0b0;
}

.area {
  padding: 26px 20px;
  margin: 0 30px;
  border-bottom: 1px solid #b0b0b0;
  display: flex;
  align-items: center;
}

.color {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
</style>

<style>
.van-tabs {
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.van-tabs--line .van-tabs__wrap {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

/* .van-tabs__line {
  bottom: 24px;
  left: -1px;
} */

.van-tab--active {
  background: #fff;
}

.van-tab:first-of-type {
  border-top-left-radius: 5px;
}

.van-tab:last-of-type {
  border-top-right-radius: 5px;
}

.van-tab__pane {
  height: 192px;
  overflow: scroll;
}
</style>
