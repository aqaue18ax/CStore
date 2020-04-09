<template>
  <div class="line flex flex-direction">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.push('index-image')" class="font-regular"></navBar>

    <!-- <agent />
    <classify /> -->
    <!-- <market v-if="$root.user.roles.dev.market" /> -->
    <!-- <newly v-if="$root.user.roles.dev.newly" /> -->
    <!-- <sale v-if="$root.user.roles.dev.sale" />
    <competitor v-if="$root.user.roles.dev.competitor" /> -->
    <!-- <operation /> -->
    <terminal />
    <AgenceSpending />
    <TerminalSpending />

  </div>
</template>

<script>
import { NavBar } from "vant";

import api from "./api";

// import Agent from "./components/agent";
// import Market from "./components/market";
// import Newly from "./components/newly";
// import Sale from "./components/sale";
// import Competitor from "./components/competitor";
// import Operation from "./components/operation";
import Terminal from "./components/terminal";
import AgenceSpending from "./components/agenceSpending";
import TerminalSpending from "./components/terminalSpending";
// import Classify from "./components/classify";

export default {
  data() {
    return {
      agencies: [],
      provinces: [],
      modules: [],
      city: []
    };
  },
  components: {
    NavBar,
    // Agent,
    // Market,
    // Newly,
    // Sale,
    // Competitor,
    // Operation,
    Terminal,
    AgenceSpending,
    TerminalSpending
    // Classify
  },
  methods: {
    init() {
      api.agency().then(data => {
        this.agencies = data;
      });

      api.province(0).then(data => {
        this.provinces = data;
      });

      api.module().then(data => {
        this.modules = data;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
.color {
  width: 25px;
  height: 25px;
  margin: 0 12px;
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
</style>