<template>
  <div class="index">
    <div class="content">
      <div class="swipe-panel h1 text-xxl font-bold">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="v in images" :key="v.file_url">
            <img height="200px" width="100%" :src="v.file_url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 通知 -->
      <van-row type="flex" class="notice-panel">
        <van-col span="1">
          <van-icon name="volume-o" />
        </van-col>
        <van-col span="23">
          <van-swipe
            class="notice-swipe"
            style="height: 20px; width: 100%;"
            :autoplay="3000"
            :show-indicators="false"
            vertical
          >
            <van-swipe-item
              v-for="item in noticeItem"
              :key="item.id"
              @click="noticeClickHandler(item)"
            >
              <p>{{ item.item + item.promotion + item.other }}</p>
            </van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
      <div class="btn-panel">
        <div class="btn" v-for="item in btns" :key="item.text" @click="navTo(item.to)">
          <img :src="require(`@/assets/index/${item.icon}.png`)" alt />
          <!-- <img src="/assets/index/btn1.png" alt=""> -->
          <p>{{item.text}}</p>
        </div>
      </div>
      <div class="text text-sm count">
        <div class="statistic-content-title">截止2020-03-20全国数据统计</div>
        <div class="statistic-content">
          <van-row>
            <van-col class="center one" span="8">
              <vns :start="0" :end="Number(config.AGENT_TOTAL)" :times="times" :speed="10" />
            </van-col>
            <van-col class="center one" span="8">
              <vns :start="0" :end="Number(config.AGENT_TOTAL_OPEN)" :times="times" :speed="10" />
            </van-col>
            <van-col class="center one" span="8">
              <vns :start="0" :end="percentAgent" :times="times" :speed="10" />%
            </van-col>
          </van-row>
          <van-row>
            <van-col class="center" span="8">全国经销商总数</van-col>
            <van-col class="center" span="8">已建设门店经销商总数</van-col>
            <van-col class="center" span="8">已建设经销商门店占比</van-col>
          </van-row>
          <van-row>
            <van-col class="center two" span="8"><vns :start="0" :end="Number(config.AGENT_TWO)" :times="times" :speed="10" /></van-col>
            <van-col class="center two" span="8"><vns :start="0" :end="Number(config.AGENT_TWO_OPEN)" :times="times" :speed="10" /></van-col>
            <van-col class="center two" span="8"><vns :start="0" :end="percentAgentTwo" :times="times" :speed="10" />%</van-col>
          </van-row>
          <van-row>
            <van-col class="center" span="8">全国二级分销商总数</van-col>
            <van-col class="center" span="8">已建设门店分销商总数</van-col>
            <van-col class="center" span="8">已建设二级门店占比</van-col>
          </van-row>
        </div>
      </div>
      <div class="text text-sm">
        <div class="statistic-content-title">全国数据建设</div>
        <div class="statistic2-content">
          <van-row>
            <van-col class="center" span="6">
              <van-row>品牌体验馆</van-row>
              <van-row>
                <span class="one"><vns :start="0" :end="Number(config.PPTYG_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>工业超市旗舰店</van-row>
              <van-row>
                <span class="one"><vns :start="0" :end="Number(config.GYCSQJD_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>工业超市标准店</van-row>
              <van-row>
                <span class="one"><vns :start="0" :end="Number(config.GYCSBZD_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>SI专卖店</van-row>
              <van-row>
                <span class="one"><vns :start="0" :end="Number(config.SIZMD_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
          </van-row>
          <van-row>
            <van-col class="center" span="6">
              <van-row>二级形象店</van-row>
              <van-row>
                <span class="two"><vns :start="0" :end="Number(config.EJXXD_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>二级门招</van-row>
              <van-row>
                <span class="two"><vns :start="0" :end="Number(config.EJMZ_COUNT)" :times="times" :speed="10" /></span>家
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>户外广告</van-row>
              <van-row>
                <span class="two"><vns :start="0" :end="Number(config.HWGG_COUNT)" :times="times" :speed="10" /></span>个
              </van-row>
            </van-col>
            <van-col class="center" span="6">
              <van-row>正泰岗亭</van-row>
              <van-row>
                <span class="two"><vns :start="0" :end="Number(config.ZTGT_COUNT)" :times="times" :speed="10" /></span>个
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="info">
        <p class="title">正泰C-Store终端建设平台</p>
        <p>
          正泰C-Store终端建设平台主要用于定位全国终端建设GPS坐标，便于了解专业市场、
          一级经销商、二级分销商的详细信息，以及门店信息、市场战略、运营情况。
        </p>
      </div>
    </div>
  </div>
</template>
<style>
.van-swipe__indicators {
  bottom: 40px;
}
</style>
<style scoped>
.index {
  background-color: #0294e2;
  font-size: 0.4rem;
  position: relative;
  min-height: 100%;
}
.content {
  width: 96%;
  margin: 0 auto;
  padding-top: 20px;
}

