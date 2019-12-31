<template>
  <van-picker :columns="columns()" :default-index="index" show-toolbar @cancel="cancel" @confirm="confirm" />
</template>

<script>
export default {
  props: {
    value: Number
  },
  data () {
    return {
      min: 2010
    }
  },

  computed: {
    index () {
      return new Date().getFullYear() - this.value
    }
  },

  methods: {
    columns () {
      const now = new Date().getFullYear()
      const columns = []
      for (let i = this.min; i <= now; i++) {
        columns.push(i)
      }

      return columns.reverse()
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