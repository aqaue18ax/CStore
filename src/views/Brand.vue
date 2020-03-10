<template>
  <div class="brand flex flex-direction">
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <div class="error text-center padding-top-xl" v-if="!images.length">
      <icon name="failure" size="8rem" color="#c0c0c2" />
      <div>没有相关数据</div>
    </div>

    <div class="swiper flex-sub" v-if="images.length">
      <swiper :options="swiperOptionTop" ref="swiperTop" @slideChange="onChange">
        <!-- <swiper-slide
          v-for="image in images"
          :key="image.id"
          :style="{'background': `url(${image.img}) center center no-repeat;`, 'width': '100%'}"
          @click.native="open(image.url)"
        ></swiper-slide>-->

        <swiper-slide
          v-for="image in images"
          :key="image.id"
          class="flex align-center"
          @click.native="open(image.url)"
        >
          <img :src="image.img" style="width: 100%; height: auto;" />
        </swiper-slide>
      </swiper>

      <div class="thumbs" v-if="images.length">
        <div class="info text-df font-medium padding-lr-sm">{{name}}</div>
        <div
          class="info text-df font-medium padding-lr-sm padding-top-sm"
          v-html="desc"
        ></div>
        <swiper
          :options="swiperOptionThumbs"
          class="gallery-thumbs"
          ref="swiperThumbs"
          @slideChange="onChange"
        >
          <swiper-slide v-for="image in images" :key="image.id">
            <img class="border" :src="image.img" width="100%" :height="height + 'px'" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import { NavBar, Icon } from "vant";

export default {
  data() {
    return {
      height: 0,
      name: "",
      images: [],
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5
      },
      swiperOptionThumbs: {
        loopedSlides: 5,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        loop: true,
        slideToClickedSlide: true
      },
      activeIndex: 1,
      description: "11111111"
    };
  },
  methods: {
    open(url) {
      if (url) {
        window.open(url);
      }
    },
    onChange() {
      const swiper = this.$refs.swiperThumbs.swiper;
      const index = swiper.activeIndex % this.images.length;
      if (this.images[index]) {
        this.description = this.images[index].description || "";
      }
    }
  },
  computed: {
    desc() {
      return this.description.replace(/\n/g, "<br/>")
    }
  },
  components: {
    Icon,
    NavBar,
    swiper,
    swiperSlide
  },
  async created() {
    this.height = window.innerWidth * 0.3 * 0.618

    const id = this.$route.params.id;
    await this.$http.get(`api/store/${id}`).then(data => {
      this.name = data.name;
      this.images = data.images;
      this.description = this.images[0].description || "";

      if (data.images.length) {
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper;
          const swiperThumbs = this.$refs.swiperThumbs.swiper;
          swiperTop.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperTop;
        });
      }
    });
  }
};
</script>

<style scoped>
.brand {
  height: 100%;
}

.swiper {
  background: #000;
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
  bottom: 0;
  z-index: 2;
}

.info {
  color: #fff;
  z-index: 2;

  text-shadow: 1px 1px 0 #000, -1px -1px 0 #000;

  word-wrap: break-word;
  word-break: break-all;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

.gallery-thumbs {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px 10px;
}

.gallery-thumbs .swiper-slide {
  width: 30%;
  /* height: 60%; */
  /* height: 100%; */
  /* opacity: 0.4; */
}

/* .gallery-thumbs .swiper-slide-active {
  opacity: 1;
} */

.thumbs .swiper-slide img {
  border: 2px solid #fff;
}

.thumbs .swiper-slide-active img {
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