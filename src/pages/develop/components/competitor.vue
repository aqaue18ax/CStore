<template>
  <panel type="attack" title="竞争对手统计" :height="40 * chart.sale.length">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>预估销售额(万)
      </div>
      <div class="flex align-center">
        <div class="color" style="background: #e94c46"></div>竞争对手个数(个)
      </div>
    </div>

    <div class="pbody flex flex-wrap">
      <agency :columns="agencies" @confirm="confirm" />
      <province :columns="provinces" @confirm="confirm" />
      <module :columns="modules" @confirm="confirm" />
    </div>

    <d-bar :y="chart.y" :sale="chart.sale" :attack="chart.attack" />

  </panel>
</template>

<script>
import api from "../api";

import Panel from "./_/panel";
import dBar from "./chart/dbar";

import Agency from "./_/agency";
import Province from "./_/province";
import Module from "./_/module";

export default {
  name: "competitor",

  data() {
    return {
      mProvinces: [],

      agency: 0,
      module: 1,
      province: 110000,
      year: new Date().getFullYear(),

      chart: {
        y: ["北京市"],
        sale: [0],
        attack: [0],
      }
    }
  },

  components: {
    Panel,
    dBar,

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
      api.competitor(this.province, this.module, this.agency).then(data => {
        let y = [];
        let sale = [];
        let attack = [];

        data.sort((a, b) => {
          return b.value - a.value;
        });

        data.map(v => {
          y.push(v.area);
          sale.push(v.value);
          attack.push(v.num);
        });

        this.chart.y = y;
        this.chart.sale = sale;
        this.chart.attack = attack;
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