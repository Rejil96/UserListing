<script setup>
import { RouterView } from "vue-router";
</script>

<template>
   <main>
    <div class="bg-container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.bg-container{
  width: 100vw;
}
</style>
