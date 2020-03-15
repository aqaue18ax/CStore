<template>
  <vebar :extend="chartExtend" :height="data.length * 20 + 'px'" />
</template>

<script>
import vebar from "v-charts/lib/bar.common";

export default {
  props: {
    y: Array,
    data: Array,
    tooltip: String
  },

  computed: {
    maxs() {
      let max = Math.max(...this.data) * 1.2 || 10;

      const maxs = [];
      for (let i = 0; i < this.data.length; i++) {
        maxs.push(max);
      }

      return maxs;
    },
    chartExtend() {
      return {
        color: ["#686cff"],
        grid: {
          left: 10,
          right: 0,
          top: 0,
          bottom: 0
        },
        tooltip: {
          show: false,
          formatter: `{b0}<br/>${this.tooltip}: {c1}`,
          axisPointer: {
            type: "none"
          }
        },
        xAxis: {
          show: false,
          axisLabel: {
            show: false
          },
          max: Number
        },
        yAxis: {
          data: this.y,
          inverse: true
        },
        series: [
          {
            type: "bar",
            itemStyle: { color: "#f1f1f1" },
            silent: true,
            barGap: "-100%",
            barWidth: 15,
            emphasis: {
              itemStyle: {
                color: "#f1f1f1"
              }
            },
            animation: false,
            data: this.maxs
          },
          {
            type: "bar",
            silent: true,
            label: {
              normal: {
                show: true,
                position: "right",
                color: "black"
              }
            },
            emphasis: {
              itemStyle: {
                color: "#ffdf33"
              }
            },
            barWidth: 15,
            data: this.data
          }
        ]
      };
    }
  },

  components: {
    vebar
  }
};
</script>

<style scoped>
/* .block {
  padding-top: 6px;
  padding-bottom: 6px;
}

.title {
  width: 100px;
  padding-left: 20px;
  height: auto;
}

.process {
  width: 100%;
} */
</style>