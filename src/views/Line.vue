<template>
  <div class="line flex flex-direction" v-cloak>
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <div class="error text-center padding-top-xl" v-if="!chartData.rows.length">
      <icon name="failure" size="8rem" color="#c0c0c2"/>
      <div>没有相关数据</div>
    </div>

    <div class="chart" v-if="chartData.rows.length">
      <ve-line
        :data="chartData"
        :settings="settings"
        :extend="{'xAxis.0.axisLabel.rotate': 45}"
        height="100%"
        :legend-visible="false"
      ></ve-line>
    </div>
  </div>
</template>

<style scoped>
.line {
  height: 100%;
  background: #fff;
}

.chart {
  flex: 1;
  padding: 10px 0;
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
</style>

<script>
import { NavBar, Icon } from "vant";
import VeLine from "v-charts/lib/line.common";

export default {
  data: function() {
    return {
      settings: {
        labelMap: {
          date: "年月",
          money: "营业额"
        }
      },
      chartData: {}
    };
  },
  components: {
    Icon,
    VeLine,
    NavBar
  },
  async beforeMount() {},
  async created() {
    const id = this.$route.params.id;
    await this.$http.get(`/store/${id}/income`).then(data => {
      this.chartData = {
        columns: ["date", "money"],
        rows: data
      };
    });
  }
};
</script>
