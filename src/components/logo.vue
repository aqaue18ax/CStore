<template>
  <div class="logo" v-if="$root.logo">
    <img src="../assets/logo2.png">
  </div>
</template>

<style scoped>
.logo {
  position: absolute;
  top: 0;
  left: 10%;
}

img {
  width: 138px;
}
</style>
