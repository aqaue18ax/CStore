<template>
  <div>
    <div class="flex align-center block" v-for="(v,i) in data" :key="i">
      <div class="title">{{v[y]}}</div>
      <div class="process">
        <process :width="Math.ceil(v.value / vMax * 88)" color="#686cff" :value="v.value" />
        <process :width="Math.ceil(v.num / nMax * 88)" color="#e94c46" :value="v.num" />
      </div>
    </div>
  </div>
</template>

<script>
import Process from "@/components/chart/process";

export default {
  props: {
    name: String,
    y: {
      type: String,
      default: 'area'
    },
    data: Array
  },

  computed: {
    vMax () {
      let max = 0;
      this.data.map(v => {
        max = max < v.value ? v.value : max
      })

      let len = Math.ceil(max).toString().length
      let tmp = Math.pow(10, len - 1)

      return Math.ceil(max / tmp) * tmp
    },
    nMax () {
      let max = 0;
      this.data.map(v => {
        max = max < v.num ? v.num : max
      })

      let len = Math.ceil(max).toString().length
      let tmp = Math.pow(10, len - 1)

      return Math.ceil(max / tmp) * tmp
    }
  },

  components: {
    Process
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
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}

.process {
  width: 100%;
}
</style>