<script setup>
import { ref } from "vue";
// import { loginStore } from "../Element-Plus-UI-Toolkit/toolkit-store/loginStore";
import { ElForm } from "element-plus";
// import EInput from "../Element-Plus-UI-Toolkit/components/Inputs/EInput.vue";
// import EButton from "../Element-Plus-UI-Toolkit/components/Buttons/EButton.vue";
// import EInput from '../components/Element-Plus-UI-Toolkit/components/Inputs/EInput.vue'
// import EButton from '../Element-Plus-UI-Toolkit/components/Buttons/EButton.vue'
// import {login} from '../Element-Plus-UI-Toolkit/plugins/api/login.js'

const username = ref("");
const password = ref("");
const { Login } = loginStore();

const onLogin = async () => {
  Login({ username: username.value, password: password.value });
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="card-heading">Login</h1>
      <div class="custom-form">
        <label for="username" class="label-control">Username</label>
        <EInput
          name="username"
          placeholder="Username"
          class="custom-input-control"
          id="username"
          v-model="username"
        />
        <label for="username" class="label-control">Password</label>
        <EInput
          name="password"
          placeholder="Password"
          class="custom-input-control"
          v-model="password"
        />
        <EButton label="Login" type="primary" class="custom-login-btn" @click="onLogin" />
      </div>
    </div>
  </div>
</template>

<style>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("../assets/svg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
}

.login-card {
  min-width: 40vw;
  height: 56vh;
  position: relative;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #151515;
  box-shadow: -6px 2px 44px -6px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
}

.card-heading {
  color: #151515;
  font-weight: 500;
  width: 100%;
  padding: 60px 0px;
  margin: 0px;
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.custom-form {
  width: 86%;
  height: 100%;
}

.custom-input-control .el-input__inner {
  height: 50px;
}

.custom-input-control .el-input__wrapper {
  margin-top: 20px;
}

.label-control {
  font-size: 18px;
  font-weight: 500;
  color: #1d1c1c;
  opacity: 0.5;
}

.custom-login-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
}
</style>
