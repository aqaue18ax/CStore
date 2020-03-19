<template>
  <ve-map :data="chartData" :extend="chartExtend" :settings="chartSettings" height="300px" />
</template>

<script>
import "echarts/lib/component/visualMap";
import VeMap from "v-charts/lib/map.common";

export default {
  props: {
    position: {
      type: String,
      default: "china"
    },
    avg: Number,
    data: Array
  },

  data() {
    return {};
  },

  computed: {
    chartData() {
      return {
        columns: ["name", "percent"],
        rows: this.data
      };
    },
    chartSettings() {
      return {
        position: this.position
      };
    },
    chartExtend() {
      const avg = this.avg;
      return {
        tooltip: {
          formatter: function(params) {
            return `${params.name}<br/>覆盖率：${params.value ||
              0}% <br/> 平均数：${avg}%`;
          }
        },
        legend: {
          show: false
        },
        visualMap: {
          splitNumber: 3,
          pieces: [
            { gte: this.avg, label: "覆盖率高于平均值" },
            { gt: 0, lt: this.avg, label: "覆盖率低于平均值" },
            { lte: 0, label: "没有店面建设" }
          ],
          // top: 'top',
          orient: "horizontal",
          color: ["#3e78dc", "#e83325", "#eeeeee"]
        },
        series: {
          type: "map",
          showLegendSymbol: false,
          top: 0,
          left: 0,
          bottom: 30,
          right: 0,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          }
        }
      };
    }
  },

  components: {
    VeMap
  }
};
</script>
