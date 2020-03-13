<template>
  <div class="padding-bottom-sm">
    <div class="btn margin-lr-xs" @click="show = true">
      {{columns[select] || year}}
      <van-icon name="arrow-down" class="padding-left-xs" />
    </div>

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker :columns="columns" show-toolbar :default-index="select" @cancel="show = false" @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'year',
  data() {
    this.min = 2018;
    this.year = new Date().getFullYear();

    return {
      columns: [],
      show: false,
      select: 0
    };
  },
  methods: {
    confirm(v, i) {
      this.show = false;
      this.select = i;
      this.$emit("confirm", {value: v, type: this.$options._componentTag});
    }
  },
  created() {
    const columns = [];
    for (let i = this.min; i <= this.year; i++) {
      columns.push(i);
    }

    this.columns = columns.reverse();
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