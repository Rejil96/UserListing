<script setup>
import {useRouter} from 'vue-router'
const props = defineProps({ userData: Object });
const router = useRouter()

const onUserClick = (userId) => {
    router.push(`/user/${userId}/profile`)
}
</script>

<template>
  <li class="list-item" @click="onUserClick(props.userData.id)">
    <img :src="props.userData.profilepicture" class="profile-img" :alt="props.userData.username" />
    <p>{{ props.userData.name }}</p>
  </li>
</template>

<style scoped>

li {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-bottom: 1px solid #cfcfcf;
  padding-bottom: 20px;
  cursor: pointer;
}

.profile-img {
  width: 50px;
  border-radius: 50%;
  margin-right: 40px;
}
</style>
