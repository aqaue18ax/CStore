<template>
  <panel type="map" title="终端建设覆盖率统计">
    <div class="pbody flex flex-wrap">
      <province :columns="provinces" @confirm="confirm" />
    </div>

    <chinaMap :position="position" :avg="avg" :data="data" />
  </panel>
</template>

<script>
import api from "../api";
import Panel from "@/components/panel";

import map from "./_/map";
import Province from "./_/province";

export default {
  name: "terminal",
  data() {
    return {
      position: "china",
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
      if (e.code == "all") {
        this.position = "china";
      } else {
        this.position = e.type + "/" + e.pinyin;
      }

      this.post(e.code);
    },
    post(code) {
      api.terminal(code).then(data => {
        this.avg = parseFloat(data.avg) || 0;
        this.data = data.data;
      });
    }
  },

  components: {
    Panel,
    Province,
    chinaMap: map
  },
  created() {
    this.post("all");
  }
};
</script>