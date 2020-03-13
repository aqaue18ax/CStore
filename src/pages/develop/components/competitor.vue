<template>
  <panel type="attack" title="竞争对手统计" :data="data.statistics">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>预估销售额(万)
      </div>
      <div class="flex align-center">
        <div class="color" style="background: #e94c46"></div>竞争对手个数(个)
      </div>
    </div>

    <div class="pbody flex flex-wrap">
      <agency :columns="data.agencies" @confirm="confirm" />
      <province :columns="data.provinces" @confirm="confirm" />
      <module :columns="data.modules" @confirm="confirm" />
    </div>

    <d-bar :data="data.statistics" />

  </panel>
</template>

<script>
import { mapGetters } from 'vuex'

import Panel from "@/components/panel";
import dBar from "./chart/dbar";

import Agency from "./_/agency";
import Province from "./_/province";
import Module from "./_/module";

export default {
  name: "competitor",

  computed: {
    ...mapGetters({
      data: 'develop/competitor'
    })
  },

  components: {
    Panel,
    dBar,

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