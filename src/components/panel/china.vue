<template>
  <panel type="map" title="终端建设覆盖率统计">
    <ve-map :data="chartData" :settings="chartSettings" :extend="chartExtend" height="280px" />
  </panel>
</template>

<script>
import Panel from "@/components/panel";

import "echarts/lib/component/visualMap";
import VeMap from "v-charts/lib/map.common";

export default {
  data() {
    this.chartSettings = {
      labelMap: {
        province: "省份",
        terminal: "终端数",
        avg: "平均数"
      }
    };

    return {
      avg: 22,
      chartData: {
        columns: ["province", "terminal"],
        rows: [
          { province: "辽宁", terminal: 13 },
          { province: "黑龙江", terminal: 53 },
          { province: "内蒙古", terminal: 23 },
          { province: "吉林", terminal: 2 }
        ]
      }
    };
  },

  computed: {
    chartExtend() {
      const avg = this.avg;
      return {
        tooltip: {
          formatter: function (params) {
            return `${params.name}<br/>终端数：${params.value || 0} <br/> 平均数：${avg}`
          }
        },
        legend: {
          show: false
        },
        visualMap: {
          splitNumber: 3,

          pieces: [
            { gt: this.avg, label: "覆盖率高于平均值" },
            { lte: this.avg, label: "覆盖率低于平均值" },
            { lte: 0, label: "没有店面建设" }
          ],

          color: ["#3e78dc", "#e83325", "#eeeeee"]
        },
        series: {
          type: "map",
          mapType: "china",
          showLegendSymbol: false,
          top: 0,
          left: 0,
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
    VeMap,
    Panel
  }
};
</script>