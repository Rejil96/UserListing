<script setup>
import BasicUserInfo from "./Info/BasicUserInfo.vue";
import Company from "./Info/Company.vue";
import Address from "./Info/Address.vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref } from "vue";
import { useThemeStore } from "../../store/theme.js";
import { storeToRefs } from "pinia";
const props = defineProps({ currentUserData: Object });
const companyData = ref({});
const addressData = ref({});

const theme = useThemeStore();
const { darkTheme } = storeToRefs(theme);

onMounted(() => {
  companyData.value = props.currentUserData.company;
  addressData.value = props.currentUserData.address;
});

const excludeDataForBasicData = (address, company, name, profilepicture, ...rest) => {
  console.log(rest);
};
</script>

<template>
  <div class="profile-container">
    <div class="profile-info-container">
      <img
        :src="props.currentUserData.profilepicture"
        :alt="props.currentUserData.username"
        class="profile-banner-img"
      />
      <p class="profile-name" :class="{ 'theme-text': darkTheme }">
        {{ props.currentUserData.name }}
      </p>
      <BasicUserInfo :currentUserData="currentUserData" />
      <Company :companyData="companyData" />
    </div>
    <div class="address-info-container">
      <Address :addressData="addressData" />
      <!-- <div class="map">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"
          width="100%"
          height="460"
          frameBorder="0"
          allowFullScreen
        />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .profile-container {
    padding: 0px;
    flex-direction: column;
    align-items: center;
  }
}

.profile-info-container {
  width: 50%;
  border-right: 1px solid #bababa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .profile-info-container {
    border: 0px;
    width: 100%;
  }
}

.profile-banner-img {
  width: 240px;
  border-radius: 50%;
  margin-top: 50px;
}

@media screen and (max-width: 768px) {
  .profile-banner-img {
    width: 140px;
    margin-top: 30px;
  }
}

.profile-name {
  font-size: 24px;
  font-weight: 500;
  color: rgb(73, 73, 73);
}

@media screen and (max-width: 768px) {
  .profile-name {
    font-size: 18px;
    font-weight: 500;
    color: rgb(73, 73, 73);
    margin-top: 40px;
  }
}

.address-info-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map {
  width: 600px;
  height: 100%;
  margin-top: 80px;
}

.theme-text {
  color: #ffffff;
}
</style>
