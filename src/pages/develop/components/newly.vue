<template>
  <panel type="chart" title="新增门店数排名" :data="data.statistics">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>新增门店数量（家）
      </div>
    </div>

    <div class="pbody flex flex-wrap">
      <agency :columns="data.agencies" @confirm="confirm" />
      <province :columns="data.provinces" @confirm="confirm" />
      <module :columns="data.modules" @confirm="confirm" />
      <year @confirm="confirm" />
    </div>

    <char-bar :data="data.statistics" />

  </panel>
</template>

<script>
import { mapGetters } from 'vuex'

import Panel from "@/components/panel";
import CharBar from "./chart/bar";

import Agency from "./_/agency";
import Province from "./_/province";
import Module from "./_/module";
import Year from "./_/year";

export default {
  name: "newly",

  computed: {
    ...mapGetters({
      data: 'develop/newly'
    })
  },

  components: {
    Panel,
    CharBar,
    Agency,
    Module,
    Year,
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