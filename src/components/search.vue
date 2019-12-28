<template>
  <div class="search-box">
    <div class="search flex justify-between radius">
      <div
        class="area font-medium radius bg-gray text-sm flex align-center justify-center"
        @click="isShowPicker = !isShowPicker"
      >
        <div class="padding-right-xs">{{area.text}}</div><icon name="arrow-down"/>
      </div>
      <div class="input radius bg-gray flex align-center">
        <input
          type="text"
          name="search"
          class="text-lg text-gray"
          placeholder="请输入关键字搜索"
          v-model="search"
        >
        <div class="text-sm btn-search" @click="onSubmit">搜索</div>
      </div>
    </div>

    <Area
      :areaList="area.data"
      @onHide="isShowPicker = false"
      v-show="isShowPicker"
      radius
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { Icon } from "vant";
import data from "@/utils/area";
import Area from "@/components/area";

export default {
  data() {
    return {
      search: "",
      area: {
        data: data,
        text: "区域搜索",
        code: "000000"
      },
      isShowPicker: false
    };
  },
  components: {
    Icon,
    Area
  },
  methods: {
    confirm(data) {
      let that = this;
      this.area.text = "区域搜索";
      this.area.code = "000000";
      data.map(area => {
        if (area.name == "请选择") return;
        that.area.text = area.name;
        that.area.code = area.code;
      });

      this.$http.get(`api/area/${this.area.code}`).then(data => {
        this.$root.center = [data.lng, data.lat];
        localStorage.setItem("lat&lng", JSON.stringify([data.lng, data.lat]));
        localStorage.setItem("area", this.area.code);
        this.isShowPicker = false;
      });
    },
    onSubmit() {
      this.isShowPicker = false;
      this.$emit("onSearch", { search: this.search, code: this.area.code });
    }
  },
  created() {
    let search = this.$route.query.search;
    let code = localStorage.getItem("area");

    if (code) {
      code = code.toString();
      const province = code.slice(0, 2).padEnd(6, 0);
      const city = code.slice(0, 4).padEnd(6, 0);
      const county = code;
      this.area.text = data.province_list[province] || this.area.text;
      this.area.text = data.city_list[city] || this.area.text;
      this.area.text = data.county_list[county] || this.area.text;
    }

    this.search = search || "";
  }
};
</script>

<style scoped>
.search-box {
  width: 100%;
  position: absolute;
  top: 100px;
  z-index: 1;
}

.search {
  padding: 15px;
  margin: 0 auto;
  width: 650px;

  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.area {
  width: 200px;
  height: 65px;
}

.area > div, i {
  height: 40px;
  display: flex;
  align-items: center;
}

.input {
  width: 420px;
  height: 65px;
  padding-left: 20px;
  /* line-height: 65px; */
}

@media (max-width: 320px) {
  .search {
    width: 100%;
    box-sizing: border-box;
  }

  .area {
    width: 180px;
    overflow: hidden;
  }

  .input {
    width: 355px;
  }
}

.btn-search {
  height: 40px;
  line-height: 40px;
  width: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid rgba(0,0,0,.7);
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 65px;
  line-height: 50px;
  margin: 0;
  padding: 0;
  color: #323233;
  background-color: transparent;
  border: 0;
  resize: none;
}

.van-icon {
  vertical-align: middle;
}

.picker {
  margin: 0 auto;
  margin-top: 20px;
  width: 680px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  height: 100%;
  background: #fff;
}

@media (max-width: 320px) {
  .picker {
    width: 100%;
  }
}

.btn {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
