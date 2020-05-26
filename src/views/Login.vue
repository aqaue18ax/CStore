<template>
  <div class="login">
    <logo />
    <div class="content flex flex-direction justify-center align-center">
      <div class="title">
        <img src="../assets/title.png" />
      </div>
      <div class="form-group bg-gray flex align-center" style="margin-top: -20px;">
        <i class="iconfont icon-md-phone-portrait"></i>
        <input
          type="number"
          name="phone"
          id="phone"
          class="form-control text-df text-gray"
          placeholder="请输入手机号码"
          v-model="phone"
        />
      </div>
      <div class="form-group margin-top-sm bg-gray flex align-center">
        <i class="iconfont icon-md-key"></i>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control text-df text-gray"
          placeholder="请输入密码"
          v-model="pwd"
        />
      </div>

      <div class="button-group flex flex-direction margin-xl">
        <button class="btn text-lg bg-white text-blue" :class="{'bg-blue text-white': check}" @click="login">登入</button>
        <button class="btn text-lg bg-white text-blue" @click="navTo('reg')">注册</button>
        <div class="text-white text-sm text-center margin-top-sm" @click="navTo('forget')">忘记密码?</div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/components/logo";
import http from "@/utils/http";

export default {
  data() {
    return {
      phone: "",
      pwd: ""
    };
  },
  components: {
    logo
  },
  computed: {
    check() {
      return this.phone.length >= 11 && this.pwd.length >= 6;
    }
  },
  methods: {
    login() {
      if (!this.check) return;

      http
        .post("/api/login", { phone: this.phone, password: this.pwd })
        .then(res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("roles", JSON.stringify(res.roles));
          // this.$router.replace(`/home`);
          location.reload();
        });
    },
    navTo(url) {
      this.$router.push(`/${url}`);
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.replace(`/index-image`);
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  position: relative;
  background-image: url("../assets/login_bg.png");
  background-color: #005bac;
  background-size: cover;
  background-repeat: no-repeat;
}
.title {
  text-align: center;
  width: 100%;
  margin-top: -50px;
}
.title img {
  width: 70%;
}

.content {
  padding-top: 40%;
}

.form-group {
  width: 540px;
  height: 80px;
  border-radius: 10px;
  padding: 0 20px;
  background: #00a0e9;
  color: #fff;
}

.form-control {
  padding-left: 20px;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  line-height: 54px;
  margin: 0;
  padding: 0;
  color: #fff;
  background-color: transparent;
  border: 0;
  resize: none;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #fff;
}

.btn {
  height: 80px;
  /* width: 580px; */
  margin-top: 20px;
  padding: 0 150px;
  border: none;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
}
</style>
