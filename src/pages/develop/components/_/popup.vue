<template>
  <div class="padding-bottom-sm">
    <div class="btn margin-lr-xs" @click="show = true">
      {{columns[select] ? columns[select][valueKey] : columns[select]}}
      <van-icon name="arrow-down" class="padding-left-xs" />
    </div>

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker :columns="columns" :value-key="valueKey" show-toolbar :default-index="select" @cancel="show = false" @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    valueKey: {
      type: String,
      default: "name"
    },
    columns: Array
  },
  watch: {
    columns() {
      this.select = 0;
    }
  },
  data() {
    return {
      show: false,
      select: 0
    }
  },
  methods: {
    confirm (v, i) {
      this.show = false;
      this.select = i;
      this.$emit('confirm', v)
    }
  }
};
</script>

<style scoped>
.select {
  padding: 0px 20px 12px 20px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: auto;
  height: 40px;

  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
}
</style>
