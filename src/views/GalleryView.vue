<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";
import { useThemeStore } from "../store/theme.js";
import { storeToRefs } from "pinia";

import { Delete } from "@element-plus/icons-vue";

import { uid } from "uid";

import { ElButton, ElInput, ElForm, ElFormItem, ElSelect, ElOption } from "element-plus";

import { ref, onMounted, watch } from "vue";
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

const filterConstants = ["All", "My Images"];
const currentFilterCondition = ref(filterConstants[0]);

onMounted(async () => {
  response.value = await fetch("https://panorbit.in/api/users.json");
  allUsers.value = await response.value.json();
  currentUserData.value = allUsers.value.users.filter(
    (eachData) => eachData.id == userId
  )[0];

  onPreLoadFromLs();
});

watch(currentFilterCondition, () => {
  if (currentFilterCondition.value === "My Images") {
    galleryList.value = galleryList.value.filter((eachData) => eachData.userId == userId);
  } else {
    galleryList.value = JSON.parse(localStorage.getItem("gallery"));
  }
});

const onCreateGallery = () => {
  galleryList.value.push({
    id: uid(16),
    userId: userId,
    imageUrl: imageUrl.value,
    captionText: captionText.value,
    likedUserIds: [],
    userProfileImg: currentUserData.value.profilepicture,
    imgUsername: currentUserData.value.username,
  });
  localStorage.setItem("gallery", JSON.stringify(galleryList.value));
  imageUrl.value = "";
  captionText.value = "";
  console.log(galleryList.value);
};

const onLike = (imageId) => {
  galleryList.value = galleryList.value.map((eachData) => {
    if (eachData.id === imageId) {
      console.log(eachData.likedUserIds.includes(userId));
      if (eachData.likedUserIds.includes(userId)) {
        const filteredUserIdList = eachData.likedUserIds.filter(
          (eachUserId) => eachUserId != userId
        );
        return { ...eachData, likedUserIds: filteredUserIdList };
      } else {
        return { ...eachData, likedUserIds: [...eachData.likedUserIds, userId] };
      }
    }

    return eachData;
  });
  localStorage.setItem("gallery", JSON.stringify(galleryList.value));
};

const onPreLoadFromLs = () => {
  if (localStorage.getItem("gallery")) {
    galleryList.value = JSON.parse(localStorage.getItem("gallery"));
  } else {
    localStorage.setItem("gallery", JSON.stringify(galleryList.value));
  }
};

const onDeleteImages = (imageId) => {
  const filteredImages = JSON.parse(localStorage.getItem("gallery")).filter(
    (eachData) => eachData.id !== imageId
  );
  localStorage.setItem("gallery", JSON.stringify(filteredImages));
  galleryList.value =
    currentFilterCondition.value === "All"
      ? filteredImages
      : filteredImages.filter((eachData) => eachData.userId == userId);
};
</script>

<template>
  <div class="bg-wrapper-user-detail" :class="{ darkTheme: darkTheme }">
    <Sidebar :currentPath="currentPath" :userId="userId" class="custom-show" />
    <div class="user-details-container">
      <Header
        :currentUserData="currentUserData"
        :currentPath="currentPath"
        :userId="userId"
      />
      <div class="posts-container">
        <el-form class="custom-demo-form-inline">
          <el-form-item
            label="Image URL:"
            :class="{ 'custom-theme-label': darkTheme }"
            class="mobile-wrapper"
          >
            <el-input
              type="url"
              placeholder="Enter image URL"
              v-model="imageUrl"
              :class="{ 'custom-theme-bg': darkTheme }"
              class="gallery-input-control"
            />
          </el-form-item>
          <el-form-item
            label="Caption:"
            :class="{ 'custom-theme-label': darkTheme }"
            class="mobile-wrapper"
          >
            <el-input
              :rows="2"
              type="textarea"
              placeholder="Enter the caption"
              v-model="captionText"
              :class="{ 'custom-theme-bg': darkTheme }"
              class="gallery-input-control"
            />
          </el-form-item>
          <div class="button-wrapper">
            <el-button
              type="primary"
              class="mobile-add-btn"
              @click="onCreateGallery"
              :disabled="imageUrl.length < 6 || captionText.length < 6"
              >Add</el-button
            >
          </div>
        </el-form>

        <div class="filter-panel">
          <el-select
            v-model="currentFilterCondition"
            class="m-2 custom-filter-panel"
            placeholder="Select"
            size="large"
            :class="{ 'custom-theme-bg': darkTheme }"
          >
            <el-option
              v-for="item in filterConstants"
              :key="item"
              :label="item"
              :value="item"
              :class="{ 'custom-theme-bg': darkTheme }"
            />
          </el-select>
        </div>

        <TransitionGroup
          name="list"
          tag="ul"
          class="image-listing-container"
          v-if="galleryList.length > 0"
        >
          <li class="image-card" v-for="item in galleryList">
            <div class="img-wrapper">
              <img :src="item.imageUrl" alt="gallery image" class="image-thumb" />
            </div>

            <div class="card-footer">
              <p class="caption-text">{{ item.captionText }}</p>
              <div class="image-control-wrapper">
                <button
                  class="like-btn"
                  :class="{ liked: item.likedUserIds.includes(userId) }"
                  @click="onLike(item.id)"
                >
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
                <div class="overlay-img-wrapper">
                  <img
                    :src="item.userProfileImg"
                    alt="profile icon"
                    class="profile-icon-img"
                  />
                  <p class="profile-overlay-name">{{ item.imgUsername }}</p>
                </div>

                <p class="like-text">
                  <span class="like-count-text">{{ item.likedUserIds.length }} </span>
                  &nbsp; Likes
                </p>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  class="custom-bg-post-btn"
                  @click="onDeleteImages(item.id)"
                  :disabled="item.userId != userId"
                />
              </div>
            </div>
          </li>
        </TransitionGroup>
      </div>
      <div class="posts-empty-container" v-if="galleryList.length === 0">
        <h1 class="info-panel" :class="{ 'theme-empty-color': darkTheme }">
          Gallery Empty
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wrapper-user-detail {
  width: 100vi;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .bg-wrapper-user-detail {
    height: 100%;
  }
}

