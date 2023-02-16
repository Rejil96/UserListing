<script setup>
import ListItem from '../components/ListItem/ListItem.vue'

import { ref, onMounted } from "vue";


const isLoading = ref(false);
const allUser = ref([]);


onMounted(async () => {
  isLoading.value = true;
  const response = await fetch("https://panorbit.in/api/users.json");
  allUser.value = await response.json();
  console.log(allUser.value.users);
});
</script>

<template>
  <div class="bg-container">
    <div class="user-card">
      <h1 class="card-heading">Select an account</h1>
      <ul v-for="user in allUser.users" :key="user.id">
            <ListItem :userData="user"/>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* styles for scroll bar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #bdbcbc;
}

::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}
/* styles for scroll bar */

.bg-container {
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

.card-heading {
  color: #151515;
  font-weight: 500;
  width: 100%;
  padding: 20px 0px;
  margin: 0px;
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.user-card {
  min-width: 50vw;
  height: 70vh;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #151515;
  box-shadow: -6px 2px 44px -6px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
}

ul {
  width: 100%;
  padding-left: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
}

</style>
