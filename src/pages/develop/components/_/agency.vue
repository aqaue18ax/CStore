<template>
  <popup :columns="columns" @confirm="confirm" />
</template>

<script>
import popup from "./popup";

export default {
  name: 'agency',
  props: {
    columns: Array,
  },
  data() {
    return {
      id: 0
    }
  },
  components: {
    popup
  },
  methods: {
    confirm(v) {
      if (v.id == this.id) return

      this.id = v.id
      v.type = this.$options._componentTag
      this.$emit("confirm", v);
    }
  }
};
</script>