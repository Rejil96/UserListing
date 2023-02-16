<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({currentUserData: Object, currentPath:String})
const showLogout = ref(false)

const onHoverProfile = () => {
  showLogout.value = !showLogout.value
}

const onLogoutClick = () => {
  router.push("/")
  showLogout.value = false
}

const onClickClose = () => {
  showLogout.value = false
}
</script>

<template>
  <div class="header">
        <div class="profile-pop-card" v-if="showLogout">
          <img :src="props.currentUserData.profilepicture"
        :alt="props.currentUserData.username" class="user-logout-img" />
        <p>{{ props.currentUserData.name }}</p>
          <div class="button-wrapper">
            <button class="close-btn" @click="onClickClose">Close</button>
            <button class="logout-btn" @click="onLogoutClick">Logout</button>
          </div>
        </div>


    <p class="page-name">{{ props.currentPath.toUpperCase() }}</p>
    <div class="profile-info-container" @click="onHoverProfile">
      <img
        :src="props.currentUserData.profilepicture"
        :alt="props.currentUserData.username"
        class="profile-icon"
      />
      <p class="profile-name">{{ props.currentUserData.username }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-pop-card{
  position: absolute;
  top: 80px;
  right: 20px;
  width: 300px;
  height:300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: -1px 1px 41px 0px rgba(0,0,0,0.55);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header{
    width: 92%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 10px 40px;
    border-bottom: 1px solid #bababa;

}
.page-name{
    font-weight: 600;
    font-size: 24px;
    color: rgb(36, 36, 36);
}

.profile-icon{
    width: 40px; 
    border-radius: 50%;
    margin-right: 20px;
}

.profile-info-container{
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-name{
    margin-right: 40px;
}

.button-wrapper{
  width: 60%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn{
  width: 180px;
  height: 40px;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  background-color: blueviolet;
  color: #ffffff;
  cursor: pointer;
}

.logout-btn{
  width: 180px;
  height: 40px;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e13232;
  margin-left: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.user-logout-img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>
