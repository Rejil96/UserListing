<script setup>
import { ElForm } from "element-plus";
// import EInput from "../components/Login/Element-Plus-UI-Toolkit/components/Inputs/EInput.vue";
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
        <h1 class="card-heading">Login</h1>
      <el-form ref="ruleFormRef" label-width="120px" class="demo-ruleForm custom-form">
        <EInput name="username" label="Username"/>
        <EInput name="password" label="Password"/>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
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
  height: 70vh;
  position: relative;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #151515;
  box-shadow: -6px 2px 44px -6px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
}

.card-heading {
  color: #151515;
  font-weight: 500;
  width: 100%;
  padding: 20px 0px;
  margin: 0px;
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.custom-form{
    width: 90%;
}

.custom-cl{
    height: 80px;
}

.el-form-item .el-form-item__content .el-input .el-input__wrapper{
    height: 40px;
}

</style>
