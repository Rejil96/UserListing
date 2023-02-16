<script setup>
import BasicUserInfo from "./Info/BasicUserInfo.vue";
import Company from "./Info/Company.vue";
import Address from "./Info/Address.vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref } from "vue";
const props = defineProps({ currentUserData: Object });
const companyData = ref({});
const addressData = ref({});

// const basicUserData =
// const temp = ref(JSON.parse(JSON.stringify(props.currentUserData)));
onMounted(() => {
  // excludeDataForBasicData(...props.currentUserData)
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
      <p class="profile-name">{{ props.currentUserData.name }}</p>
      <BasicUserInfo :currentUserData="currentUserData" />
      <Company :companyData="companyData" />
    </div>
    <div class="address-info-container">
      <Address :addressData="addressData" />
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

.profile-info-container {
  width: 50%;
  border-right: 1px solid #bababa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-banner-img {
  width: 200px;
  border-radius: 50%;
  margin-top: 50px;
}

.profile-name {
  font-size: 24px;
  font-weight: 500;
  color: rgb(73, 73, 73);
}

.address-info-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
