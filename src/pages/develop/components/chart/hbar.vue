<template>
  <vebar :extend="chartExtend" height="170px" />
</template>

<script>
import vebar from "v-charts/lib/bar.common";

export default {
  props: {
    x: Array,
    data: Array,
    formatter: String,
    color: {
      type: String,
      default: '#686cff'
    }
  },
  computed: {
    max() {
      return Math.max(...this.data) * 1.2 || 10;
    },
    maxs() {
      const maxs = [];
      for (let i = 0; i < this.data.length; i++) {
        maxs.push(this.max);
      }

      return maxs;
    },
    chartExtend() {
      return {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 10
        },
        tooltip: {
          axisPointer: {
            type: "shadow"
          },
          formatter: this.formatter,
        },
        xAxis: {
          show: false,
          axisLabel: {
            show: false,
            rotate: 90
          },
          type: "category",
          data: this.x
        },
        yAxis: {
          type: "value",
          show: false,
          axisLabel: {
            show: false
          },
          max: this.max
        },
        series: [
          {
            stack: "sale",
            silent: true,
            z: 3,
            label: {
              normal: {
                show: true,
                // position: "top",
                // color: "black",

                position: "insideBottom",
                color: "black",
                formatter: function(params) {
                  let name = '';

                  for (let index = 0; index < params.name.length; index++) {
                    name += '\n' + params.name[index];
                  }

                  return name;
                }
              }
            },
            // barWidth: 15,
            itemStyle: { color: this.color },
            type: "bar",
            data: this.data
          },
          {
            type: "bar",
            stack: "sale",
            // silent: true,
            // barWidth: 15,
            itemStyle: { color: "#f1f1f1" },
            animation: false,
            data: this.maxs
          },
        ]
      };
    }
  },

  components: {
    vebar
  }
};
</script>
