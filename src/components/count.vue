<template>
  <van-popup v-model="show" position="bottom" :overlay="false">
    <div class="banner bg-white">
      <div class="title font-medium text-xl text-center">正泰C-Store终端建设平台</div>
      <div class="flex flex-wrap padding-sm text-sm">
        <div class="area" v-for="v in data" :key="v.name">
          <div class="color" :style="{background: v.color}"></div>{{v.name}} {{v.count}}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    isShow: Boolean
  },

  data () {
    return {
      data: []
    }
  },

  computed: {
    show: {
      get () {
        return this.isShow
      },
      set () {}
    }
  },

  methods: {
    onGet() {
      const area = localStorage.getItem("area");
      this.$http.get(`api/store/count/${area}`).then(data => {
        this.data = data
      });
    }
  },

  created() {
    this.onGet()
  }
};
</script>

<style scoped>
.banner {
  height: 100%;
  width: 100%;
}

.title {
  padding: 30px 40px 00px 40px;
}

.color {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}

.area {
  min-width: 200px;
  margin: 8px;
  display: flex;
  align-items: center;
}
</style>