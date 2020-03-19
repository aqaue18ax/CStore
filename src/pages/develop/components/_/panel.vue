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
    <div class="body" ref="body" :style="{maxHeight: unfold && !show ? '170px' : '100%', overflowY: unfold ? 'hidden' : ''}">
      <!-- <div v-show="!loading"> -->
        <slot />
      <!-- </div>
      <div class="flex justify-center" v-show="loading">
        <van-loading />
      </div> -->
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
    label: String,
    unfold: {
      type: Boolean,
      default: false
    }
    // height: Number,
    // maxHeight: {
    //   type: String,
    //   default: '170px'
    // }
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    // unfold () {
    //   return this.height > 180
    // },
  },

  methods: {
    load() {
      this.loading -= 1;
    },
    onClick() {
      this.show = !this.show;
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
}

.panel:last-child {
  margin-bottom: 15px;
}
</style>
