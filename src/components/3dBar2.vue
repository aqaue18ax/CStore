<template>
  <div id="chart2"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  mounted() {
    const myChart2 = echarts.init(document.getElementById("chart2"));
    var xData = ["a", "b"];
    var days = [""];
    var data = [
      [0, 0, 5],
      [0, 1, 11]
    ];
    myChart2.setOption({
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
        axisLine: {
          lineStyle: {
            color: "#1d3792"
          }
        },
        data: xData
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
        boxWidth: 100,
        boxDepth: 50,
        viewControl: {
          projection: 'orthographic',
            alpha: 10,
            beta: 20
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
                var colorList = [
                  "rgb(44,168,216)",
                  "rgb(216,91,44)"
                ];
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
};
</script>

<style scoped>
#chart2 {
  height: 8rem;
  width: 100%;
}
</style>