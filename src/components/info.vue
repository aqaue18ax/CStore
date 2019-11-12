<template>
  <popup v-model="show" position="bottom" :overlay="false">
    <div class="banner bg-white" @click="onShow = false">
      <div class="title font-medium text-xl text-center">正泰C-Store终端建设平台</div>
      <div class="solid"></div>
      <div class="content font-regular text-lg">
        正泰C-Store终端建设平台主要用于定位全国终端建设GPS坐标，
        便于了解专业市场、一级经销商、二级分销商的详细信息；以及门店信息、市场战略、运营状况。
      </div>
    </div>
  </popup>
</template>

<script>
import { Popup } from "vant";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      onShow: true
    };
  },
  computed: {
    show: {
      get () {
        return this.onShow && this.isShow
      },
      set (value) {
        this.onShow = value
      }
    }
  },
  components: {
    Popup
  }
};
</script>

<style scoped>
.banner {
  height: 100%;
  width: 100%;
  box-shadow: 0px -3px 10px rgba(92, 92, 92, 0.3);
}

.title {
  padding: 30px 40px 20px 40px;
}

.content {
  padding: 35px 80px 35px 80px;
}
</style>
