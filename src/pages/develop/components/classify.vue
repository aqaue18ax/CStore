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
      provinces: [],
      cities: [],
      data: [],

      agency: 0,
      province: 'all',
      city: 'all'
    };
  },
  computed: {
    agencies() {
      return this.$parent.agencies;
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
        this.city = e.code
        this.post();
      }
    },

    changeAgency(id) {
      api.province(id, 1).then(data => {
        this.provinces = data;

        this.agency = id;
        this.province = data[0].code;

        this.changeProvince(data[0].code);
      });
    },
    changeProvince(code) {
      this.province = code;
      api.city(code, 1).then(data => {

        this.cities = data;
        this.city = data[0].code;

        this.post();
      });
    },
    post() {
      this.$http.get(`api/store/count2/${this.agency}/${this.province}/${this.city}`).then(data => {
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
