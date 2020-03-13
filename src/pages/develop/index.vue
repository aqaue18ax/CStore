<template>
  <div class="line flex flex-direction">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <market v-if="$root.user.roles.dev.market" />
    <newly v-if="$root.user.roles.dev.newly" />
    <sale v-if="$root.user.roles.dev.sale" />
    <competitor v-if="$root.user.roles.dev.competitor" />
    <china />

  </div>
</template>

<script>
import { NavBar } from "vant";

import Market from "./components/market";
import Newly from "./components/newly";
import Sale from "./components/sale";
import Competitor from "./components/competitor";
import China from "./components/china";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Market,
    Newly,
    Sale,
    Competitor,
    China
  },
  created() {
    this.$store.dispatch('develop/init')
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