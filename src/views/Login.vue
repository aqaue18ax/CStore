<template>
  <div class="login">
    <div class="content flex flex-direction justify-center align-center">
      <div class="form-group margin-top-sm bg-gray flex align-center">
        <i class="iconfont icon-md-phone-portrait"></i>
        <input
          type="number"
          name="phone"
          id="phone"
          class="form-control text-lg text-gray"
          placeholder="请输入手机号码"
          @focus="$root.logo = false"
          @blur="$root.logo = true"
          v-model="phone"
        >
      </div>
      <div class="form-group margin-top-sm bg-gray flex align-center">
        <i class="iconfont icon-md-key"></i>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control text-lg text-gray"
          placeholder="请输入密码"
          @focus="$root.logo = false"
          @blur="$root.logo = true"
          v-model="pwd"
        >
      </div>

      <div class="button-group flex flex-direction margin-xl">
        <button class="btn text-sm bg-white" :class="{'bg-blue': check}" @click="login">登陆</button>
        <button class="btn text-sm bg-white" @click="navTo('reg')">注册</button>
        <div class="text-black text-sm text-center margin-top-sm" @click="navTo('forget')">忘记密码?</div>
      </div>
    </div>

    <logo/>
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
        .post("/login", { phone: this.phone, password: this.pwd })
        .then(res => {
          localStorage.setItem("token", res.token);
          this.$router.replace(`/home`);
        });
    },
    navTo(url) {
      this.$router.push(`/${url}`);
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.replace(`/home`);
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  background: #fff;
}

.content {
  padding-top: 40%;
}

.form-group {
  width: 540px;
  height: 80px;
  border-radius: 10px;
  padding: 0 20px;
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
  color: #323233;
  background-color: transparent;
  border: 0;
  resize: none;
}

.btn {
  height: 80px;
  width: 580px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
}
</style>
