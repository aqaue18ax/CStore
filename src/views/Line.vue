<template>
  <div class="line flex flex-direction" v-cloak>
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <panel type="time" title="建店时间">
      <div class="pbody">
        <span class="number">2017</span>
        <span class="padding-xs">年</span>
        <span class="number">10</span>
        <span class="padding-xs">月</span>
        <span class="number">05</span>
        <span class="padding-xs">日</span>
      </div>
    </panel>

    <panel type="computer" title="终端化建设">
      <div class="pbody">示意文字示意文字示意文字示意文字示意文字示意文示意文字示意文字示意文字示意文字示意文字示意文</div>
    </panel>

    <panel type="rmb" title="营收收入" label="(月)">
      <div class="pbody">
        <span class="number">51,506</span>
        <span class="padding-xs">元</span>
      </div>
    </panel>

    <panel type="chart" title="销售业绩" label="(元)">
      <ve-histogram
        :data="sale"
        :settings="chart.settings"
        :legend-visible="false"
        :grid="chart.grid"
        height="180px"
      ></ve-histogram>
    </panel>

    <panel type="box" title="经营产品">
      <div class="pbody">示意文字示意文字示意文字示意文字示意文字示意文示意文字示意文字示意文字示意文字示意文字示意文</div>
    </panel>

    <panel type="memory" title="销售范围">
      <div class="pbody">示意文字示意文字示意文字示意文字示意文字示意文示意文字示意文字示意文字示意文字示意文字示意文</div>
    </panel>

    <panel type="attack" title="竞争对手情况">
      <div class="pbody">
        <competitor name="竞争对手一号店" sale="1亿2000万" info="竞争对手一号店简单介绍" />
        <competitor name="竞争对手二号店" sale="8000万" info="竞争对手二号店简单介绍" />
      </div>
    </panel>
  </div>
</template>

<script>
import { NavBar } from "vant";
import Panel from "@/components/panel";
import Competitor from "@/components/competitor";
import VeHistogram from "v-charts/lib/histogram.common";

export default {
  data: function() {
    return {
      chart: {
        settings: {
          yAxisType: ["KMB"],
          itemStyle: {
            color: "#686cff"
          }
        },
        grid: {
          top: 20,
          bottom: 10
        }
      },
      sale: {
        columns: ["月份", "营业额"],
        rows: [
          { 月份: 1, 营业额: 3121 },
          { 月份: 2, 营业额: 3621 },
          { 月份: 3, 营业额: 3321 },
          { 月份: 12, 营业额: 3001 },
          { 月份: 11, 营业额: 3134 },
          { 月份: 10, 营业额: 3221 },
          { 月份: 9, 营业额: 3131 },
          { 月份: 8, 营业额: 3321 },
          { 月份: 7, 营业额: 5321 },
          { 月份: 6, 营业额: 2693 },
          { 月份: 5, 营业额: 3858 },
          { 月份: 4, 营业额: 983 }
        ]
      }
    };
  },
  components: {
    NavBar,
    Panel,
    Competitor,
    VeHistogram
  },
  async beforeMount() {},
  async created() {
    // const id = this.$route.params.id;
    // await this.$http.get(`api/store/${id}/income`).then(data => {
    //   this.chartData = {
    //     columns: ["date", ""营业额""],
    //     rows: data
    //   };
    // });
    // console.log((111123).toLocaleString('en-US'))
  }
};
</script>

<style scoped>
.line {
  height: 100%;
  background: #ededee;
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

[v-cloak] {
  display: none;
}

.number {
  font-size: 48px;
  font-weight: bold;
  color: #34579b;
}

.pbody {
  padding-left: 40px;
}
</style>