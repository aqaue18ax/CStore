<template>
  <div class="notice">
    <navBar :title="title" :left-arrow="true" @click-left="$router.back()" class="font-regular"></navBar>
    <cell-group class="font-regular margin-tb-xs padding">
      <div class="title padding-bottom-xs">终端建设项目： {{notice.item}}</div>
      <div class="title padding-bottom-xs">促销活动：{{notice.promotion}}</div>
      <div class="title padding-bottom-xs">其他：{{notice.other}}</div>
      <div style="text-align: center;"><vimage fit="contain" :src="notice.file_url" /></div>
    </cell-group>
  </div>
</template>

<script>
import { NavBar, CellGroup,Image  } from "vant";
export default {
  name: "notice",
  components: {
    NavBar,
    CellGroup,
    vimage: Image 
  },
  data() {
    return {
      title: "竞品信息",
      notice: []
    };
  },
  computed:{
    noticeItem(){
      return this.$store.state.notice
    }
  },
  mounted(){
    const id = parseInt(this.$route.params.id);
    this.notice = this.noticeItem.find(item => item.id == id)
  }
};
</script>

<style scoped>
.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title {
  color: #fff;
}

.van-nav-bar .van-icon {
  color: #fff;
}
</style>