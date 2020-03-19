<template>
  <panel type="operation" title="运营状况">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>专业市场
      </div>
      <div class="flex align-center">
        <div class="color" style="background: #e94c46"></div>正泰门店
      </div>
    </div>

    <div class="pbody flex flex-wrap">
      <popup :columns="market.columns" @confirm="mConfirm" />
      <year @confirm="mConfirm" v-if="market.show" />
    </div>

    <hbar :x="market.x" :data="market.data" :formatter="market.formatter" />

    <div class="pbody flex flex-wrap">
      <popup :columns="store.columns" @confirm="sConfirm" />
      <year @confirm="sConfirm" />
    </div>

    <hbar :x="store.x" :data="store.data" :color="'#e94c46'" :formatter="store.formatter" />
  </panel>
</template>

<script>
import api from "../api";

import Panel from "./_/panel";
import Year from "./_/year";

import hbar from "./chart/hbar";
import popup from "./_/popup";

export default {
  name: "operation",

  data() {
    return {
      market: {
        columns: [
          { name: "业绩top10", type: "performance" },
          { name: "门店数top10", type: "stores" }
        ],
        x: [],
        data: [],
        show: true,
        type: "performance",
        formatter: '{b0}<br/>业绩: {c0}万',
        year: new Date().getFullYear()
      },
      store: {
        columns: [
          { name: "业绩top10", type: "performance" },
          { name: "业绩增长top10", type: "grow"}
        ],
        x: [],
        data: [],
        type: "performance",
        formatter: '{b0}<br/>业绩: {c0}万',
        year: new Date().getFullYear()
      }
    };
  },

  components: {
    Panel,
    hbar,
    popup,
    Year
  },

  methods: {
    sConfirm(e) {
      if (e.type == "year") this.store.year = e.value;
      if (e.type == "performance") this.store.type = e.type;
      if (e.type == "grow") this.store.type = e.type;

      this.storePost();
    },
    storePost() {
      api.storeTop10(this.store.type, this.store.year).then(data => {
        let x = [];
        let top10 = [];

        let tmp = new Array(10 - data.length).fill({ name: "无", value: 0 });
        data = data.concat(tmp);

        data.map(v => {
          x.push(v.name);
          top10.push(v.value);
        });

        this.store.x = x;
        this.store.data = top10;
      });
    },

    mConfirm(e) {
      this.market.show = true;

      if (e.type == "stores") {
        this.market.show = false;
        this.market.type = "stores";
      }
      if (e.type == "year") this.market.year = e.value;
      if (e.type == "performance") this.market.type = e.type;

      this.marketPost();
    },
    marketPost() {
      api.marketTop10(this.market.type, this.market.year).then(data => {
        let x = [];
        let top10 = [];

        let tmp = new Array(10 - data.length).fill({ name: "无", value: 0 });
        data = data.concat(tmp);

        if (this.market.type == "performance") this.market.formatter = `{b0}<br/>业绩: {c0}万`
        if (this.market.type == "stores") this.market.formatter = `{b0}<br/>门店数: {c0}家`

        data.map(v => {
          x.push(v.name);
          top10.push(v.value);
        });

        this.market.x = x;
        this.market.data = top10;
      });
    }
  },

  computed: {},

  created() {
    this.marketPost();
    this.storePost();
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
