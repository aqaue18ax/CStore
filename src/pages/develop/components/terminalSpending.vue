<template>
  <panel type="map" title="强弱区域建设投入比">
    <div class="pbody flex flex-wrap">
      <agency :columns="agencies" @confirm="confirm" />
      <province :columns="provinces" @confirm="confirm" />
      <!-- <city :columns="cities" @confirm="confirm" /> -->
      <year @confirm="confirm" />
    </div>

    <!-- <char-bar :y="chart.y" :data="chart.data" /> -->
    <ChartPie :data="chart.data" :empty="chart.empty" />
  </panel>
</template>

<script>
import api from "../api";
import Panel from "@/components/panel";
import ChartPie from "./chart/pie";

import Agency from "./_/agency";
import Year from "./_/year";
import Province from "./_/province";
// import City from "./_/city";

export default {
  name: "terminal",
  data() {
    return {
      avg: 100,
      data: [],
      agence: "全国",
      province: "",
      //报表数据显示，1：办事处，2，省，3，市
      chartType: 1,
      region: "",
      chart: {
        data: [0, 2],
        empty: false
      }
    };
  },
  watch: {
    chartData(val) {
      if (!val) {
        this.chart = {
          data: [],
          empty: true
        };
      } else {
        this.chart = val;
      }
    }
  },
  computed: {
    agencies() {
      if (this.dataMap.size == 0) {
        return [{ id: "无数据", name: "无数据" }];
      }
      const map = this.dataMap;
      let cols = [{ id: "全国", name: "全国" }];
      for (let key of map.keys()) {
        cols.push({ id: key, name: key });
      }
      return cols;
    },
    provinces() {
      if (this.dataMap.size == 0) {
        return [{ id: "无数据", name: "无数据" }];
      }
      const map = this.dataMap;
      let cols = [];
      cols.push({ id: "全部", name: "所有省" });
      if (this.agence == "全国") {
        for (let agenceMap of map.values()) {
          for (let province of agenceMap.keys()) {
            cols.push({ id: province, name: province });
          }
        }
      } else {
        let agenceMap = map.get(this.agence);
        for (let province of agenceMap.keys()) {
          cols.push({ id: province, name: province });
        }
      }
      return cols;
    },
    chartData() {
      if (this.dataMap.size == 0) {
        return false;
      }
      let data = [];
      let map = this.dataMap;
      const agence = this.agence;
      const province = this.province;
      switch (this.chartType) {
        case 1:
          if (map.has(agence)) {
            //办事处
            map = map.get(agence);
            const dataMap = this.getCountForMap2(map);
            for (let name of dataMap.keys()) {
              data.push({ label: name, value: this.arrSum(dataMap.get(name)) });
            }
          } else {
            //全国
            const dataMap = this.getCountForMap(map);
            for (let name of dataMap.keys()) {
              data.push({ label: name, value: this.arrSum(dataMap.get(name)) });
            }
          }
          break;
        case 2:
          {
            //省
            for (let provinceMap of map.values()) {
              if (provinceMap.has(province)) {
                map = provinceMap.get(province);
                break;
              }
            }
            const dataMap = this.getCountForMap3(map);
            for (let name of dataMap.keys()) {
              data.push({ label: name, value: this.arrSum(dataMap.get(name)) });
            }
          }
          break;
        default:
          break;
      }
      // this.chart = { y, data }
      return { data, empty: false };
    },
    dataMap() {
      let dataMap = new Map();
      this.data.map(item => {
        const { agency_name: agence, province, region, money, type } = item;
        //办事处处理
        if (!dataMap.has(agence) && agence != "") {
          dataMap.set(agence, new Map());
        }
        //省份
        let provinceMap = dataMap.get(agence);
        if (!provinceMap.has(province) && province != "") {
          provinceMap.set(province, new Map());
        }
        //城市
        let regionMap = provinceMap.get(province);
        regionMap.set(region, [Number(money), type]);
      });
      return dataMap;
    }
  },

  methods: {
    confirm(e) {
      switch (e.type) {
        case "agency":
          this.agence = e.id;
          this.chartType = 1;
          break;
        case "province":
          this.province = e.id;
          this.chartType = this.province == "全部" ? 1 : 2;
          break;
        case "year":
          this.post(e.value);
          break;

        default:
          break;
      }
      if (e.code == "all") {
        this.position = "china";
      } else {
        this.position = e.type + "/" + e.pinyin;
      }
    },
    post(code) {
      api.terminalSpending(code).then(data => {
        data.data.splice(data.data.length - 1, 1);
        this.data = data.data;
      });
    },
    getCountForMap(map) {
      let data = new Map();
      for (let name of map.keys()) {
        for (let item1 of map.get(name).values()) {
          for (let item2 of item1.values()) {
            const key = item2[1];
            const value = item2[0];
            data.has(key) ? data.get(key).push(value) : data.set(key, [value]);
          }
        }
      }
      return data;
    },
    getCountForMap2(map) {
      let data = new Map();
      for (let name of map.keys()) {
        for (let item1 of map.get(name).values()) {
          const key = item1[1];
          const value = item1[0];
          data.has(key) ? data.get(key).push(value) : data.set(key, [value]);
        }
      }
      return data;
    },
    getCountForMap3(map) {
      let data = new Map();
      for (let item1 of map.values()) {
        const key = item1[1];
        const value = item1[0];
        data.has(key) ? data.get(key).push(value) : data.set(key, [value]);
      }
      return data;
    },
    //数组之和
    arrSum(arr) {
      return arr.reduce((a, b) => {
        return a + b;
      });
    },
    getType(obj) {
      var type = Object.prototype.toString
        .call(obj)
        .match(/^\[object (.*)\]$/)[1]
        .toLowerCase();
      if (type === "string" && typeof obj === "object") return "object"; // Let "new String('')" return 'object'
      if (obj === null) return "null"; // PhantomJS has type "DOMWindow" for null
      if (obj === undefined) return "undefined"; // PhantomJS has type "DOMWindow" for undefined
      return type;
    }
  },

  components: {
    Panel,
    ChartPie,
    Province,
    Agency,
    Year
    // City
  },
  created() {
    this.post(new Date().getFullYear());
  }
};
</script>