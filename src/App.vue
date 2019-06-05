<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
@import './css/normalize.css';
@import './css/fonts.css';

html, body, #app {
  height: 100%;
  font-family: 'pingfang-light';
}
</style>
