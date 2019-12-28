<template>
  <van-picker :columns="columns()" :default-index="index" show-toolbar @cancel="cancel" @confirm="confirm" />
</template>

<script>
export default {
  data () {
    return {
      min: 2018,
      index: 0
    }
  },
  methods: {
    columns () {
      const now = new Date().getFullYear()
      const columns = []
      for (let i = this.min; i <= now; i++) {
        columns.push(i)
      }

      this.index = columns.length
      return columns
    },
    cancel () {
      this.$emit('cancel')
    },
    confirm (picker, values) {
      this.$emit('confirm', picker, values)
    }
  }
}
</script>