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
          <tab title="市场分布"></tab>
          <tab title="级别区分"></tab>
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

div {
  word-wrap: break-word;
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

