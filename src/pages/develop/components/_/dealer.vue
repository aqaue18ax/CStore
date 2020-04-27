<template>
  <div>
    <div class="btn margin-lr-xs" @click="show = true">
      {{ name }}
      <van-icon name="arrow-down" class="padding-left-xs" />
    </div>

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker
        ref="picker"
        :columns="columns"
        value-key="name"
        show-toolbar
        @cancel="show = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
//   props: {
//     columns: Array,
//   },
  data() {
    return {
        columns: [
            // "一级经销商", "二级经销商"
            {id: 'coverage', name: "一级店面"},
            {id: 'two_coverage', name: "二级门招"}
        ],
      name: "一级店面",
      show: false,
      id: 1
    };
  },
  methods: {
    confirm(v, i) {
      this.name = v.name;
      const id = this.columns[i].id;

      this.show = false;

      if (id == this.id) return

      this.id = id;
      this.$emit("confirm", { id, name: this.name, type: this.$options._componentTag });
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
