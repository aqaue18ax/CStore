<template>
  <vepie :data="chartData" :settings="chartSettings" :data-empty="empty" :extend="chartExtend" :height="empty ? '20px' : '200px'"></vepie>
</template>

<script>
import vepie from "v-charts/lib/pie.common";
export default {
  name: "pie",
  props:{
    label: Array,
    data: Array,
    empty: Boolean
  },
  data() {
    this.chartSettings = {
      // roseType: "radius",
      radius: 50,
      offsetY: 120
    };
    return {
      // chartData: {
      //   columns: ["label", "访问用户"],
      //   rows: [
      //     { label: "强势", 访问用户: 100 },
      //     { label: "弱势", 访问用户: 50 },
      //     { label: "潜力", 访问用户: 10 }
      //   ]
      // }
    };
  },
  computed: {
    chartData(){
      return {
        columns: ["label", "value"],
        rows: this.data
      }
    },
    chartExtend() {
      return {
        position: [10, 10],
        legend: {
          left: "right",
          orient: "vertical"
        }
      };
    }
  },
  components: {
    vepie
  }
};
</script>