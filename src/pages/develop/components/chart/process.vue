<template>
  <div class="item flex">
    <div class="portion" :style="{width: width + '%', background: color}"></div>
    <span class="padding-left-xs test-xs">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    width: Number,
    color: String
  }
}
</script>

<style scoped>
.item {
  height: 28px;
  width: 100%;
  background: #f1f1f1;
}

.item + .item {
  margin-top: 6px;
}

.portion {
  height: 28px;
}
</style>