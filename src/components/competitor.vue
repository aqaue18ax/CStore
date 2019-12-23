<template>
  <div class="competitor">
    <div class="header flex justify-between">
      <div class="name text-bold">{{name}}</div>
      <div class="sale">预估销售额：<span>{{sale}}</span></div>
    </div>
    <div class="body">
      {{info}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    sale: String,
    info: String
  }
};
</script>

<style scoped>
.sale span {
  color: #f34e4a;
}

.body {
  padding: 25px 0;
}

.name {
  font-size: 26px;
  color: #34579b;
}
</style>
