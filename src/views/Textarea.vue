<template>
  <div class="input">
    <navBar :title="'设置' + $route.query.title" left-arrow right-text="确认" @click-left="goBack" class="font-regular">
      <div slot="right" class="text-xl" @click="onSubmit">确定</div>
    </navBar>

    <cell-group class="font-regular margin-top-sm">
      <field
        type="textarea"
        :placeholder="'输入' + $route.query.title"
        clearable
        rows="10"
      />
    </cell-group>
  </div>
</template>

<style scoped>
.input {
  background: #f5f5f5;
  height: 100%;
}

.van-icon {
  color: #333;
}

.van-uploader {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px dashed #e5e5e5;
}
</style>

<script>
import { NavBar, Field, CellGroup, Uploader, Icon } from "vant";

export default {
  data() {
    return {
      // value: this.$store.state[this.$route.query.store][this.$route.query.key]
    };
  },
  components: {
    NavBar,
    Field,
    CellGroup,
    Uploader,
    Icon
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      console.log(1)
    }
  }
};
</script>