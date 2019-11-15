<template>
  <popup position="bottom" :overlay="false" v-model="isShow">
    <div class="market">
      <div class="content">
        <tabs class="bg-white tabs" background="#eee" animated swipeable color="#f7403a">
          <tab title="市场介绍">
            <div class="info">
              <div class="title text-df font-medium padding-tb-xs">{{store.name}}</div>
              <div class="introduce text-sm font-regular">{{store.introduce}}</div>
            </div>
          </tab>
          <tab title="市场分布">
            <div
              class="store"
              v-for="store in store.children"
              :key="store.id"
              @click="pin(store)"
            >{{store.name}}</div>
          </tab>
          <tab title="级别区分">
            <div class="flex flex-wrap padding">
              <!-- <div class="area">
                <div class="color" style="background: #ffad01"></div>一级经销商
              </div>
              <div class="area">
                <div class="color" style="background: #33ccc7"></div>二级经销商
              </div> -->
              <div class="area">
                <div class="color" style="background: #6179ff"></div>品牌体验店
              </div>
              <div class="area">
                <div class="color" style="background: #2babff"></div>二级形象店
              </div>
              <div class="area">
                <div class="color" style="background: #4472b7"></div>户外广告
              </div>
              <div class="area">
                <div class="color" style="background: #6f4b93"></div>SI专卖店
              </div>
              <div class="area">
                <div class="color" style="background: #8193d7"></div>工业超市
              </div>
              <div class="area">
                <div class="color" style="background: #e46660"></div>二级门招
              </div>
              <div class="area">
                <div class="color" style="background: #60bbc9"></div>二级货架
              </div>
              <div class="area">
                <div class="color" style="background: #6cc15b"></div>正泰岗亭
              </div>
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
      isShow: false
    };
  },
  computed: {
    store() {
      return this.$parent.store;
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
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$parent.find(id);
    this.isShow = true;
  },
  activated() {
    this.isShow = true;
  }
};
</script>

<style scoped>
.market {
  width: 100%;
  height: 100%;
}

.content {
  width: 95%;
  margin: 10px auto;
}

.info {
  padding: 40px;
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

div {
  word-wrap: break-word;
}

.area {
  width: 200px;
  /* padding: 26px 20px; */
  margin: 12px;
  /* border-bottom: 1px solid #b0b0b0; */
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

