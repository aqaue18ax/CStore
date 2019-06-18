<template>
  <div class="navbar text-lg font-regular flex justify-between align-center solid">
    <div class="left">
      <icon name="arrow-left"/>
    </div>
    <div class="title">{{this.title}}</div>
    <div class="right">
      <icon name="arrow-left"/>
    </div>
  </div>
</template>

<script>
import { icon } from "vant";

export default {
  props: {
    title: "",
    leftArrow: false,
    background: "white"
  },
  components: {
    icon
  }
};
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 80px;
  /* padding: 0 15px; */
  /* line-height: 80px; */
}

.left, .right {
  padding: 0 15px;
}

.van-icon {
  vertical-align: middle;
}
</style>