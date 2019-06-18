<template>
  <div class="brand flex flex-direction">
    <navBar :title="$route.meta.title" left-arrow @click-left="goBack" class="font-regular"></navBar>
    <div class="swiper flex-sub">
      <swiper :options="swiperOptionTop" ref="swiperTop">
        <swiper-slide :style="{'background-image': `url(${avatar})`}"></swiper-slide>
        <swiper-slide :style="{'background-image': `url(${avatar})`}"></swiper-slide>
        <swiper-slide :style="{'background-image': `url(${avatar})`}"></swiper-slide>
        <swiper-slide :style="{'background-image': `url(${avatar})`}"></swiper-slide>
      </swiper>

      <div class="thumbs">
        <div class="info text-df font-medium padding-sm">南宁品牌体验管 | 外景</div>
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide>
            <img :src="avatar" width="100%" height="100%">
          </swiper-slide>
          <swiper-slide>
            <img :src="avatar" width="100%" height="100%">
          </swiper-slide>
          <swiper-slide>
            <img :src="avatar" width="100%" height="100%">
          </swiper-slide>
          <swiper-slide>
            <img :src="avatar" width="100%" height="100%">
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import { NavBar } from "vant";
import avatar from "@/assets/outdoor.png";

export default {
  data() {
    return {
      avatar,
      images: [avatar, avatar],
      swiperOptionTop: {
        spaceBetween: 10,
        // loop: true,
        loopedSlides: 5
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  components: {
    NavBar,
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.brand {
  height: 100%;
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.thumbs {
  position: absolute;
  width: 100%;
  bottom: 140px;
  z-index: 2;
  height: 10% !important;
}

.info {
  color: #fff;
  z-index: 2;
}

.gallery-thumbs {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px 10px;
}

.gallery-thumbs .swiper-slide {
  width: 30%;
  /* height: 100%; */
  /* opacity: 0.4; */
}

/* .gallery-thumbs .swiper-slide-active {
  opacity: 1;
} */

.swiper-slide img {
  border: 2px solid #fff;
}

.swiper-slide-active img {
  border: 2px solid #34569b;
}

.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title,
.van-icon {
  color: #fff;
}
</style>