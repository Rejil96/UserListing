<script setup>
import { useThemeStore } from "../../../store/theme.js";
import { storeToRefs } from "pinia";
const props = defineProps({ currentUserData: Object });

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);
</script>

<template>
  <div class="profile-general-info">
    <ul class="general-info-label-container">
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Username &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Email &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Phone &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Website &nbsp; &nbsp;:
      </li>
    </ul>
    <ul class="general-info-value-container">
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ props.currentUserData.username }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ props.currentUserData.email }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ props.currentUserData.phone }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ props.currentUserData.website }}</li>
    </ul>
  </div>
</template>

<style scoped>
.profile-general-info {
  display: flex;
  width: 100%;
  height: 15vh;
}

.general-info-label-container {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  list-style: none;
  padding-left: 0px;
}

.general-info-value-container {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  list-style: none;
  padding-left: 0px;
}

.general-info-label {
  color: #797979;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  width: 180px;
  text-align: right;
}

.general-info-value {
  color: #333333;
  display: flex;
  align-items: center;
  height: 60px;
  width: 180px;
  text-align: left;
  font-weight: 500;
  padding-left: 20px;
}

.theme-label-text-lighter {
  color: #b0b0b0;
}

.theme-value-text-lighter {
  color: #e0dddd;
}
</style>
