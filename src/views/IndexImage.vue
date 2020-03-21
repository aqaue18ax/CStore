<template>
  <div class="index">
    <div class="close-btn" @click="navTo">X</div>
    <div class="content">
      <div class="h1 text-xxl font-bold">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="v in images">
            <img
              height="200px"
              width="100%"
              style="van-swipe-item-image"
              :src="v.file_url"
            />
          </van-swipe-item>
          
        </van-swipe>
      </div>
      <div class="text text-sm">
        <div class="statistic-content-title">截止2020-03-20全国数据统计</div>
        <div class="statistic-content">
          <van-row>
            <van-col class="center one" span="8">526</van-col>
            <van-col class="center one" span="8">500</van-col>
            <van-col class="center one" span="8">95.06%</van-col>
          </van-row>
          <van-row>
            <van-col class="center" span="8">全国经销商总数</van-col>
            <van-col class="center" span="8">已建设门店经销商总数</van-col>
            <van-col class="center" span="8">已建设经销商门店占比</van-col>
          </van-row>
          <van-row>
            <van-col class="center two" span="8">4320</van-col>
            <van-col class="center two" span="8">3100</van-col>
            <van-col class="center two" span="8">71.76%</van-col>
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
            <van-col span="22" :offset="1">
              品牌体验馆
              <span class="three">10</span>家|工业超市旗舰店
              <span class="three">9</span>家|工业超市标准店
              <span class="three">10</span>家
            </van-col>
          </van-row>
          <van-row>
            <van-col span="22" :offset="1">
              SI专卖店
              <span class="three">220</span>家|二级形象店
              <span class="three">110</span>家|二级门招
              <span class="three">3250</span>家
            </van-col>
          </van-row>
          <van-row>
            <van-col span="22" :offset="1">
              户外广告
              <span class="three">20</span>个|正泰岗亭
              <span class="three">90</span>个
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background: #999999;
  z-index: 999;
  opacity: 0.3;
  color: #ffffff;
  text-align: center;
}
.van-col {
  font-size: 10px;
}
.van-swipe-item {
  width: 100%;
  height: 100px;
}
.van-swipe-item-image {
  width: 100% !important;
  height: 100px !important;
}
.center {
  text-align: center;
}
.one {
  font-size: 50px;
  color: #1e90ff;
}
.one:nth-child(1),
.one:nth-child(2) {
  border-right: 1px solid #999999;
}
.two:nth-child(1),
.two:nth-child(2) {
  border-right: 1px solid #999999;
}
.two {
  font-size: 50px;
  color: #63b8ff;
}
.statistic-content-title {
  margin: 15px;
}
.statistic-content {
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 15px;
  border: 1px solid #999999;
}

.statistic-content .van-row:nth-child(3) {
  margin-top: 16px;
}
.three {
  font-size: 30px;
  color: #1e90ff;
}
.statistic2-content {
  padding-top: 30px;
  padding-bottom: 30px;
  margin: 15px;
  border: 1px solid #999999;
}

.statistic2-content .van-row {
  margin-top: 6px;
}
</style>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Col, Row } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Col);
Vue.use(Row);
import http from "@/utils/http";

export default {
  name: "index",
  data() {
    return {
      images: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      http
        .get("/api/index_images/index")
        .then(res => {
          this.images = res.data
        });
    },
    navTo() {
      this.$router.push("/home");
    }
  }
};
</script>