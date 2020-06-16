<template>
  <div id="chart"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  props: {
    x: {
      type: Array,
      data: []
    },
    data: {
      type: Array,
      data: []
    }
  },
  data() {
    return {
      mychart: {}
    };
  },
  watch: {
    data() {
      this.SetChart();
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("chart"));
  },
  methods: {
    SetChart() {
      const data = this.data.map((v, index) => {
        return [0, index, Number(v)];
      });
      const days = [""];
      this.myChart.setOption({
        tooltip: {},
        xAxis3D: {
          name: "",
          type: "category",
          axisLabel: {
            margin: 18,
            textStyle: {
              color: "#fff"
            }
          },
          minInterval: 2,
          axisLine: {
            lineStyle: {
              color: "#1d3792"
            }
          },
          data: this.x
          // data: xData
        },
        yAxis3D: {
          show: false,
          name: "",
          type: "category",
          axisLabel: {
            margin: 18,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: days
        },
        zAxis3D: {
          name: "",
          axisLabel: {
            margin: 50,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#1d3792"
            }
          },
          type: "value"
        },
        grid3D: {
          boxWidth: 50,
          boxDepth: 50,
          // width: 444,
          left: 0,
          right: 0,
          viewControl: {
            projection: "orthographic",
            alpha: 10,
            beta: 20,
            distance: 300
          },
          axisLine: {
            interval: 2
          },
           splitLine: {
            interval: 2
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: "bar3D",
            data: data.map(function(item) {
              return {
                value: [item[1], item[0], item[2]]
              };
            }),
            shading: "lambert",

            label: {
              textStyle: {
                fontSize: 16,
                borderWidth: 1
              }
            },
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = ["rgb(44,168,216)", "rgb(216,91,44)"];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: "#900"
                }
              },
              itemStyle: {
                color: "#900"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
#chart {
  height: 8rem;
  width: 100%;
}
</style>