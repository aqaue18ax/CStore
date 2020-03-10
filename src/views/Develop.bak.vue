<template>
  <div>
    <!-- <ve-map :data="chartData" :settings="chartSettings" :extend="chartExtend" :visual-map="visualMap"></ve-map> -->
    <ve-map :data="chartData" :extend="chartExtend"></ve-map>
  </div>
</template>

<script>
import "echarts/lib/component/visualMap";
import VeMap from "v-charts/lib/map.common";

export default {
  data() {
    this.chartExtend = {
      visualMap: {
        min: 0,
        max: 2,
        splitNumber: 3,

        pieces: [
          { gt: 22, label: "覆盖率高于平均值" },
          { lte: 22, label: "覆盖率低于平均值" },
          { lte: 0, label: "没有店面建设" },
        ],

        color: ["#3e78dc", "#e83325", "#d8d8d8"]
      },
      series: {
        type: "map",
        mapType: "china",
        showLegendSymbol: false,
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false,
          }
        },
        // data: [
        //   { name: "内蒙古", value: 1, num: 42 },
        //   { name: "河北", value: 1, num: 52 },
        //   { name: "北京", value: 1 },
        //   { name: "天津", value: 1 },
        //   { name: "黑龙江", value: 2 },
        //   { name: "吉林", value: 2 },
        //   { name: "辽宁", value: 2 },
        //   { name: "山东", value: 2 },
        //   { name: "山西", value: 2 }
        // ]
      }
    };
    return {
      chartData: {
        columns: ['位置', '终端数'],
        rows: [
          { '位置': '北京', '终端数': 13 },
          { '位置': '内蒙古', '终端数': 0 },
          { '位置': '黑龙江', '终端数': 53 }
        ]
      }
    };
  },
  components: {
    VeMap
  }
};
</script>

<style scoped></style>