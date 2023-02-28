<script setup>
import { useThemeStore } from "../../../store/theme.js";
import { storeToRefs } from "pinia";
const props = defineProps({ addressData: Object });

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

</script>

<template>
  <p class="company-name" :class="{ 'theme-text': darkTheme }">Address</p>
  <div class="profile-general-info">
    <ul class="general-info-label-container">
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Street &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Suit &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        City &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Zip Code &nbsp; &nbsp;:
      </li>
    </ul>
    <ul class="general-info-value-container">
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ addressData.street }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ addressData.suite }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ addressData.city }}</li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">{{ addressData.zipcode }}</li>
    </ul>
  </div>
</template>

<style scoped>
.profile-general-info {
  display: flex;
  width: 100%;
  height: 15vh;
}

@media screen and (max-width: 768px) {
  .profile-general-info {
    display: flex;
    width: 96%;
    height: 20vh;
    padding-bottom: 40px;
  }

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

@media screen and (max-width: 768px) {
  .general-info-label-container {
    width: 40%;
  }
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

@media screen and (max-width: 768px) {
  .general-info-label {
    font-size: 14px;
  }
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

@media screen and (max-width: 768px) {
  .general-info-value{
    font-size: 14px;
  }
}

.company-name {
  font-size: 20px;
  color: #797979;
  text-align: center;
  margin: 0px;
  padding: 0px;
  margin-top: 60px;
}

@media screen and (max-width: 768px) {
  .company-name {
    font-size: 16px;
    margin-top: 40px;
  }
}

.theme-text {
  color: #b0b0b0;
}
.theme-label-text-lighter {
  color: #b0b0b0;;
}

.theme-value-text-lighter {
  color: #e0dddd;
}
</style>
