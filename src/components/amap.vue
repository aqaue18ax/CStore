<template>
  <div class="map">
    <el-amap ref="map" class="amap" :zoom="zoom" :zooms="[4, 19]" :center="center">
      <el-amap-marker
        vid="marker"
        v-for="store in stores"
        :key="store.id"
        :position="store.coordinate"
        :offset="[-28, -70]"
        :events="store.events"
      >
        <Pin :name="store.name" :cover="store.cover_url" :color="store.color" :type="type"/>
      </el-amap-marker>
      <el-amap-marker
        vid="marker"
        v-for="store in stores"
        :key="'name' + store.id"
        :position="store.coordinate"
        :offset="[-98, -102]"
      >
        <div class="title text-sm font-regular">
          <span :style="{background: store.color}">{{store.name}}</span>
        </div>
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import Pin from "@/components/pin";

export default {
  props: {
    type: String,
    stores: Array,
    zoom: {
      type: Number,
      default: 10
    },
    center: Array
  },
  data() {
    return {};
  },
  components: {
    Pin
  }
};
</script>

<style scoped>
.map {
  height: 100%;
}

.title {
  width: 375px;
  margin: 18px 0;
  text-align: center;
}

.title span {
  padding: 4px 10px;
  color: #fff;
  border-radius: 5px;
  box-shadow: 2px 3px 5px 0px rgba(92, 92, 92, 0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
