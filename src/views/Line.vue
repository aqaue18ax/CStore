<template>
  <div class="line flex flex-direction" v-cloak v-if="loaded">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <panel type="no" title="客户编号">
      <div class="pbody">
        <span class="number">{{data.no}}</span>
      </div>
    </panel>

    <panel type="dealer" title="一级经销商">
      <div class="pbody">
        <span class="boolean">{{data.is_one ? '是' : '否'}}</span>
      </div>
    </panel>

    <panel type="time" title="建店时间">
      <div class="pbody">
        <span class="number">{{create.year}}</span>
        <span class="padding-xs">年</span>
        <span class="number">{{create.month}}</span>
        <span class="padding-xs">月</span>
        <span class="number">{{create.date}}</span>
        <span class="padding-xs">日</span>
      </div>
    </panel>

    <panel type="computer" title="终端化建设">
      <div class="pbody">{{data.terminal_construction_text}}</div>
    </panel>

    <panel type="rmb" title="营收收入" label="(上月)">
      <div class="pbody">
        <span class="number">{{sale.month}}</span>
        <span class="padding-xs">元</span>
      </div>
    </panel>

    <panel type="chart" title="销售业绩" label="(元)">
      <ve-histogram
        :data="sale"
        :settings="chart1.settings"
        :legend-visible="false"
        :grid="chart1.grid"
        :extend="chart1.extend"
        height="180px"
      ></ve-histogram>
    </panel>

    <panel type="kpi" title="业绩指标" label="(元)">
      <ve-histogram
        :data="kpi"
        :settings="chart2.settings"
        :legend-visible="false"
        :grid="chart2.grid"
        :extend="chart2.extend"
        height="180px"
      ></ve-histogram>
    </panel>

    <panel type="box" title="经营产品">
      <div class="pbody">{{data.business_product}}</div>
    </panel>

    <panel type="memory" title="销售范围">
      <div class="pbody">{{data.sales_area}}</div>
    </panel>

    <panel type="attack" title="竞争对手情况">
      <div class="pbody">
        <competitor
          v-for="competitor in data.competitors"
          :key="competitor.name"
          :name="competitor.name"
          :sale="competitor.money"
          :info="competitor.introduce"
        />
      </div>
    </panel>
  </div>
</template>

<script>
import { NavBar } from "vant";
import Panel from "@/components/panel";
import Competitor from "@/components/competitor";
import VeHistogram from "v-charts/lib/histogram.common";

export default {
  data: function() {
    return {
      data: {},
      loaded: false,
      chart1: {
        extend: {
          xAxis: {
            axisLabel: {
              rotate: -90
            }
          }
        },
        settings: {
          itemStyle: {
            color: "#686cff"
          },
          digit: 1,
          labelMap: {
            money: "营业额"
          }
        },
        grid: {
          top: 20,
          bottom: 10
        }
      },
      chart2: {
        extend: {
          xAxis: {
            axisLabel: {
              rotate: -90
            }
          }
        },
        settings: {
          itemStyle: {
            color: "#e94c46"
          },
          digit: 1,
          labelMap: {
            money: "kpi"
          }
        },
        grid: {
          top: 20,
          bottom: 10
        }
      },
      sale: {
        columns: ["date", "money"],
        rows: []
      },
      kpi: {
        columns: ["date", "money"],
        rows: []
      },
      create: {}
    };
  },
  components: {
    NavBar,
    Panel,
    Competitor,
    VeHistogram
  },
  async beforeMount() {},
  async created() {
    const id = this.$route.params.id;
    await this.$http.get(`api/store/${id}`).then(data => {
      if (data.competitors) {
        data.competitors = JSON.parse(data.competitors) || [];
        if (data.competitors[0].name == "") {
          data.competitors = [];
        }
      }

      this.data = data;

      let create = new Date(data.establishment_time * 1000);
      this.create = {
        year: create.getFullYear(),
        month: create.getMonth() + 1,
        date: create.getDate()
      };
    });

    await this.$http.get(`api/store/${id}/income`).then(data => {
      this.sale.rows = data;
      this.sale.month = data[data.length - 1].money.toLocaleString("en-US");
    });

    await this.$http.get(`api/store/${id}/kpi`).then(data => {
      this.kpi.rows = data;
      this.kpi.month = data[data.length - 1].money.toLocaleString("en-US");
    });

    this.loaded = true;
  }
};
</script>

<style scoped>
.line {
  height: 100%;
  background: #ededee;
}

.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title {
  color: #fff;
}

.van-nav-bar .van-icon {
  color: #fff;
}

[v-cloak] {
  display: none;
}

.number {
  font-size: 48px;
  font-weight: bold;
  color: #34579b;
}

.boolean {
  font-size: 32px;
  font-weight: bold;
  color: #34579b;
}

.pbody {
  padding-left: 40px;
}
</style>