<template>
  <panel type="memory" title="业绩指标统计" :height="22 * chart.data.length">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>业绩指标（万）
      </div>
    </div>

    <div class="pbody flex flex-wrap">
      <agency :columns="agencies" @confirm="confirm" />
      <province :columns="provinces" @confirm="confirm" />
      <year @confirm="confirm" />
    </div>

    <char-bar :y="chart.y" :data="chart.data" />

  </panel>
</template>

<script>
import api from "../api";

import Panel from "./_/panel";
import CharBar from "./chart/bar";

import Agency from "./_/agency";
import Province from "./_/province";
import Year from "./_/year";

export default {
  name: 'sale',

  data() {
    return {
      mProvinces: [],

      agency: 0,
      province: 110000,
      year: new Date().getFullYear(),

      chart: {
        y: ["北京市"],
        data: [0]
      }
    }
  },

  components: {
    Panel,
    CharBar,
    Agency,
    Year,
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

      if (e.type == "year") {
        this.year = e.value
      }

      this.onPost();
    },
    onPost() {
      api.kpi(this.province, this.agency, this.year).then(data => {
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