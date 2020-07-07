<template>
  <panel type="map" title="终端建设覆盖率统计">
    <div class="pbody flex flex-wrap">
      <province :columns="provinces" @confirm="confirm" />
      <Dealer  @confirm="confirm" />
    </div>

    <chinaMap :position="position" :avg="avg" :data="data" />
  </panel>
</template>

<script>
import api from "../api";
import Panel from "@/components/panel";

import map from "./_/map";
import Province from "./_/province";
import Dealer from "./_/dealer";

export default {
  name: "terminal",
  data() {
    return {
      position: "china",
      dealer: "coverage",
      avg: 100,
      data: []
    };
  },

  computed: {
    provinces() {
      return [{ code: "all", name: "全国" }].concat(this.$parent.provinces);
    }
  },

  methods: {
    confirm(e) {
      if(e.type == 'province'){
        if (e.code == "all") {
          this.position = "china";
        } else {
          this.position = e.type + "/" + e.pinyin;
        }
      }
      if(e.type == "Dealer"){
        this.dealer = e.id
      }

      this.post(e.code);
    },
    post(code) {
      api.terminal(code).then(data => {
        this.avg = (parseFloat(data.avg))// * 100) || 0;
        data.data.map(o => {
          if(this.dealer == 'two_coverage'){
            o.percent = o.two_percent
          }
          o.percent = o[this.dealer] || 0
          // o.percent = parseFloat(o.percent * 100).toFixed(2)
        })
        this.data = data.data;
      });
    }
  },

  components: {
    Panel,
    Province,
    chinaMap: map,
    Dealer
  },
  created() {
    this.post("all");
  }
};
</script>