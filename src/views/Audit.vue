<template>
  <div class="user" v-cloak>
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <cell-group class="font-regular">
      <field label="用户名" v-model="user.name" input-align="right" placeholder="请输入用户名" required/>
      <field
        label="手机"
        v-model="user.phone"
        input-align="right"
        placeholder="请输入手机"
        required
        readonly
      />
      <field label="地址" v-model="user.address" input-align="right" placeholder="请输入地址" required/>
      <field
        label="邮箱"
        v-model="user.email"
        input-align="right"
        placeholder="请输入邮箱"
        type="email"
        required
      />
      <field
        label="权限"
        v-model="user.role.name"
        input-align="right"
        placeholder="请选择权限"
        required
        readonly
        @click="showPicker = true"
      />
      <field
        label="办事处"
        :value="user.agency ? user.agency.name : ''"
        input-align="right"
        placeholder="请选择办事处"
        required
        readonly
        @click="showPicker2 = true"
      />
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

    <popup v-model="showPicker2" position="bottom">
      <picker
        :columns="agencies"
        show-toolbar
        title="办事处选择"
        value-key="name"
        @confirm="onShowPicker2"
        @cancel="showPicker = false"
        :default-index="index2"
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
      roles: [],
      agencies: [],
      showPicker: false,
      showPicker2: false
    };
  },
  computed: {
    index() {
      return (
        this.roles.findIndex(role => {
          role.name === this.user.role.name;
        }) || 0
      );
    },
    index2() {
      return (
        this.agencies.findIndex(agency => {
          agency.id === this.user.agency_id;
        }) || 0
      );
    },
    check() {
      return (
        this.user.name.length &&
        this.user.address.length &&
        this.user.email.length &&
        this.user.role_id
      );
    },
    user() {
      return this.$root.user;
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
      this.$root.user.role.name = data.name;
      this.$root.user.role_id = data.id;

      this.showPicker = false;
    },
    onShowPicker2(data) {
      this.$root.user.agency_id = data.id;
      this.$root.user.agency = {name: data.name};

      this.showPicker2 = false;
    },
    onSubmit() {
      if (!this.check) return;

      const data = {
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
        name: this.user.name,
        role_id: this.user.role_id,
        agency_id: this.user.agency_id
      };

      http.put("api/user/audit", data).then(() => {
        this.$root.user.audit_status = 3;
        this.$router.replace(`/user`);
      });
    }
  },
  async created() {
    await http.get("api/role").then(data => {
      this.roles = data;
    });

    await http.get("api/agency").then(data => {
      this.agencies = data
    })
  }
};
</script>