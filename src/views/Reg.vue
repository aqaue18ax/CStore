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
          v-model="pwd"
        >
      </div>
      <div class="form-group margin-top-sm bg-gray flex align-center">
        <i class="iconfont icon-md-key"></i>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          class="form-control text-lg text-gray"
          placeholder="确认密码"
          v-model="confirm_pwd"
        >
      </div>
      <div class="flex justify-around all">
        <div class="form-group margin-top-sm bg-gray half">
          <input
            type="number"
            name="code"
            id="code"
            class="form-control text-lg text-gray"
            placeholder="请输入验证码"
            v-model="code"
          >
        </div>
        <div
          class="form-group margin-top-sm bg-gray text-lg text-center half code"
          :class="classCode"
          @click="sendCode"
        >{{content}}</div>
      </div>

      <div class="button-group flex flex-direction margin-xl">
        <button class="btn text-sm bg-gray text-black" :class="classReg" @click="reg">注册</button>
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
      pwd: "",
      confirm_pwd: "",
      code: "",
      content: "获取验证码",
      totalTime: 60,
      canSend: true
    };
  },
  computed: {
    classCode() {
      if (this.phone.length == 11 && this.canSend) {
        return ["bg-blue", "text-white"];
      }
      return ''
    },
    classReg() {
      if (this.phone.length == 11 && this.code.length >= 4 && this.pwd.length >= 6 && this.confirm_pwd.length >= 6) {
        return ["bg-blue", "text-white"];
      }
      return ''
    }
  },
  components: {
    logo
  },
  methods: {
    sendCode() {
      if (!this.canSend || this.phone.length != 11) return;
      this.canSend = false;
      this.content = this.totalTime + "s";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s";
        if (this.totalTime == 0) {
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.totalTime = 60;
          this.canSend = true;
        }
      }, 1000);

      http.post('api/sms', {phone: this.phone})
    },
    reg() {
      if (this.phone.length != 11 || this.pwd.length < 6 || this.confirm_pwd.length < 6 || this.code.length < 6) return;

      const data = {
        phone: this.phone,
        password: this.pwd,
        confirm_password: this.confirm_pwd,
        code: this.code
      };

      http.post("api/reg", data).then(res => {
        localStorage.setItem("token", res.token);
        // this.$router.replace(`/home`);
          location.reload();
      })
    }
  }
};
</script>

<style scoped>
.content {
  padding-top: 36%;
}

.form-group {
  width: 540px;
  height: 80px;
  border-radius: 10px;
  padding: 0 20px;
}

.all {
  width: 600px;
}

.half {
  width: 240px;
}

.form-control {
  padding-left: 20px;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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

.code {
  line-height: 80px;
}
</style>
