<script setup>
import { RouterView } from "vue-router";
import { useThemeStore } from "./store/theme.js";
import { storeToRefs } from "pinia";

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

</script>

<template>
   <main>
    <div class="bg-container" :class="{'darkTheme': darkTheme}">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.bg-container{
  width: 100vw;
  min-height: 100vh;
  margin: 0px;
  border: 0px; 
}

.darkTheme {
  background-color: black;
}
</style>
