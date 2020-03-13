<template>
  <div>
    <div class="flex align-center block" v-for="(v,i) in data" :key="i">
      <div class="title">{{v.area}}</div>
      <div class="process">
        <process :width="Math.ceil(v.value / max * 80) || 0" color="#686cff" :value="v.value" />
      </div>
    </div>
  </div>
</template>

<script>
import Process from "./process";

export default {
  props: {
    data: {
      type: Array
    }
  },

  components: {
    Process
  },

  computed: {
    max () {
      let max = 0;
      this.data.map(({ value }) => {
        max = max < value ? value : max;
      });

      let len = Math.ceil(max).toString().length;
      let tmp = Math.pow(10, len - 1);
      return Math.ceil(max / tmp) * tmp;
    }
  }
}
</script>

<style scoped>
.block {
  padding-top: 6px;
  padding-bottom: 6px;
}

.title {
  width: 100px;
  padding-left: 20px;
  height: auto;
}

.process {
  width: 100%;
}
</style>