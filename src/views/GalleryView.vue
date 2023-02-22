<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";
import { useThemeStore } from "../store/theme.js";
import { storeToRefs } from "pinia";

import { uid } from "uid";

import { ElButton, ElInput, ElForm, ElFormItem, ElSelect, ElOption } from "element-plus";

import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const imageUrl = ref("");
const captionText = ref("");
const galleryList = ref([]);

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

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
});

const onCreateGallery = () => {
  galleryList.value.push({
    id: uid(16),
    userId: userId,
    imageUrl: imageUrl.value,
    captionText: captionText.value,
    likeCount : 0
  });

  imageUrl.value = "";
  captionText.value = " ";
  console.log(galleryList.value);
};
</script>

<template>
  <div class="bg-wrapper-user-detail" :class="{ darkTheme: darkTheme }">
    <Sidebar :currentPath="currentPath" :userId="userId" />
    <div class="user-details-container">
      <Header :currentUserData="currentUserData" :currentPath="currentPath" />
      <div class="posts-container">
        <el-form class="custom-demo-form-inline">
          <el-form-item label="Image URL:" :class="{ 'custom-theme-label': darkTheme }">
            <el-input
              type="url"
              placeholder="Enter image URL"
              v-model="imageUrl"
              :class="{ 'custom-theme-bg': darkTheme }"
            />
          </el-form-item>
          <el-form-item label="Caption" :class="{ 'custom-theme-label': darkTheme }">
            <el-input
              :rows="2"
              type="textarea"
              placeholder="Enter the caption"
              v-model="captionText"
              :class="{ 'custom-theme-bg': darkTheme }"
            />
          </el-form-item>
          <div class="button-wrapper">
            <el-button
              type="primary"
              @click="onCreateGallery"
              :disabled="imageUrl.length < 6 || captionText.length < 6"
              >Add</el-button
            >
          </div>
        </el-form>

        <ul class="image-listing-container">
          <li class="image-card" v-for="item in galleryList">
          <div class="img-wrapper">
            <img :src="item.imageUrl" alt="gallery image" class="image-thumb" />
          </div>
            
            <div class="card-footer">
              <p class="caption-text">{{ item.captionText }}</p>
              <button class="like-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="posts-empty-container">
        <h1 class="info-panel" :class="{ 'theme-empty-color' : darkTheme}">Gallery Empty</h1>
      </div> -->
    </div>
  </div>
</template>

<style>
.bg-wrapper-user-detail {
  width: 100vi;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
}

.info-panel {
  font-size: 78px;
  opacity: 0.2;
}

.posts-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  padding-top: 60px;
}

.user-details-container {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.darkTheme {
  background-color: black;
}

.theme-empty-color {
  font-size: 78px;
  color: #ffffff;
  opacity: 0.2;
}

.custom-demo-form-inline {
  width: 70%;
  display: flex;
  flex-direction: column;
}

.button-wrapper {
  align-self: flex-end;
}

.custom-theme-label .el-form-item__label {
  color: #ffffff;
}

.custom-theme-bg .el-input__wrapper {
  background-color: #252424;
  box-shadow: 0 0 0 0px;
  color: #ffffff;
}

.custom-theme-bg .el-textarea__inner {
  background-color: #252424;
  color: #ffffff;
  box-shadow: 0 0 0 0px;
}

.custom-theme-bg .el-input__inner {
  background-color: #252424;
  color: #ffffff;
}

.image-listing-container {
  width: 100%;
  height: 54vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px;
  list-style: none;
  padding: 20px;
}

.image-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 250px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: 2px -1px 28px -3px rgba(0,0,0,0.26);
}

.image-thumb {
  width: 100%;
  height: 100%;
}

.img-wrapper{
  width: 100%;
  height: 80%;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0px 10px;
  height: 20%;
}

.like-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
