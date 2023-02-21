<script setup>
import { ElButton} from "element-plus";
import { Delete} from "@element-plus/icons-vue";

import {useThemeStore} from '../../store/theme.js'
import {storeToRefs} from 'pinia'

const props = defineProps({postData: Object, currentUserId: String})
const emit = defineEmits(["onDelete"])

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

const onDeletePost = (postId) => {
    emit("onDelete", postId)
}
</script>

<template>
    <div class="post-card" :class="{'theme-post-content' : darkTheme}">
          <div class="post-card-header" :class="{'theme-post-header' : darkTheme}">
            <div class="user-info-section">
              <img :src="props.postData.profilePicture" :alt="props.postData.username" class="post-user-img"/>
              <p class="username-info" :class="{'theme-text' : darkTheme}">{{ props.postData.username }}</p>
            </div>
            <div class="post-control-container">
              <p class="created-date" :class="{'theme-text' : darkTheme}">{{ new Date().toLocaleDateString("en-US") }}</p>
              <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    class="custom-bg-post-btn"
                    :disabled="props.postData.userId != props.currentUserId"
                    @click="onDeletePost(props.postData.id)"
                  />
            </div>
           
          </div>
            <p class="post-title" :class="{'theme-text-title' : darkTheme}">{{ props.postData.postTitle }}</p>
            <p class="post-content-section" :class="{'theme-text-content' : darkTheme}">{{ props.postData.postContent }}</p>
        </div>
</template>

<style scoped>
.post-card{
  width: 260px;
  height: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 34px -6px rgba(0,0,0,0.18);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow-y: auto;
}

.post-card-header{
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height:34px;
  background-color: rgb(230, 255, 247);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info-section{
  width: 50px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.post-title{
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  margin: 20px 0px;
  word-wrap: break-word;

}
.post-user-img{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.username-info{
  font-size: 12px;
  color: #383838;
}

.created-date{
  font-size: 12px;
  color: #383838;
  padding-right: 5px;
}

.post-control-container{
  display: flex;
  align-items: center;
}

.custom-bg-post-btn{
  background-color: transparent;
  border: none;
  color: #d21b1b;
  font-weight: bold;
}

.post-content-section{
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  font-size: 14px;
  color: #6a6a6a;
  word-wrap: break-word;
}

.theme-post-header{
  background-color: #2c2c2c;
}

.theme-text{
  color: #dadada;
}

.theme-text-title{
  color: #fefefe;
}

.theme-text-content{
  color: #dad8d8;
}

.theme-post-content{
  background-color: #1a1919;
}
</style>