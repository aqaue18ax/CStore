<template>
  <div class="index">
    <div class="content">
      <div class="h1 text-xxl font-bold">正泰C-Store终端建设平台</div>
      <div class="text text-sm">便捷查询的正泰市场战略系统</div>
      <div class="btn" @click="navTo">立即体验</div>
    </div>
  </div>
</template>

<style scoped>
.index {
  height: 100%;
  background: url("../assets/bg.png") no-repeat;
  background-size: 100% 100%;
}

.content {
  position: absolute;
  bottom: 12%;
  width: 100%;
  color: #fff;
  font-size: 24px;
  text-align: center;
}

.text {
  padding-top: 6px;
  padding-bottom: 95px;
}

.btn {
  margin: 0 auto;
  font-size: 32px;
  width: 300px;
  padding: 10px 0;
  border: 1px solid #fff;
  border-radius: 25px;
}
</style>

<script>
export default {
  name: "index",
  methods: {
    navTo() {
      this.$router.replace("/home")
    }
  }
};
</script>