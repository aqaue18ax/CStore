<template>
  <panel type="attack" title="竞争对手统计" :data="data">
    <div slot="label" class="flex">
      <div class="flex align-center">
        <div class="color" style="background: #686cff"></div>预估销售额(万)
      </div>
      <div class="flex align-center">
        <div class="color" style="background: #e94c46"></div>竞争对手个数(个)
      </div>
    </div>
    <div class="pbody">
      <div class="select flex">
        <div class="btn margin-lr-xs" @click="onSelect('type')">
          {{types[select.type]}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <div class="btn margin-lr-xs" @click="onSelect('province')" v-if="select.type != 1">
          {{select.province}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>
        <!-- <div class="btn margin-lr-xs" @click="onSelect('year')">
          {{select.year}}
          <van-icon name="arrow-down" class="padding-left-xs" />
        </div>-->
      </div>

      <d-bar :data="data" :y="select.type == 1 ? 'name' : 'area'" />
    </div>

    <van-popup v-model="show" get-container="body" position="bottom">
      <van-picker
        :columns="types"
        v-if="type == 'type'"
        show-toolbar
        @cancel="show = false"
        @confirm="onConfirm"
        :default-index="select.type"
      />
      <van-area
        v-if="type == 'province'"
        :area-list="area"
        columns-num="1"
        @cancel="show = false"
        @confirm="onConfirm"
        :value="select.code.toString()"
      />
      <year @cancel="show = false" @confirm="onConfirm" v-if="type == 'year'" />
    </van-popup>
  </panel>
</template>

<script>
import Panel from "@/components/panel";
import dBar from "@/components/chart/dbar";
import area from "@/utils/area";
import Year from "@/components/picker/year";

export default {
  data() {
    return {
      types: ['区域', '市场'],
      data: [],
      select: {
        type: 0,
        province: "北京市",
        code: '110000',
        year: new Date().getFullYear()
      },
      area,
      show: false,
      type: ""
    };
  },

  computed: {},

  methods: {
    onPost() {
      this.$http
        .post("api/statistics/competitor", {
          area: this.select.code,
          type: this.types[this.select.type],
          // year: this.select.year
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
        case "type":
          this.select.type = i;
          break;
        case "province":
          this.select.province = v[0].name;
          this.select.code = v[0].code;
          break;
        case "year":
          this.select.year = v;
          break;
      }

      localStorage.competitor = JSON.stringify(this.select)
      this.onPost()
    }
  },

  async created () {
    if (!localStorage.competitor) {
      localStorage.competitor = JSON.stringify(this.select)
    } else {
      this.select = JSON.parse(localStorage.competitor)
    }

    await this.onPost()
  },

  components: {
    Panel,
    Year,
    dBar
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