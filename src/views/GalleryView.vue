<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";

import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const response = ref("");
const route = useRoute();
const currentPath = route.path.split("/").pop();
const userId = route.params.id;
const allUsers = ref([]);
const currentUserData = ref([]);


onMounted(async () => {
    response.value = await fetch("https://panorbit.in/api/users.json");
    allUsers.value = await response.value.json();
    currentUserData.value = allUsers.value.users.filter(
      (eachData) => eachData.id == userId
    )[0];
})
</script>

<template>
  <div class="bg-wrapper-user-detail">
    <Sidebar :currentPath="currentPath" :userId="userId"/>
    <div class="user-details-container">
      <Header :currentUserData="currentUserData" :currentPath="currentPath"/>
      <div class="posts-container">
        <h1 class="info-panel">Gallery Empty</h1>
      </div>
    </div>
  </div>
</template>

<style >
.bg-wrapper-user-detail {
  width: 100vi;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
}

.info-panel{
    font-size: 78px;
    opacity: 0.2;
}

.posts-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-details-container {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>
