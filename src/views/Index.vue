<template>
  <div class="index flex align-center">
    <logo />
    <div class="content">
      
      <div class="title">
        <img src="../assets/title3.png" />
      </div>
      <div class="title2">
        <img src="../assets/title4.png" />
      </div>
      <!-- <div class="h1 text-xxxl margin-bottom-xs font-bold">正泰C-Store</div>
      <div class="h1 text-xxxl margin-bottom-xs font-bold">终端建设平台</div>
      <div class="text text-df">便捷查询的正泰市场战略系统</div> -->
      <div class="btn" @click="navTo">立即体验</div>
    </div>
  </div>
</template>

<style scoped>
.index {
  height: 100%;
  background: url("../assets/bg2.png") no-repeat;
  background-size: 100% 100%;
}

.content {
  /* position: absolute;
  bottom: 12%; */
  width: 100%;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.title {
  margin-bottom: 50px;
}
.title img {
  width: 50%;
}
.title2 {
  margin: 4rem 0;
}
.title2 img {
  width: 30%;
}

.text {
  padding-top: 6px;
  padding-bottom: 95px;
}

.text-df{
  color: #7ecef4;
}

.btn {
  margin: 0 auto;
  font-size: 34px;
  width: 300px;
  padding: 20px 0;
  background-color: #00a0e9;
  color: white;
  /* border: 1px solid #fff; */
  border-radius: 25px;
}
</style>

<script>
import logo from "@/components/logo";
export default {
  name: "index",
  components: {
    logo
  },
  methods: {
    navTo() {
      this.$router.replace("/index-image")
    }
  }
};
</script>