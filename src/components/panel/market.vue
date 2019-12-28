<template>
  <panel type="pie" title="市场开发统计">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>区域门店数量（家）
      </div>
    </div>

    <div class="pbody">
      <div class="select flex">
        <div class="btn margin-lr-xs" @click="onSelect('province')">
          {{select.province}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('store')">
          {{select.store}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
      </div>
    </div>

    <char-bar :data="data" />

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker :columns="stores" v-if="type == 'store'" show-toolbar @cancel="show = false" @confirm="onConfirm" />
      <van-area v-if="type == 'province'" :area-list="area" columns-num="1" @cancel="show = false" @confirm="onConfirm" />
    </van-popup>
  </panel>
</template>

<script>
import Panel from "@/components/panel";
import CharBar from "@/components/chart/bar";
import area from "@/utils/area";

export default {
  data() {
    return {
      data: [
        { area: "杭州", value: 302 },
        { area: "温州", value: 312 },
        { area: "宁波", value: 231 },
        { area: "绍兴", value: 278 },
        { area: "台州", value: 212 }
      ],
      stores: ['品牌体验馆', '电器工业超市', 'SI专卖店', '二级形象店', '二级门招', '二级货架', '正泰岗亭', '户外广告'],
      select: {
        province: "北京市",
        store: '品牌体验馆'
      },
      area,
      show: false,
      type: ''
    };
  },

  components: {
    Panel,
    CharBar
  },

  methods: {
    onSelect(type) {
      this.show = true;
      this.type = type;
    },
    onConfirm(v) {
      this.show = false;

      switch (this.type) {
        case "store":
          this.select.store = v;
          break;
        case "province":
          this.select.province = v[0].name;
          break;
        case "year":
          this.select.year = v;
          break;
      }
    }
  },

};
</script>

<style scoped>
.color {
  width: 25px;
  height: 25px;
  margin: 0 12px;
}

.select {
  padding: 0px 20px 12px 20px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: auto;
  height: 40px;

  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
}
</style>