<template>
  <vebar :extend="chartExtend" :height="sale.length * 40 + 'px'" />
</template>

<script>
import vebar from "v-charts/lib/bar.common";

export default {
  props: {
    y: Array,
    attack: Array,
    sale: Array,
    tooltip: String
  },

  computed: {
    maxs() {
      let max1 = Math.max(...this.sale) * 1.2 || 10;
      let max2 = Math.max(...this.attack) * 1.2 || 10;
      let max = max1;

      if (max1 < max2) max = max2

      const maxs = [];
      for (let i = 0; i < this.sale.length; i++) {
        maxs.push(max);
      }

      return maxs;
    },
    chartExtend() {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        tooltip: { show: false },
        xAxis: {
          type: "value",
          show: false,
          axisLabel: {
            show: false
          },
          max: this.maxs[0]
        },
        yAxis: {
          type: "category",
          data: this.y,
          inverse: true
        },
        series: [
          {
            stack: "sale",
            silent: true,
            z: 3,
            label: {
              normal: {
                show: true,
                position: "right",
                color: "black"
              }
            },
            itemStyle: { color: "#686cff" },
            type: "bar",
            data: this.sale
          },
          {
            type: "bar",
            stack: "sale",
            silent: true,
            itemStyle: { color: "#f1f1f1" },
            animation: false,
            data: this.maxs,
          },

          {
            type: "bar",
            silent: true,
            z: 3,
            stack: "attack",
            itemStyle: { color: "#e94c46" },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "black"
              }
            },
            data: this.attack
          },
          {
            type: "bar",
            stack: "attack",
            silent: true,
            itemStyle: { color: "#f1f1f1" },
            animation: false,
            data: this.maxs,
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

<style scoped>
.block {
  padding-top: 6px;
  padding-bottom: 6px;
}

.title {
  width: 100px;
  padding-left: 20px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.process {
  width: 100%;
}
</style>