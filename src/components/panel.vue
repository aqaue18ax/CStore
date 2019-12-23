<template>
  <div class="panel">
    <div class="header flex justify-between">
      <div class="flex align-center">
        <img :src="`assets/${type}.png`" class="icon" />
        <span class="title">{{title}}</span>
      </div>
      <div class="label">{{label}}</div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    type: String,
    label: String
  }
};
</script>

<style scoped>
.panel {
  margin: 15px;
  margin-bottom: 0;
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0px 2px 18px 0px rgba(52, 87, 155, 0.1);
  font-size: 24px;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  padding-left: 15px;
}

.body {
  font-size: 24px;
  padding-top: 25px;
}

.panel:last-child {
  margin-bottom: 15px;
}
</style>
