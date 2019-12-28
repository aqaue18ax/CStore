<template>
  <panel type="attack" title="竞争对手统计">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>预估销售额(亿)
      </div>
      <div class="flex align-center">
        <div class="color" style="background: #e94c46"></div>竞争对手个数(个)
      </div>
    </div>
    <div class="pbody">
      <div class="select flex">
        <div class="btn margin-lr-xs" @click="onSelect('type')">
          {{select.type}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('province')" v-if="select.type == '区域'">
          {{select.province}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('year')">
          {{select.year}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
      </div>

      <ve-bar
        height="180px"
        :legend-visible="false"
        :colors="['#686cff', '#e94c46']"
        :grid="{top: 5, bottom: 0}"
        :data="data"
      />
    </div>

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker :columns="['区域', '市场']" v-if="type == 'type'" show-toolbar @cancel="show = false" @confirm="onConfirm" />
      <van-area v-if="type == 'province'" :area-list="area" columns-num="1" @cancel="show = false" @confirm="onConfirm" />
      <year @cancel="show = false" @confirm="onConfirm" v-if="type == 'year'" />
    </van-popup>
  </panel>
</template>

<script>
import Panel from "@/components/panel";
import VeBar from "v-charts/lib/bar.common";
import area from "@/utils/area";
import Year from "@/components/picker/year";

export default {
  data() {
    return {
      columns: ["区域", "预估销售额", "竞争对手数量"],
      rows: [
        { 区域: "杭州", 预估销售额: 2.88, 竞争对手数量: 5 },
        { 区域: "温州", 预估销售额: 1.77, 竞争对手数量: 6 },
        { 区域: "宁波", 预估销售额: 2.6, 竞争对手数量: 4 },
        { 区域: "绍兴", 预估销售额: 1.57, 竞争对手数量: 3 },
        { 区域: "台州", 预估销售额: 1.48, 竞争对手数量: 4 }
      ],
      select: {
        type: "区域",
        province: "北京市",
        year: new Date().getFullYear()
      },
      area,
      show: false,
      type: ""
    };
  },

  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    }
  },

  methods: {
    onSelect(type) {
      this.show = true;
      this.type = type;
    },
    onConfirm(v, i) {
      this.show = false;

      switch (this.type) {
        case "type":
          this.select.type = v;
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

  components: {
    Panel,
    VeBar,
    Year
  }
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