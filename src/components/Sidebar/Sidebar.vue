<script setup>
import { useRouter } from "vue-router";
import { useThemeStore } from "../../store/theme.js";
import { storeToRefs } from "pinia";

import { ElButton, ElIcon } from "element-plus";

import { Moon, Sunny } from "@element-plus/icons-vue";

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);
const {changeTheme} = theme

const props = defineProps({ currentPath: String, userId: String });
const router = useRouter();

const onClickNav = (path) => {
  router.push(`/user/${props.userId}/${path}`);
};
</script>

<template>
  <div class="side-bar-container">
    <div class="theme-wrapper">
      <Transition name="slide-up">
        <el-button type="primary" :icon="Moon" circle class="custom-theme-btn" @click="changeTheme" v-if="darkTheme"> </el-button>
        <el-button type="primary" :icon="Sunny" circle class="custom-light-theme-btn" @click="changeTheme" v-else> </el-button>
    </Transition>
    </div>
    <div class="nav-wrapper">
        <ul class="side-bar-nav">
        <li
            class="side-bar-nav-item"
            :class="{ active: props.currentPath === 'profile' }"
            @click="onClickNav(`profile`)"
        >
            Profile
        </li>
        <li
            class="side-bar-nav-item"
            :class="{ active: props.currentPath === 'post' }"
            @click="onClickNav(`post`)"
        >
            Post
        </li>
        <li
            class="side-bar-nav-item"
            :class="{ active: props.currentPath === 'gallery' }"
            @click="onClickNav(`gallery`)"
        >
            Gallery
        </li>
        <li
            class="side-bar-nav-item"
            :class="{ active: props.currentPath === 'todos' }"
            @click="onClickNav(`todos`)"
        >
            Todo
        </li>
        </ul>
    </div>
  </div>
</template>

<style scoped>
.side-bar-container {
  box-sizing: border-box;
  height: 96%;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    #a145f6,
    #871ff1,
    #7a16ea,
    #6d0ce3,
    #5f00dc
  );
  margin: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}

.theme-wrapper {
  width: 100%;
  display: flex;
  padding-top: 20px;
  padding-right: 40px;
  align-items: flex-start;
  justify-content: flex-end;
}

.themeButton {
  width: 120px;
  height: 40px;
}

.side-bar-nav {
  padding-left: 0px;
  list-style: none;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 50%;
  justify-content: space-between;
}

.side-bar-nav-item {
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 22px;
  color: #d7d7d7;
  cursor: pointer;
}

.active {
  color: #ffffff;
  font-size: 39px;
}

.custom-theme-btn {
  background-color: #000000;
  border: none;
  font-size: 20px;
  width: 40px;
  height: 40px;
}

.custom-light-theme-btn{
background-color: #ffffff;
  border: none;
  font-size: 20px;
  width: 40px;
  height: 40px;
  color: #000000;
}

.nav-wrapper{
    height: 100%;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* animation  */

.theme-wrapper {
  display: inline-block;
  position: relative;
  height: 1em;
}

button {
  position: absolute;
  right: 40px;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
