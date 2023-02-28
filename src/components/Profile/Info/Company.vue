<script setup>
import { useThemeStore } from "../../../store/theme.js";
import { storeToRefs } from "pinia";

const props = defineProps({ companyData: Object });

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);
// const addressDatas = ref(null);
// watch(
//   () => props.addressData,
//   (newValue) => {
//     addressDatas.value = newValue
//     console.log(addressDatas.value)
//   }
// );
</script>

<template>
  <p class="company-name" :class="{ 'theme-text': darkTheme }">Company</p>
  <div class="profile-general-info" :class="{ 'dark-border': darkTheme }">
    <ul class="general-info-label-container">
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        Name &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        catchPharse &nbsp; &nbsp;:
      </li>
      <li class="general-info-label" :class="{ 'theme-label-text-lighter': darkTheme }">
        bs &nbsp; &nbsp;:
      </li>
    </ul>
    <ul class="general-info-value-container">
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">
        {{ companyData.name }}
      </li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">
        {{ companyData.catchPhrase }}
      </li>
      <li class="general-info-value" :class="{ 'theme-value-text-lighter': darkTheme }">
        {{ companyData.bs }}
      </li>
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
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 40px;
  }

  .dark-border {
    border-bottom: 1px solid #454545;
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

@media screen and (max-width: 768px) {
  .general-info-value-container {
    font-size: 14px;
  }
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

.theme-label-text-lighter {
  color: #b0b0b0;
}

.theme-text {
  color: #b0b0b0;
}

.theme-value-text-lighter {
  color: #e0dddd;
}
</style>
