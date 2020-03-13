<template>
  <panel type="pie" title="市场开发统计" :data="data.statistics">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>区域门店数量（家）
      </div>
    </div>

    <div class="pbody flex">
      <agency :columns="data.agencies" @confirm="confirm" />
      <province :columns="data.provinces" @confirm="confirm" />
      <module :columns="data.modules" @confirm="confirm" />
    </div>

    <char-bar :data="data.statistics" />
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'

import Panel from "./_/panel";
import CharBar from "./chart/bar";

import Agency from "./_/agency";
import Province from "./_/province";
import Module from "./_/module";

export default {
  name: "market",

  computed: {
    ...mapGetters({
      data: 'develop/market'
    })
  },

  components: {
    Panel,
    CharBar,
    Agency,
    Module,
    Province
  },

  methods: {
    confirm(e) {
      e.key = this.$options._componentTag
      this.$store.dispatch("develop/change", e)
    }
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