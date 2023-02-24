<script setup></script>

<template>
  <div class="path-not-found-container">
    <h1 class="main-heading">404</h1>
    <h1 class="main-heading">Not Found</h1>
    <p class="sub-text-info">Oops! The page you are looking for cannot be found.</p>
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
}

.sub-text-info {
  text-align: center;
}
</style>
