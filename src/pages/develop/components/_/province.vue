<template>
  <popup :columns="columns" @confirm="confirm" />
</template>

<script>
import popup from "./popup";

export default {
  name: "province",
  props: {
    columns: Array
  },
  components: {
    popup
  },
  methods: {
    confirm(v) {
      v.type = this.$options._componentTag;
      this.$emit("confirm", v);
    }
  }
};
</script>