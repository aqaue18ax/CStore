<template>
  <div class="location">
    <div class="flex justify-center flex-direction align-center">
      <div class="store" :style="{background: color}">
        <img :src="cover || avatar" width="43" height="43">
      </div>
      <div class="pulse"></div>
    </div>
    <!-- <div class="flex justify-center flex-direction align-center" v-else>
      <div class="market":style="{'border-color': color}" ></div>
      <div class="pulse"></div>
    </div>-->
  </div>
</template>

<script>
import avatar from "../assets/avatar.png";

export default {
  props: {
    type: String,
    name: String,
    cover: String,
    color: {
      type: String,
      default: "#00cae9"
    }
  },
  data() {
    return {
      avatar
    };
  }
};
</script>

<style scoped>
.store {
  width: 88px;
  height: 88px;
  border-radius: 50% 50% 50% 5px;
  border: 1px solid #fff;
  transform: rotate(-45deg);
  padding: 8px;
}

.market {
  /* width: 40px;
  height: 40px; */
  border: 10px solid #fff;
  border-radius: 50% 50% 50% 5px;
  transform: rotate(-45deg);
  padding: 8px;
}

/* .market::after {
  background: #fff;
  width: 40px;
  height: 40px;
} */

/* .pin:before {
  content: "";
  width: 88px;
  height: 88px;
  background: #00cae9;
  border-radius: 50% 50% 50% 0;
  margin: 10px 0 0 0;
  position: absolute;
  transform: rotate(-45deg);
  z-index: -1;
} */

img {
  width: 80px;
  border: 2px solid #fff;
  transform: rotate(45deg);
  border-radius: 100%;
}

.pulse {
  opacity: 0.3;
  background: black;
  border-radius: 50%;
  height: 34px;
  width: 34px;
  /* position: absolute;
  bottom: 1px; */
  /* left: 50%;
  top: 50%; */
  transform: rotateX(55deg);
  z-index: -2;
}

/* .location {
  position: absolute;
  left: -187.5px;
  width: 407px;
  text-align: center;
}

.title {
  position: relative;
  padding: 6px 12px;
  background: #00cae9;
  color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  top: -80px;
}

.pin {
  width: 80px;
  height: 80px;
  border-radius: 50% 50% 50% 0;
  background: #00cae9;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: 0 auto;
  margin: -40px 0 0 -25px;
  padding: 10px;
} */

/* img {
  border-radius: 50%;
  transform: rotate(45deg);
} */

/* .pin:after {
  content: "";
  width: 14px;
  height: 14px;
  margin: 8px 0 0 8px;
  background: #fff;
  position: absolute;
  border-radius: 50%;
} */

/* .pulse {
  background: #d6d4d4;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: rotateX(55deg);
  z-index: -2;
}
.pulse:after {
  content: "";
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  margin: -13px 0 0 -13px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
  box-shadow: 0 0 1px 2px #00cae9;
  animation-delay: 1.1s;
} */
</style>