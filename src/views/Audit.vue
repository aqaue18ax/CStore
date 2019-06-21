<template>
  <div class="user">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <cell-group class="font-regular">
      <field label="用户名" v-model="user.name" input-align="right" placeholder="请输入用户名" required />
      <field label="手机" v-model="user.phone" input-align="right" placeholder="请输入手机" required readonly />
      <field label="地址" v-model="user.address" input-align="right" placeholder="请输入地址" required />
      <field label="邮箱" v-model="user.email" input-align="right" placeholder="请输入邮箱" type="email" required />
      <field label="权限" v-model="user.role" input-align="right" placeholder="请选择权限" required readonly @click="showPicker = true"/>

      <!-- <cell
        title="用户名"
        is-link
        :value="user.name || '请输入用户名(必填)'"
        :to="{path: 'input', query: {type: 'text', title: '用户名', store: 'user', key: 'name'}}"
      /> -->
      <!-- <cell title="电话" is-link :value="user.phone"/>

      <cell
        title="地址"
        is-link
        :value="user.address || '请输入地址(必填)'"
        :to="{path: 'input', query: {type: 'text', title: '地址', store: 'user', key: 'address'}}"
      />

      <cell
        title="邮箱"
        is-link
        :value="user.email || '请输入邮箱(必填)'"
        :to="{path: 'input', query: {type: 'text', title: '邮箱', store: 'user', key: 'email'}}"
      />

      <cell title="权限" is-link :value="user.role || '请输入权限(必填)'" @click="showPicker = true"/> -->
    </cell-group>

    <popup v-model="showPicker" position="bottom">
      <picker
        :columns="roles"
        show-toolbar
        title="权限选择"
        value-key="name"
        @confirm="onShowPicker"
        @cancel="showPicker = false"
        :default-index="index"
      />
    </popup>

    <div class="button-group flex flex-direction margin-xl font-regular">
      <button class="btn text-sm bg-white" :class="{'bg-blue': check}" @click="onSubmit">提交审核</button>
    </div>
  </div>
</template>

<style scoped>
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
</style>

<script>
import { NavBar, CellGroup, Picker, Popup, Field } from "vant";
import http from "@/utils/http";

export default {
  data() {
    return {
      user: {
        name: '',
        address: '',
        email: ''
      },
      roles: [],
      showPicker: false
    };
  },
  computed: {
    index() {
      return this.roles.findIndex(role => {
        role.name === this.user.role
      }) || 0
    },
    check() {
      return (
        this.user.name.length &&
        this.user.address.length &&
        this.user.email.length &&
        this.user.role_id
      );
    }
  },
  components: {
    NavBar,
    CellGroup,
    Picker,
    Popup,
    Field
  },
  methods: {
    onShowPicker(data) {
      this.user.role = data.name;
      this.user.role_id = data.id;

      this.showPicker = false;
    },
    onSubmit() {
      if (!this.check) return;

      const data = {
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
        name: this.user.name,
        role_id: this.user.role_id
      };

      http.put('/user/audit', data).then(() => {
        this.$router.replace(`/user`);
      })
    }
  },
  async created() {
    await http.get('/user').then(data => {
      this.user = data;
    })
    await http.get('/role').then(data => {
      this.roles = data
    })
  }
};
</script>