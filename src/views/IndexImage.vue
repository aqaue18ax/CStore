<template>
  <div class="index">
    <div class="content">
      <div class="swipe-panel h1 text-xxl font-bold">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="v in images" :key="v.file_url">
            <img height="200px" width="100%" style="object-fit: cover;" :src="v.file_url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 通知 -->
      <van-row type="flex" justify="center" class="notice-panel">
        <van-col span="2" class="flex align-start justify-center flex-direction">
          <van-icon name="volume-o" size="1.5rem" />
        </van-col>
        <van-col span="22">
          <van-swipe
            class="notice-swipe"
            style="height: 40px; width: 100%;"
            :autoplay="3000000"
            :show-indicators="false"
            vertical
          >
            <van-swipe-item
              v-for="item in noticeItem"
              :key="item.id"
              @click="noticeClickHandler(item)"
            >
              <div
                style="height: 100%; padding-left: 5px;"
                class="flex align-start justify-center flex-direction"
              >
                <p>{{ item.item + item.promotion + item.other }}</p>
                <p>{{ item.create }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
      <div class="content-panel">
        <div class="btn-panel">
          <div class="btn" v-for="item in btns" :key="item.text" @click="navTo(item.to)">
            <img :src="require(`@/assets/index/${item.icon}.png`)" alt />
            <!-- <img src="/assets/index/btn1.png" alt=""> -->
            <h4>{{item.text}}</h4>
          </div>
        </div>
        <div class="text text-sm count">
          <div class="statistic-content-title text-df">
            <span class="title">全国数据统计</span>
            <span class="date">截止至{{configDate}}</span>
          </div>
          <div class="statistic-content">
            <van-row class="border-bottom">
              <van-col span="16">
                <van-row>
                  <van-row class="bg-blue2">
                    <van-col span="12" class="padding-xs text-df">全国经销商总数</van-col>
                    <van-col span="12" class="padding-xs text-xxl">
                      <vns :start="0" :end="Number(config.AGENT_TOTAL)" :times="times" :speed="10" />
                    </van-col>
                  </van-row>
                </van-row>
                <van-row class="bg-red">
                  <van-col span="12" class="padding-xs text-df">已建设门店经销商总数</van-col>
                  <van-col span="12" class="padding-xs text-xxl">
                    <vns
                      :start="0"
                      :end="Number(config.AGENT_TOTAL_OPEN)"
                      :times="times"
                      :speed="10"
                    />
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="8">
                <van-row class="text-right padding-xs">已建设经销商门店占比</van-row>
                <van-row class="text-center padding-xs text-red text-max text-bold">
                  <vns :start="0" :end="percentAgent" :times="times" :speed="10" />%
                </van-row>
              </van-col>
            </van-row>
            <van-row class="border-bottom">
              <van-col span="16">
                <van-row>
                  <van-row class="bg-blue2">
                    <van-col span="12" class="padding-xs text-df">全国二级分销商总数</van-col>
                    <van-col span="12" class="padding-xs text-xxl">
                      <vns :start="0" :end="Number(config.AGENT_TWO)" :times="times" :speed="10" />
                    </van-col>
                  </van-row>
                </van-row>
                <van-row class="bg-red">
                  <van-col span="12" class="padding-xs text-df">已建设门店分销商总数</van-col>
                  <van-col span="12" class="padding-xs text-xxl">
                    <vns
                      :start="0"
                      :end="Number(config.AGENT_TWO_OPEN)"
                      :times="times"
                      :speed="10"
                    />
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="8">
                <van-row class="text-right padding-xs">已建设二级门店占比</van-row>
                <van-row class="text-center padding-xs  text-red text-max text-bold">
                  <vns :start="0" :end="percentAgentTwo" :times="times" :speed="10" />%
                </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="text text-sm">
          <div class="statistic-content-title text-df">
            <span class="title">全国数据建设</span>
            <span class="date">截止至{{configDate}}</span>
          </div>
          <div class="statistic2-content">
            <van-row>
              <van-col class="center" span="6">
                <van-row>品牌体验馆</van-row>
                <van-row>
                  <span class="one">
                    <vns :start="0" :end="Number(config.PPTYG_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>工业超市旗舰店</van-row>
                <van-row>
                  <span class="one">
                    <vns :start="0" :end="Number(config.GYCSQJD_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>工业超市标准店</van-row>
                <van-row>
                  <span class="one">
                    <vns :start="0" :end="Number(config.GYCSBZD_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>SI专卖店</van-row>
                <van-row>
                  <span class="one">
                    <vns :start="0" :end="Number(config.SIZMD_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
            </van-row>
            <van-row>
              <van-col class="center" span="6">
                <van-row>二级形象店</van-row>
                <van-row>
                  <span class="two">
                    <vns :start="0" :end="Number(config.EJXXD_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>二级门招</van-row>
                <van-row>
                  <span class="two">
                    <vns :start="0" :end="Number(config.EJMZ_COUNT)" :times="times" :speed="10" />
                  </span>家
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>户外广告</van-row>
                <van-row>
                  <span class="two">
                    <vns :start="0" :end="Number(config.HWGG_COUNT)" :times="times" :speed="10" />
                  </span>个
                </van-row>
              </van-col>
              <van-col class="center" span="6">
                <van-row>正泰岗亭</van-row>
                <van-row>
                  <span class="two">
                    <vns :start="0" :end="Number(config.ZTGT_COUNT)" :times="times" :speed="10" />
                  </span>个
                </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <div class="info">
        <p class="title">正泰C-Store终端建设平台</p>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<style scoped>
.bg-blue2 {
  color: #fff;
  background-color: #0294e2;
}
.bg-red {
  color: #fff;
  background-color: #e83125;
}
.index {
  background-color: #0294e2;
  font-size: 0.4rem;
  position: relative;
  min-height: 100%;
}
.border-bottom{
  border-bottom: 0.03333rem solid #ccc;
}
.content {
  width: 98%;
  margin: 0 auto;
  padding-top: 10px;
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

.content-panel {
  border-radius: 5px;
  overflow: hidden;
  background-color: #0294e2;
}

/* 按钮 */
.btn-panel {
  width: 100%;
  padding: 10px 0;
  /* border-radius: 5px; */
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.2rem;
  margin-bottom: 4px;
  /* position: absolute;
  width: 90%;
  left: 5%;
  top: 330px; */
}
.btn-panel .btn {
  padding: 10px 0;
  width: 25%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
}

.btn-panel .btn:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15%;
  right: 2px;
  width: 0.1rem;
  height: 70%;
  margin: 0 auto;
  padding: 0;
  border-right: 2px solid #ccc;
  overflow: hidden;
}

.btn img {
  align-self: center;
  height: 60px;
}

.btn h4 {
  margin-top: 5px;
}

.center {
  text-align: center;
}

/* 通知 */
.notice-panel {
  padding: 0.5rem 0.5rem;
  color: #fff;
}

.van-col {
  line-height: 16px;
}
.van-row {
  margin-bottom: 5px;
}
/* 全国数据统计 */

.statistic-content,
.statistic2-content {
  margin-top: -2px;
  /* border-radius: 5px; */
  background-color: #fff;
}

.percent-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
.percent1 {
  width: 82%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 82%;
  background-color: #e83125;
}
.percent1::after {
  content: " ";
}

.one {
  font-size: 40px;
  color: #1e90ff;
  font-weight: bold;
}
.two {
  font-size: 40px;
  font-weight: bold;
  color: #63b8ff;
}
.statistic-content-title {
  background-color: #fff;
  position: relative;
  padding: 20px 40px;
  /* color: #fff; */
}
.statistic-content-title::after {
  content: " ";
  bottom: 0;
  left: 40px;
  right: 40px;
  position: absolute;
  border-bottom: 1px solid #ccc;
}
.statistic-content-title .date {
  float: right;
  color: #636363;
}
.statistic-content-title .title {
  position: relative;
  overflow: hidden;
  display: inline-block;
  padding-left: 20px;
}

.statistic-content-title .title::before {
  content: " ";
  position: absolute;
  top: -10px;
  left: -10px;
  height: 20px;
  width: 20px;
  transform: rotate(45deg);
  background-color: #0294e2;
}
.statistic-content {
  padding: 20px 40px;
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
  padding: 20px 40px;
}

.statistic2-content > .van-row > .center {
  /* height: 55px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.statistic2-content .van-row:nth-child(1) .van-col:nth-child(3),
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(2),
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(1) {
  border-left: 1px solid #ddd;
  /* border-bottom: 1px solid #ddd; */
}
.statistic2-content .van-row:nth-child(1) .van-col:nth-child(4) {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(3),
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(2),
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(1) {
  border-left: 1px solid #ddd;
}
.statistic2-content .van-row:nth-child(2) .van-col:nth-child(4) {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.statistic2-content .center .van-row:nth-child(2){
  padding-left: 10px;
  text-align: left;
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
        { text: "开发统计", icon: "btn1", to: "develop" },
        { text: "运营数据", icon: "btn2", to: "operationReport" },
        { text: "地图检索", icon: "btn3", to: "home" },
        { text: "终端数据", icon: "btn4", to: "terminal" }
        // { text: "个人信息", icon: "btn5", to: "user" }
      ],
      configDate: "",
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
      times: 50
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
    this.configDate = new Date().Format("yyyy-MM-dd");
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
        var create = res.data[0].create_time;
        // console.log(create)
        // console.log(new Date(create))
        // console.log(new Date(create * 1000).Format('yyyy-MM-dd'))
        res.data.forEach(o => {
          o.create = new Date(create * 1000).Format("yyyy-MM-dd");
        });
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