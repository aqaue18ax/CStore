<template>
  <div class="panel padding-lr" :class="{'padding-top': unfold, 'padding-tb': !unfold}">
    <div class="header flex justify-between align-center">
      <div class="flex align-center">
        <img :src="`assets/${type}.png`" class="icon" />
        <span class="title">{{title}}</span>
      </div>
      <div class="label">
        <slot name="label" />
        {{label}}
      </div>
    </div>
    <div class="body" ref="body" :style="{maxHeight: maxHeight}">
      <slot />
    </div>
    <div class="text-center" v-if="unfold">
      <van-icon name="arrow-down" size="20" v-if="!show" @click="onClick" />
      <van-icon name="arrow-up" size="20" v-if="show" @click="onClick" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    type: String,
    label: String
  },

  data () {
    return {
      maxHeight: '100%',
      unfold: false,
      show: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.height = this.$refs.body.clientHeight
      if (this.height > 180) {
        this.unfold = true
        this.maxHeight = '160px'
      }
    });
  },

  methods: {
    onClick () {
      this.show = !this.show

      if (this.show) {
        this.maxHeight = '100%'
      } else {
        this.maxHeight = '160px'
      }
    }
  }
};
</script>

<style scoped>
.panel {
  margin: 15px;
  margin-bottom: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 18px 0px rgba(52, 87, 155, 0.1);
  font-size: 24px;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  padding-left: 15px;
}

.body {
  font-size: 24px;
  padding-top: 25px;
  overflow: hidden;
}

.panel:last-child {
  margin-bottom: 15px;
}
</style>
