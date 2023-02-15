<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute();
const userId = route.params.id;
const allUsers = ref([])
const currentUserData = ref([])

onMounted(async () => {
    const response = await fetch("https://panorbit.in/api/users.json")
    allUsers.value = await response.json()
    currentUserData.value = allUsers.value.users.filter(eachData => eachData.id == userId)[0]
    
})

</script>

<template>
    <div class="user-details-container">
        <div class="header">
            <p class="page-name">Profile </p>
            <div class="profile-info-container">
                <img :src="currentUserData.profilepicture" :alt="currentUserData.username" class="profile-icon"/>
                <p class="profile-name">{{ currentUserData.username }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-details-container{
    width: 100%;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.page-name{
    font-weight: 600;
    font-size: 24px;
    color: rgb(36, 36, 36);
}

.header{
    width: 96%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 10px 40px;

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