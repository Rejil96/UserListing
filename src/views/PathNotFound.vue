<script setup>
import { useThemeStore } from "../store/theme.js";
import { storeToRefs } from "pinia";



const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

</script>

<template>
  <div class="path-not-found-container">
    <h1 class="main-heading-top" :class="{'custom-color': darkTheme}">404</h1>
    <h1 class="main-heading" :class="{'custom-color': darkTheme}">Not Found</h1>
    <p class="sub-text-info" :class="{'custom-color-description': darkTheme}">Oops! The page you are looking for cannot be found.</p>
  </div>
</template>

<style scoped>
.path-not-found-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("../assets/svg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
}

.main-heading {
  font-size: 42px;
  font-weight: bolder;
  text-align: center;
  opacity: 0.8;
}

.sub-text-info {
  text-align: center;
}

.main-heading-top{
    font-size: 80px;
    opacity: 0.6;
}

.custom-color{
  color: rgba(255, 255, 255, 0.6);
}

.custom-color-description{
  color: rgb(254, 254, 254, 0.7);
}
</style>
