<template>
  <div class="user" v-cloak>
    <navBar :title="title" :left-arrow="goBack" @click-left="$router.back()" class="font-regular"></navBar>

    <div v-if="user.audit_status == 1">
      <cell-group class="font-regular margin-tb-xs">
        <cell title="头像" center style="line-height: 0">
          <uploader :after-read="onUpload">
            <img width="100" height="100" :src="user.headimg || avatar" class="img" />
          </uploader>
        </cell>
      </cell-group>

      <!-- <cell-group class="font-regular margin-tb-xs">
        <cell title="专业市场" is-link :to="{name: 'stores', query: {module_id: 1, title: '专业市场'}}" v-if="user.roles.market.market" />
        <cell title="正泰门店" is-link :to="{name: 'stores', query: {module_id: 21, title: '正泰门店'}}" v-if="user.roles.store.CHINTStore" />
      </cell-group> -->

      <!-- <cell-group class="font-regular margin-tb-xs" v-if="user.role.modules.length">
        <cell title="运营状况" is-link :to="{name: 'operation'}" />
      </cell-group> -->

      <!-- <cell-group class="font-regular margin-tb-xs" v-if="user.roles.dev.devStatistics">
        <cell title="开发统计" is-link :to="{name: 'develop'}" />
      </cell-group> -->

      <cell-group class="font-regular margin-tb-xs padding">
        <div class="title padding-bottom-xs solid-bottom">我的资料</div>
        <div class="text-df padding-top-xs">用户名：{{user.name}}</div>
        <div class="text-df padding-top-xs">手机：{{user.phone}}</div>
        <div class="text-df padding-top-xs">邮箱：{{user.email}}</div>
        <div class="text-df padding-top-xs">地址：{{user.address}}</div>
        <div class="text-df padding-top-xs">权限：{{user.role.name}}</div>
        <div class="text-df padding-top-xs">办事处：{{user.agency.name}}</div>
      </cell-group>

      <div class="btn bg-blue" @click="logout">退出</div>
    </div>

    <div class="error text-center padding-top-xl" v-else-if="user.audit_status == 3">
      <icon name="todo-list-o" size="8rem" color="#c0c0c2" />
      <div>正在审核您的信息</div>
    </div>

    <logo />
  </div>
</template>

<style scoped>
.van-nav-bar {
  line-height: 47px;
}

.van-icon {
  color: #333;
}

.btn {
  text-align: center;
  padding: 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
}

.img {
  border-radius: 100%;
}

.title {
  color: #3672e7;
}

.error {
  margin: 0 auto;
}
</style>

<script>
import logo from "@/components/logo";
import { NavBar, CellGroup, Cell, Uploader, Icon } from "vant";
import avatar from "@/assets/avatar.png";

export default {
  data() {
    return {
      goBack: false,
      modules: [],
      avatar
    };
  },
  computed: {
    user() {
      return this.$root.user;
    },
    title() {
      return this.user.audit_status == 3 ? "认证审核" : "编辑资料";
    }
  },
  components: {
    NavBar,
    // Field,
    CellGroup,
    Cell,
    logo,
    Uploader,
    Icon
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.replace("/login");
    },
    onUpload(data) {
      this.value = data.content;
      const name =
        Date.parse(new Date()) +
        Math.random()
          .toString()
          .slice(-6) +
        "." +
        data.file.name.split(".").pop();

      this.$http
        .file("api/user/avatar", { file: data.file, name })
        .then(url => {
          this.user.headimg = url;
        });
    }
  },
  async created() {
    await this.$http.get("/api/user").then(data => {
      if (data.role == null) {
        data.role = { name: "" };
      }

      this.$root.user = data;

      if (data.audit_status == 1) this.goBack = true;
      if (data.audit_status == 0 || data.audit_status == 2)
        this.$router.replace("/audit");
    });
  }
};
</script>
