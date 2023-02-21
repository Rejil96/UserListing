<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";
import Profile from "../components/Profile/Profile.vue";
import PostCard from "../components/Posts/PostCard.vue";
import { useThemeStore } from "../store/theme.js";
import { storeToRefs } from "pinia";

import { ElButton, ElInput, ElForm, ElFormItem, ElSelect, ElOption } from "element-plus";

import { Delete, Edit, Check } from "@element-plus/icons-vue";

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { uid } from "uid";

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

const postsList = ref([]);
const postTitle = ref("");
const postContent = ref("");

const isAddBtnActive = ref(false);

const response = ref("");
const route = useRoute();
const currentPath = route.path.split("/").pop();
const userId = route.params.id;
const allUsers = ref([]);
const currentUserData = ref([]);

const filterConstants = ["All", "My Post"];
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
  if (currentFilterCondition.value === "My Post") {
    postsList.value = postsList.value.filter((eachData) => eachData.userId == userId);
  } else {
    postsList.value = JSON.parse(localStorage.getItem("posts"));
  }
});

const onPreLoadFromLs = () => {
  if (localStorage.getItem("posts")) {
    postsList.value = JSON.parse(localStorage.getItem("posts"));
  } else {
    localStorage.setItem("posts", JSON.stringify(postsList.value));
  }
};

const onCreatePost = () => {
  postsList.value.push({
    userId: userId,
    id: uid(16),
    postTitle: postTitle.value,
    postContent: postContent.value,
    profilePicture: currentUserData.value.profilepicture,
    username: currentUserData.value.username,
  });
  localStorage.setItem("posts", JSON.stringify(postsList.value));
  postTitle.value = "";
  postContent.value = "";
};


const onDeletePosts = (postId) => {
  const filteredPosts = JSON.parse(localStorage.getItem("posts")).filter(
    (eachData) => eachData.id !== postId
  );
  localStorage.setItem("posts", JSON.stringify(filteredPosts));
  postsList.value =
    currentFilterCondition.value === "All"
      ? filteredPosts
      : filteredPosts.filter((eachData) => eachData.userId == userId);
};
</script>

<template>
  <div class="bg-wrapper-user-detail" :class="{ darkTheme: darkTheme }">
    

    <Sidebar :currentPath="currentPath" :userId="userId" />
    <div class="user-details-container">
      <Header :currentUserData="currentUserData" :currentPath="currentPath" />
      <div class="posts-container">
        <el-form class="custom-demo-form-inline">
          <el-form-item label="Post Title:" :class="{ 'custom-theme-label': darkTheme }">
            <el-input
              placeholder="Post Title"
              class="title-input-control"
              v-model="postTitle"
              :class="{ 'custom-theme-bg': darkTheme }"
            />
          </el-form-item>
          <el-form-item label="Post Content" :class="{ 'custom-theme-label': darkTheme }">
            <el-input
              :rows="4"
              type="textarea"
              placeholder="Please input"
              v-model="postContent"
              :class="{ 'custom-theme-bg': darkTheme }"
            />
          </el-form-item>
          <div class="button-wrapper">
            <el-button
              type="primary"
              @click="onCreatePost"
              :disabled="postTitle.length < 6 || postContent.length < 6"
              >Add</el-button
            >
          </div>
        </el-form>
        <div class="filter-panel">
          <el-select
            v-model="currentFilterCondition"
            class="m-2"
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

        <ul class="post-listing-container" v-if="postsList.length > 0">
          <PostCard
            v-for="post in postsList"
            :key="post.id"
            :postData="post"
            :currentUserId="userId"
            @onDelete="onDeletePosts"
          />
        </ul>
      </div>
      <div class="posts-empty-container" v-if="postsList.length === 0">
        <h1 class="info-panel" :class="{ 'theme-empty-color': darkTheme }">
          Posts Empty
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

.info-panel {
  font-size: 78px;
  opacity: 0.2;
}

.posts-empty-container {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: flex-start;
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

.posts-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
}

.custom-demo-form-inline {
  width: 80%;
  padding: 20px;
}

.title-input-control {
  height: 50px;
  margin-left: 18px;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.post-listing-container {
  width: 95%;
  height: 52vh;
  overflow-y: auto;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  padding: 0px 20px;
}

.filter-panel {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.darkTheme {
  background-color: black;
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

.theme-empty-color {
  font-size: 78px;
  color: #ffffff;
  opacity: 0.2;
}


</style>
