<template>
  <div class="user">
    <navBar :title="title" left-arrow @click-left="goBack" class="font-regular"></navBar>

    <div v-if="user.audit_status == 1">
      <cell-group class="font-regular margin-tb-xs">
        <cell title="头像" center style="line-height: 0">
          <uploader :after-read="onUpload">
            <img width="100" height="100" :src="user.headimg || avatar" class="img">
          </uploader>
        </cell>
      </cell-group>

      <cell-group class="font-regular margin-tb-xs">
        <cell
          :title="m.name"
          is-link
          :to="{name: 'stores', query: {module_id: m.id, title: m.name}}"
          v-for="m in modules"
          :key="m.id"
        />
      </cell-group>

      <cell-group class="font-regular margin-tb-xs padding">
        <div class="title padding-bottom-xs solid-bottom">我的资料</div>
        <div class="text-df padding-top-xs">用户名：{{user.name}}</div>
        <div class="text-df padding-top-xs">手机：{{user.phone}}</div>
        <div class="text-df padding-top-xs">邮箱：{{user.email}}</div>
        <div class="text-df padding-top-xs">地址：{{user.address}}</div>
        <div class="text-df padding-top-xs">权限：{{user.role.name}}</div>
      </cell-group>
    </div>
    <div class="error text-center padding-top-xl" v-else-if="user.audit_status == 3">
      <icon name="todo-list-o" size="8rem" color="#c0c0c2"/>
      <div>正在审核您的信息</div>
    </div>

    <logo/>
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
  height: 80px;
  width: 100%;
  border: none;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
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
      user: {},
      modules: [],
      avatar
    };
  },
  computed: {
    title() {
      return this.user.audit_status == 3 ? "认证审核" : "编辑资料";
    },
    check() {
      return (
        this.user.name.length &&
        this.user.address.length &&
        this.user.email.length &&
        this.user.roles.length
      );
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
    goBack() {
      this.$router.go(-1);
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

      this.$http.file("/user/avatar", { file: data.file, name }).then(url => {
        this.user.headimg = url;
      });
    }
  },
  async created() {
    await this.$http.get("/user").then(data => {
      this.user = data;
    });

    if (this.user.audit_status == 0) this.$router.replace("/audit");

    await this.$http.get("/module").then(data => {
      this.modules = data;
    });
  }
};
</script>
