<template>
  <panel type="memory" title="销售额统计">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>预估销售额（亿）
      </div>
    </div>

    <div class="pbody">
      <div class="select flex">
        <div class="btn margin-lr-xs" @click="onSelect('province')">
          {{select.province}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('year')">
          {{select.year}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
      </div>
    </div>

    <char-bar :data="data" />

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-area
        v-if="type == 'province'"
        :area-list="area"
        value="100000"
        columns-num="1"
        @cancel="show = false"
        @confirm="onConfirm"
      />
      <year @cancel="show = false" @confirm="onConfirm" v-if="type == 'year'" />
    </van-popup>
  </panel>
</template>

<script>
import Panel from "@/components/panel";
import Year from "@/components/picker/year";
import CharBar from "@/components/chart/bar";
import area from "@/utils/area";

export default {
  data() {
    return {
      data: [
        { area: "杭州", value: 2 },
        { area: "绍兴", value: 1.65 },
        { area: "温州", value: 1.9 },
        { area: "绍兴", value: 1.65 },
        { area: "温州", value: 1.9 },
        { area: "温州", value: 1.9 },
        { area: "绍兴", value: 1.65 },
        { area: "宁波", value: 1.8 },
        { area: "温州", value: 1.9 },
        { area: "绍兴", value: 1.65 },
        { area: "温州", value: 1.9 },
        { area: "温州", value: 1.9 },
        { area: "绍兴", value: 1.65 },
        { area: "温州", value: 1.9 },
        { area: "绍兴", value: 1.65 },
        { area: "温州", value: 1.9 },
        { area: "台州", value: 1.5 }
      ],
      select: {
        province: "全国",
        year: new Date().getFullYear()
      },
      show: false,
      type: ""
    };
  },

  computed: {
    area() {
      return {
        province_list: Object.assign({ "100000": "全国" }, area.province_list),
        city_list: area.city_list,
        county_list: area.county_list
      };
    }
  },

  components: {
    Panel,
    CharBar,
    Year
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