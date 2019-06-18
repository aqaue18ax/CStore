<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
    </div>-->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
export default {};
</script>


<style>
@import "./css/normalize.css";
@import "./css/main.css";
@import "./css/icon.css";
@import "./css/fonts.css";

html,
body,
#app {
  height: 100%;
  font-family: "pingfang-light";
  color: #595757;
  background: #f5f5f5;
}
</style>