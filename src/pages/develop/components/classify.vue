<template>
  <panel type="classify" title="门店分类统计">
    <div class="pbody flex flex-wrap">
      <agency :columns="agencies" @confirm="confirm" />
      <province :columns="provinces" @confirm="confirm" />
      <city :columns="cities" @confirm="confirm" />
    </div>

    <div class="flex flex-wrap text-sm">
      <div class="area" v-for="v in data" :key="v.name">
        <div class="color" :style="{background: v.color}"></div>
        {{v.name}} {{v.count}}
      </div>
    </div>
  </panel>
</template>

<script>
import api from "../api";

import Panel from "./_/panel";

import Agency from "./_/agency";
import Province from "./_/province";
import City from "./_/city";

export default {
  data() {
    return {
      mProvinces: [],
      cities: [],
      data: [],

      province: 110000,
      city: 110100
    };
  },
  computed: {
    agencies() {
      return this.$parent.agencies;
    },
    provinces() {
      return this.mProvinces.length > 0
        ? this.mProvinces
        : this.$parent.provinces;
    }
  },
  components: {
    Panel,

    Agency,
    Province,
    City
  },
  methods: {
    confirm(e) {
      if (e.type == "agency") {
        this.changeAgency(e.id);
      }

      if (e.type == "province") {
        this.changeProvince(e.code);
      }

      if (e.type == "city") {
        this.post(e.code);
      }
    },

    changeAgency(id) {
      if (id == 0) this.mProvinces = [];

      api.province(id).then(data => {
        this.mProvinces = data;
        this.changeProvince(data[0].code);
      });
    },
    changeProvince(code) {
      api.city(code).then(data => {
        this.cities = data;
        this.post(data[0].code);
      });
    },
    post(code) {
      this.$http.get(`api/store/count/${code}`).then(data => {
        this.data = data;
      });
    }
  },
  created() {
    this.changeAgency(0);
  }
};
</script>

<style scoped>
.color {
  width: 25px;
  height: 25px;
  margin: 0 12px;
}

.area {
  min-width: 200px;
  margin: 8px;
  display: flex;
  align-items: center;
}

.area .color {
  margin: 0;
  margin-right: 8px;
}

@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
  .area {
    min-width: 46%;
    margin: 8px;
  }
}
</style>