.info-panel {
  font-size: 78px;
  opacity: 0.2;
}

@media screen and (max-width: 768px) {
  .info-panel {
    font-size: 18px;
  }
}

.posts-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  padding-top: 60px;
}

@media screen and (max-width: 768px) {
  .posts-container {
    padding-left: 0px;
    padding-top: 0px;
  }
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

@media screen and (max-width: 768px) {
  .theme-empty-color {
    font-size: 38px;
    color: #ffffff;
    opacity: 0.2;
    align-self: center;
  }
}

.custom-demo-form-inline {
  width: 70%;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
  .custom-demo-form-inline {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
}

.button-wrapper {
  align-self: flex-end;
}

@media screen and (max-width: 768px) {
  .button-wrapper {
    align-self: center;
  }
}

.custom-theme-label :deep(.el-form-item__label) {
  color: #ffffff;
}

.custom-theme-bg :deep(.el-input__inner) {
  background-color: #252424;
  color: #ffffff;
}

.custom-theme-bg :deep(.el-input__wrapper) {
  background-color: #252424;
  box-shadow: 0 0 0 0px;
}

.custom-theme-bg :deep(.el-textarea__inner) {
  background-color: #252424;
  color: #ffffff;
  box-shadow: 0 0 0 0px;
}

.custom-theme-bg :deep(.el-input__wrapper) {
  background-color: #252424;

  color: #ffffff;
  box-shadow: 0 0 0 0px;
}

.custom-theme-bg :deep(.el-input__wrapper) {
  background-color: #252424;
  color: #ffffff;
  box-shadow: 0 0 0 0px;
}

@media screen and (max-width: 768px) {
  .custom-theme-bg {
    width: 100%;
  }
}

.image-listing-container {
  width: 92%;
  height: 54vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px;
  list-style: none;
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .image-listing-container {
    width: 100%;
    height: 100vw;
    justify-content: center;
    box-sizing: border-box;
    
  }
}



.image-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 230px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: 2px -1px 28px -3px rgba(0, 0, 0, 0.26);
  position: relative;
}

@media screen and (max-width: 576px) {
  .image-card {
    margin-right: 0px;
  }
}

.image-thumb {
  width: 100%;
  height: 100%;
}

.img-wrapper {
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

.custom-bg-post-btn {
  background-color: transparent;
  border: none;
  color: #d21b1b;
  font-weight: bold;
  font-size: 16px;
}

.image-control-wrapper {
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-btn {
  color: #c4c4c4;
}

.liked {
  color: #d21b1b;
}

.like-text {
  color: #4f4d4d;
  font-size: 12px;
}

.like-count-text {
  font-size: 16px;
  font-weight: 600;
  color: #2d2c2c;
}

.profile-icon-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  z-index: 10;
}

.overlay-img-wrapper {
  display: flex;
  position: absolute;
  top: 4px;
  left: 10px;
  align-items: center;
}

.profile-overlay-name {
  background-color: #ffffff;
  opacity: 0.85;
  padding: 3px 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 12px;
  position: absolute;
  left: 25px;
}

.posts-empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .posts-empty-container {
    height: 30vh;
    align-items: center;
  }
}

.filter-panel {
  width: 90%;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .filter-panel {
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 768px) {
  .custom-filter-panel {
    width: 200px;
  }
}
/* animation */

.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width: 768px) {
  .custom-show {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .mobile-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media screen and (max-width: 768px) {
  .mobile-add-btn {
    width: 85vw;
  }
}

@media screen and (max-width: 768px) {
  .gallery-input-control {
    width: 90vw;
  }
}
</style>
