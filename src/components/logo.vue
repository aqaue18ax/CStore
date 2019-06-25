<template>
  <div class="logo" v-if="$root.logo">
    <img src="../assets/logo.png">
  </div>
</template>

<style scoped>
.logo {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

img {
  width: 220px;
}
</style>
