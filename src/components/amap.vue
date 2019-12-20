<template>
  <div class="map">
    <el-amap ref="map" class="amap" :zoom="zoom" :zooms="[8, 18]" :center="center" :events="events">
      <el-amap-marker
        vid="marker"
        v-for="store in stores"
        :key="store.id"
        :position="store.coordinate"
        :offset="[-21 * z / 16, -54 * z / 16]"
        :events="store.events"
      >
        <Pin :name="store.name" :cover="store.cover" :color="store.color" :type="type" :zoom="(z / 16)"/>
      </el-amap-marker>
      <el-amap-marker
        vid="marker"
        v-for="store in stores"
        :key="'name' + store.id"
        :position="store.coordinate"
        :offset="[-85 * z / 15, -92 * z / 16]"
      >
        <div class="title text-sm font-regular" :style="{transform: `scale(${z / 16})`, 'transform-origin': z >= 16 ? 'center' : 'left'}">
          <span :style="{background: store.color}">{{store.name}}</span>
        </div>
      </el-amap-marker>
      <div v-if="z >= 14 && !range.length">
        <el-amap-polygon v-for="(store, index) in stores" :key="index" :vid="index" :ref="`polygon_${index}`" :path="store.range" strokeStyle="dashed" strokeColor="#f8403a" fillOpacity="0"></el-amap-polygon>
      </div>
      <div v-if="z >= 14 && range.length">
        <el-amap-polygon :ref="`polygon`" :path="range" strokeStyle="dashed" strokeColor="#f8403a" fillOpacity="0"></el-amap-polygon>
      </div>
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
      default: 14
    },
    center: Array,
    range: Array
  },
  data() {
    return {
      events: {
        zoomend: () => {
          this.z = this.$refs.map.$$getInstance().getZoom()
        }
      },
      z: 12
    };
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
