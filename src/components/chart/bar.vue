<template>
  <div>
    <process :max="max" v-for="v in data" :y="v.area" :value="v.value" />
  </div>
</template>

<script>
import Process from "@/components/chart/process";

export default {
  props: {
    data: Array
  },

  data () {
    return {
      max: 0
    }
  },

  components: {
    Process
  },

  created() {
    let max = this.max;
    this.data.map(({ value }) => {
      max = max < value ? value : max;
    });

    let len = max.toString().length - 1;

    if (len) {
      let tmp = Math.pow(10, len);
      this.max = Math.ceil(max / tmp) * tmp;
    } else {
      this.max = max + 0.3
    }
  }
}
</script>