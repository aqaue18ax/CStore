<template>
  <panel type="pie" title="市场开发统计" :height="22 * chart.data.length">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>区域门店数量（家）
      </div>
    </div>

    <div class="pbody flex">
      <agency :columns="agencies" @confirm="confirm" />
      <province :columns="provinces" @confirm="confirm" />
      <module :columns="modules" @confirm="confirm" />
    </div>

    <chart-bar :y="chart.y" :data="chart.data" />
  </panel>
</template>

<script>
import api from "../api";

import Panel from "./_/panel";
import ChartBar from "./chart/bar";

import Agency from "./_/agency";
import Province from "./_/province";
import Module from "./_/module";

export default {
  name: "market",
  data() {
    return {
      mProvinces: [],

      agency: 0,
      module: 1,
      province: 110000,

      chart: {
        y: ["北京市"],
        data: [0]
      }
    };
  },

  components: {
    Panel,
    ChartBar,
    Agency,
    Module,
    Province
  },

  methods: {
    async confirm(e) {
      if (e.type == "agency") {
        if (e.id == 0) {
          this.mProvinces = [];
        } else {
          await api.province(e.id).then(data => {
            if (data.length == 0) {
              data = [{code: 0, name: '无数据'}]
            }
            this.mProvinces = data;
          });
        }
        this.province = this.provinces[0].code;
      }

      if (e.type == "province") {
        this.province = e.code;
      }

      if (e.type == "module") {
        this.module = e.id
      }

      this.onPost();
    },
    onPost() {
      api.market(this.province, this.module, this.agency).then(data => {
        let y = [];
        let chart = [];

        data.sort((a, b) => {
          return b.value - a.value;
        });

        data.map(v => {
          y.push(v.area);
          chart.push(v.value);
        });

        this.chart.y = y;
        this.chart.data = chart;
      });
    }
  },

  computed: {
    agencies() {
      return this.$parent.agencies;
    },
    provinces() {
      return this.mProvinces.length > 0 ? this.mProvinces : this.$parent.provinces;
    },
    modules() {
      return this.$parent.modules;
    }
  },

  async created() {
    await this.onPost();
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