.van-col {
  font-size: 10px;
}
.van-swipe-item {
  width: 100%;
  height: 100px;
}
/* .swipe-panel {
  margin-bottom: 120px;
} */
.my-swipe {
  border-radius: 5px;
}
.my-swipe img {
  display: block;
}
.van-swipe-item-image {
  width: 100% !important;
  height: 100px !important;
}

/* 按钮 */
.btn-panel {
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.2rem;
  /* position: absolute;
  width: 90%;
  left: 5%;
  top: 330px; */
}

.btn {
  padding: 10px 0;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn img {
  align-self: center;
  height: 60px;
}

.center {
  text-align: center;
}

/* 通知 */
.notice-panel {
  padding: 0.5rem 0.5rem;
  color: #fff;
}

.van-col{
  line-height: 16px;
}
/* 全国数据统计 */

.statistic-content,
.statistic2-content {
  border-radius: 5px;
  background-color: #fff;
}

.one {
  font-size: 50px;
  color: #1e90ff;
  font-weight: bold;
}
.two {
  font-size: 50px;
  font-weight: bold;
  color: #63b8ff;
}
.statistic-content-title {
  margin: 15px;
  color: #fff;
}
.statistic-content {
  padding-top: 20px;
  padding-bottom: 20px;
  /* margin-bottom: 15px; */
}

.statistic-content .van-row:nth-child(3) {
  margin-top: 16px;
}
.three {
  font-size: 30px;
  color: #1e90ff;
}
.statistic2-content {
  /* margin: 15px; */
  padding: 10px;
}

.statistic2-content > .van-row > .center {
  height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.statistic2-content .van-row:nth-child(1) .van-col:nth-child(3),
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(2),
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(1) {
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(4) {
  border-bottom: 1px solid #ddd;
}
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(3),
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(2),
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(1) {
  border-right: 1px solid #ddd;
}

/* 介绍 */
.info {
  text-indent: 2rem;
  color: #ffffff;
  line-height: 1rem;
  padding-bottom: 10px;
}

.info .title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-indent: 0;
  line-height: 2rem;
}
</style>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Col, Row } from "vant";
import vns from "@/components/util/vue-number-scroll";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Col);
Vue.use(Row);
import http from "@/utils/http";

export default {
  name: "index",
  data() {
    return {
      btns: [
        { text: "市场开发数", icon: "btn1", to: "develop" },
        { text: "运营数据", icon: "btn2", to: "operationReport" },
        { text: "地图检索", icon: "btn3", to: "home" },
        { text: "终端数据", icon: "btn4", to: "terminal" }
        // { text: "个人信息", icon: "btn5", to: "user" }
      ],
      config: {
        AGENT_TOTAL: "",
        AGENT_TOTAL_OPEN: "",
        AGENT_TWO: "",
        AGENT_TWO_OPEN: "",
        PPTYG_COUNT: "",
        GYCSQJD_COUNT: "",
        GYCSBZD_COUNT: "",
        SIZMD_COUNT: "",
        EJXXD_COUNT: "",
        EJMZ_COUNT: "",
        HWGG_COUNT: "",
        ZTGT_COUNT: ""
      },
      images: [],
      //数字变动次数
      tiles: 50
    };
  },
  components: {
    vns
  },
  computed: {
    noticeItem() {
      return this.$store.state.notice;
    },
    percentAgent() {
      if (this.config.AGENT_TOTAL == "" || this.config.AGENT_TOTAL_OPEN == "") {
        return 0;
      }
      return Number(
        (
          (this.config.AGENT_TOTAL_OPEN / this.config.AGENT_TOTAL) *
          100
        ).toFixed(2)
      );
    },
    percentAgentTwo() {
      if (this.config.AGENT_TWO == "" || this.config.AGENT_TWO_OPEN == "") {
        return 0;
      }
      return Number(
        ((this.config.AGENT_TWO_OPEN / this.config.AGENT_TWO) * 100).toFixed(2)
      );
    }
  },
  mounted() {
    this.initData();
    this.initNotice();
    this.initConfig();
  },
  methods: {
    initData() {
      http.get("/api/index_images/index").then(res => {
        this.images = res.data;
      });
    },
    initNotice() {
      http.get("/api/competitor/index").then(res => {
        this.$store.dispatch("setNotice", res.data);
      });
    },
    initConfig() {
      http.get("/api/config").then(res => {
        const data = res;
        for (const key in this.config) {
          for (const i in data) {
            const item = data[i];
            if (key === item.code) {
              this.config[key] = item.value;
            }
          }
        }
      });
    },
    navTo(to) {
      this.$router.push("/" + to);
    },
    noticeClickHandler(item) {
      this.$router.push({ name: "notice", params: { id: item.id } });
    }
  }
};
</script>