<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "../../store/theme";
import { storeToRefs } from "pinia";
import { ElButton } from "element-plus";
import { Expand, Moon, Sunny, Fold } from "@element-plus/icons-vue";

const router = useRouter();
const isMobileNavOpened = ref(false);
const props = defineProps({ currentUserData: Object, currentPath: String, userId: String  });
const showLogout = ref(false);
const { changeTheme } = useThemeStore();

const onClickNav = (path) => {
  router.push(`/user/${props.userId}/${path}`);
};

const onHoverProfile = () => {
  showLogout.value = !showLogout.value;
};

const onLogoutClick = () => {
  router.push("/");
  showLogout.value = false;
};

const onClickClose = () => {
  showLogout.value = false;
};

const onOpenMobileNav = () => {
  isMobileNavOpened.value = !isMobileNavOpened.value;
};

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);
</script>

<template>
  <div class="header">
    <Transition name="slide-fade">
      <div class="overlay-mobile" v-if="isMobileNavOpened">
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
    </Transition>
    <Transition name="bounce">
      <div class="profile-pop-card" v-if="showLogout" :class="{ theme: darkTheme }">
        <img
          :src="props.currentUserData.profilepicture"
          :alt="props.currentUserData.username"
          class="user-logout-img"
        />
        <p>{{ props.currentUserData.name }}</p>
        <div class="button-wrapper">
          <button class="close-btn" @click="onClickClose">Close</button>
          <button class="logout-btn" @click="onLogoutClick">Logout</button>
        </div>
      </div>
    </Transition>
    <div class="page-name-mobile-wrapper">
      <el-button
        :icon="Fold"
        class="custom-mobile-fold-hamburg"
        :class="{ 'custom-hamburg-color': darkTheme }"
        @click="onOpenMobileNav"
        v-if="isMobileNavOpened"
      >
      </el-button>
      <el-button
        :icon="Expand"
        class="custom-mobile-hamburg"
        :class="{ 'custom-hamburg-color': darkTheme }"
        @click="onOpenMobileNav"
        v-else="isMobileNavOpened"
      >
      </el-button>
      <p class="page-name" :class="{ 'theme-text': darkTheme }">
        {{ props.currentPath.toUpperCase() }}
      </p>
    </div>

    <div class="user-logout-wrapper">
      <div class="profile-info-container" @click="onHoverProfile">
        <img
          :src="props.currentUserData.profilepicture"
          :alt="props.currentUserData.username"
          class="profile-icon"
        />
        <p class="profile-name" :class="{ 'theme-text': darkTheme }">
          {{ props.currentUserData.username }}
        </p>
      </div>

      <div class="theme-wrapper">
        <Transition name="slide-up">
          <el-button
            type="primary"
            :icon="Moon"
            circle
            class="custom-theme-btn"
            @click="changeTheme"
            v-if="darkTheme"
          >
          </el-button>
          <el-button
            type="primary"
            :icon="Sunny"
            circle
            class="custom-light-theme-btn"
            @click="changeTheme"
            v-else
          >
          </el-button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-pop-card {
  position: absolute;
  top: 80px;
  right: 20px;
  width: 300px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: -1px 1px 41px 0px rgba(0, 0, 0, 0.55);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.header {
  width: 92%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  padding: 10px 10px;
  border-bottom: 1px solid #bababa;
}
.page-name {
  font-weight: 600;
  font-size: 24px;
  color: rgb(36, 36, 36);
}

@media screen and (max-width: 768px) {
  .page-name {
    font-size: 18px;
  }
}

.profile-icon {
  width: 40px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}

.profile-name {
  margin-right: 10px;
}

.button-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
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

.logout-btn {
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

.user-logout-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.theme-text {
  color: #ffffff;
}

.theme {
  background-color: #e1e0e0;
  box-shadow: -1px 1px 41px 0px #3c3c3c8c;
}

/* animation  */

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* mobile-header */

.page-name-mobile-wrapper {
  display: flex;
  align-items: center;
}

.custom-mobile-hamburg {
  font-size: 26px;
  padding: 0px;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  color: #fff;
  z-index: 102;
  border-radius: 50%;
  background-color: #8b04cf;
  height: 44px;
  width: 44px;
}

.custom-mobile-fold-hamburg{
  color: #ffffff;
  font-size: 26px;
  padding: 0px;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  z-index: 102;
  border-radius: 50%;
  height: 44px;
  background-color: #bc7ff5;
  width: 44px;
}

.custom-hamburg-color {
  color: #ffffff;
}

@media screen and (min-width: 768px) {
  .custom-mobile-hamburg {
    display: none;
  }
}

.theme-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.user-logout-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 136px;
}

.custom-theme-btn {
  background-color: #000000;
  border: none;
  font-size: 20px;
  font-size: 20px;
  width: 30px;
  height: 30px;
  position: absolute;
}

.custom-light-theme-btn {
  background-color: #ffffff;
  border: none;
  font-size: 20px;
  width: 30px;
  height: 30px;
  color: #000000;
  position: absolute;
}

/* animation for theme change  */

.slide-up-enter-active,
.slide-up-leave-active {
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

.theme-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: inherit;
}

.overlay-mobile {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    #a145f6,
    #871ff1,
    #7a16ea,
    #6d0ce3,
    #5f00dc
  );
}

/* animation mobile nav  */

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.78, 0, 0, 0.99);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(1);
  opacity: 0;
}


.side-bar-nav {
  padding-left: 0px;
  list-style: none;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 40%;
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

@media screen and (min-width: 768px) {
  .theme-wrapper{
    display: none;
  }
}
</style>
