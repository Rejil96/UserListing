<script setup>
const props = defineProps({currentUserData: Object})
</script>

<template>
  <div class="header">
    <p class="page-name">Profile</p>
    <div class="profile-info-container">
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
}

.profile-name{
    margin-right: 40px;
}
</style>
