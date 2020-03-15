<template>
  <panel type="dealer" title="全国经销商统计">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>经销商占比数（%）
      </div>
    </div>

    <vebar :extend="chartExtend" height="40px" />
  </panel>
</template>

<script>
import vebar from "v-charts/lib/bar.common";

import Panel from "./_/panel";

export default {
  data() {
    return {
      total: [0, 0],
      already: [0, 0],
      percent: [0, 0],
      y: ['一级经销商', '二级经销商']
    };
  },
  computed: {
    chartExtend () {
      return {
        color: ["#686cff"],
        grid: {
          left: 10,
          right: 0,
          top: 0,
          bottom: 0
        },
        tooltip: {
          formatter: "{b0}<br/>建设: {c2} <br/> 总数: {c1} <br/> 占比: {c3}%",
          axisPointer: {
            type: "none"
          }
        },
        xAxis: {
          show: false,
          axisLabel: {
            show: false,
          },
          // position: 'top',
          max: 100
        },
        yAxis: {
          data: this.y,
          inverse: true
        },
        series: [
          {
            type: "bar",
            itemStyle: { color: "#f1f1f1" },
            barGap: "-100%",
            barWidth: 15,
            emphasis: {
              itemStyle: {
                color: "#f1f1f1"
              }
            },
            data: [100, 100],
            animation: false
          },
          {
            type: "bar",
            itemStyle: { color: "#f1f1f1" },
            barGap: "-100%",
            barWidth: 15,
            emphasis: {
              itemStyle: {
                color: "#f1f1f1"
              }
            },
            data: this.total,
            animation: false
          },
          // 已经建设
          {
            type: "bar",
            itemStyle: { color: "#f1f1f1" },
            barGap: "-100%",
            barWidth: 15,
            emphasis: {
              itemStyle: {
                color: "#f1f1f1"
              }
            },
            data: this.already,
            animation: false
          },
          // 占比
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{c}%",
                color: 'black'
              }
              // emphasis: {
              //   color: 'black'
              // }
            },
            emphasis: {
              itemStyle: {
                color: "#ffdf33"
              }
            },
            barWidth: 15,
            data: this.percent
          }
        ]
      }
    }
  },
  components: {
    Panel,
    vebar
  },
  created () {
    this.$http.post('api/statistics/agent').then(data => {
      let total = [];
      let already = [];
      let percent = [];
      let y = [];

      data.map(v => {
        total.push(v.total)
        already.push(v.already)
        percent.push(v.percent)
        y.push(v.name)
      })

      this.total = total;
      this.already = already;
      this.percent = percent;
      this.y = y
    })
  }
};
</script>

<style scoped>
.color {
  width: 25px;
  height: 25px;
  margin: 0 12px;
}
</style>
