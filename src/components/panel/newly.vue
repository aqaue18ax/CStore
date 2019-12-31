<template>
  <panel type="chart" title="新增门店数排名" :data="data">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>新增门店数量（家）
      </div>
    </div>

    <div class="pbody">
      <div class="select flex">
        <div class="btn margin-lr-xs" @click="onSelect('province')">
          {{select.province}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('store')">
          {{stores[select.store]}}
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
      <van-picker
        :columns="stores"
        v-if="type == 'store'"
        show-toolbar
        @cancel="show = false"
        @confirm="onConfirm"

        :default-index="select.store"
      />
      <van-area
        v-if="type == 'province'"
        :area-list="area"
        :value="select.code"
        columns-num="1"
        @cancel="show = false"
        @confirm="onConfirm"
      />
      <year @cancel="show = false" @confirm="onConfirm" v-if="type == 'year'" :value="select.year" />
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
      data: [],
      stores: [
        "品牌体验馆",
        "电气工业超市",
        "SI专卖店",
        "二级形象店",
        "二级门招",
        "二级货架",
        "正泰岗亭",
        "户外广告"
      ],
      select: {
        province: "北京市",
        store: 0,
        code: 110000,
        year: new Date().getFullYear()
      },
      area,
      show: false,
      type: ""
    };
  },

  components: {
    Panel,
    CharBar,
    Year
  },

  methods: {
    onPost() {
      this.$http
        .post("api/statistics/newStore", {
          area: this.select.code,
          type: this.stores[this.select.store],
          year: this.select.year
        })
        .then(data => {
          this.data = data.sort((a, b) => {
            return b.value - a.value
          });
        });
    },
    onSelect(type) {
      this.show = true;
      this.type = type;
    },
    onConfirm(v, i) {
      this.show = false;

      switch (this.type) {
        case "store":
          this.select.store = i;
          break;
        case "province":
          this.select.province = v[0].name;
          this.select.code = v[0].code;
          break;
        case "year":
          this.select.year = v;
          break;
      }

      localStorage.newly = JSON.stringify(this.select)
      this.onPost();
    }
  },

  async created() {
    if (!localStorage.newly) {
      localStorage.newly = JSON.stringify(this.select)
    } else {
      this.select = JSON.parse(localStorage.newly)
    }

    this.onPost();
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