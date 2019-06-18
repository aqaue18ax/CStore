<template>
  <div class="map">
    <el-amap class="amap" :zoom="zoom" :zooms="[10, 19]" :center="center">
      <el-amap-marker
        vid="marker"
        v-for="(store, index) in stores"
        :position="store.coordinate"
        :offset="[-98, -102]"
        :events="store.events"
      >
        <Pin :name="store.name" :cover="store.cover_url" :color="store.color"/>
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapState, mapActions } from "vuex";
import Pin from "@/components/pin";

export default {
  props: {
    stores: Array,
    zoom: {
      type: Number,
      default: 10
    },
    center: Array
  },
  methods: {
    ...mapActions({
      onPin: "map/pin"
    })
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
</style>
