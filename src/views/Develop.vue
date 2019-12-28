<template>
  <div class="line flex flex-direction">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <market />
    <newly />
    <sale />
    <competitor />

  </div>
</template>

<script>
import { NavBar } from "vant";
import Competitor from "@/components/panel/competitor";
import Market from "@/components/panel/market";
import Sale from "@/components/panel/sale";
import Newly from "@/components/panel/newly";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Market,
    Newly,
    Sale,
    Competitor
  },
  computed: {},
  methods: {},
  async created() {}
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