<template>
  <popup :columns="columns" @confirm="confirm" />
</template>

<script>
import popup from "./popup";

export default {
  name: "city",
  props: {
    columns: Array
  },
  data() {
    return {
      code: ''
    }
  },
  components: {
    popup
  },
  methods: {
    confirm(v) {
      if (v.code == this.code) return 

      this.code = v.code
      v.type = this.$options._componentTag;
      this.$emit("confirm", v);
    }
  }
};
</script>
