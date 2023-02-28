<script setup>
import { ref, watch } from "vue";
import { ElButton } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

import { useThemeStore } from "../../store/theme.js";
import { storeToRefs } from "pinia";
const showDeletePopup = ref(false);
const isConfirmDelete = ref(false);

const props = defineProps({ postData: Object, currentUserId: String });
const emit = defineEmits(["onDelete"]);

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

const onDeletePost = (postId) => {
  showDeletePopup.value = true;
};

const onConfirmDelete = () => {
  showDeletePopup.value = false;
  isConfirmDelete.value = true;
};

watch(isConfirmDelete, () => {
  if (isConfirmDelete) {
    emit("onDelete", props.postData.id);
    isConfirmDelete.value = false;
  }
});

const onDeleteClick = () => {
  showDeletePopup.value = true;
};

const onCancelDelete = () => {
  showDeletePopup.value = false;
};
</script>

<template>

    <Transition name="bounce">
      <div class="delete-popup" v-if="showDeletePopup">
        <div class="delete-popup-content">
          <p class="delete-popup-text">Are you sure to delete this post ?</p>
          <div class="button-wrapper">
            <el-button type="primary" @click="onCancelDelete" class="cancel-btn"
              >Cancel</el-button
            >
            <el-button type="danger" class="confirm-btn" @click="onConfirmDelete"
              >Confirm</el-button
            >
          </div>
        </div>
      </div>
    </Transition>

  <li class="post-card" :class="{ 'theme-post-content': darkTheme }">
    <div class="post-card-header" :class="{ 'theme-post-header': darkTheme }">
      <div class="user-info-section">
        <img
          :src="props.postData.profilePicture"
          :alt="props.postData.username"
          class="post-user-img"
        />
        <p class="username-info" :class="{ 'theme-text': darkTheme }">
          {{ props.postData.username }}
        </p>
      </div>
      <div class="post-control-container">
        <p class="created-date" :class="{ 'theme-text': darkTheme }">
          {{ new Date().toLocaleDateString("en-US") }}
        </p>
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
    <p class="post-title" :class="{ 'theme-text-title': darkTheme }">
      {{ props.postData.postTitle }}
    </p>
    <p class="post-content-section" :class="{ 'theme-text-content': darkTheme }">
      {{ props.postData.postContent }}
    </p>
  </li>
</template>

<style scoped>
.post-card {
  width: 260px;
  height: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 34px -6px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow-y: auto;
}

@media screen and (max-width: 576px) {
  .post-card {
    width: 100%;
    height: 220px;
  }
}

@media screen and (min-width: 576px) {
  .post-card {
    width: 46%;
    height: 220px;
  }
}

@media screen and (min-width: 768px) {
  .post-card {
    width: 260px;
    height: 220px;
  }
}

.post-card-header {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 34px;
  background-color: rgb(230, 255, 247);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info-section {
  width: 50px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.post-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  margin: 20px 0px;
  word-wrap: break-word;
}
.post-user-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.username-info {
  font-size: 12px;
  color: #383838;
}

.created-date {
  font-size: 12px;
  color: #383838;
  padding-right: 5px;
}

.post-control-container {
  display: flex;
  align-items: center;
}

.custom-bg-post-btn {
  background-color: transparent;
  border: none;
  color: #d21b1b;
  font-weight: bold;
}

.post-content-section {
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  font-size: 14px;
  color: #6a6a6a;
  word-wrap: break-word;
}

.theme-post-header {
  background-color: #2c2c2c;
}

.theme-text {
  color: #dadada;
}

.theme-text-title {
  color: #fefefe;
}

.theme-text-content {
  color: #dad8d8;
}

.theme-post-content {
  background-color: #1a1919;
}
body{
  position: relative;
  
}
.delete-popup {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgb(26, 25, 25, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
  
}

.delete-popup-content {
  width: 26vw;
  height: 24vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  .delete-popup-content {
    width: 80vw;
    height: 26vh;
  }
}

.button-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.delete-popup-text {
  font-weight: 500;
  font-size: 20px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .delete-popup-text {
    font-size: 16px;
  }
}

/* animation */
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}

/* animation */

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
