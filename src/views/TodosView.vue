<script setup>
import { uid } from "uid";
import {
  ElButton,
  ElContainer,
  ElMain,
  ElHeader,
  ElRow,
  ElCol,
  ElInput,
  ElCheckbox,
} from "element-plus";

import { Delete, Edit, Check } from "@element-plus/icons-vue";

import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const response = ref("");
const route = useRoute();

//Finding the current user based on path params
const currentPath = route.path.split("/").pop();
const userId = route.params.id;
const allUsers = ref([]);
const currentUserData = ref([]);

//states for creating todos
const userBasedTodos = ref([]);
const todoText = ref("");
const isTodoCompleted = ref(false);
const todoList = ref([]);
const isEditable = ref(false);
const editedInputValue = ref("");

onMounted(() => {
  onFetchUserData();
  isDataFoundInLocalStorage();
});

//This function will load the local storage data if its already exist
const isDataFoundInLocalStorage = () => {
  if (localStorage.getItem("userTodos")) {
    const getCurrentStoredItems = JSON.parse(localStorage.getItem("userTodos"));
    const replaceTodosFromLocalStorage = getCurrentStoredItems.filter(
      (eachData) => eachData.userId == userId
    )[0];
    if (replaceTodosFromLocalStorage) {
      todoList.value = replaceTodosFromLocalStorage.todos;
    } else {
      userBasedTodo();
    }

  }
};

//This function will load the currnt user based on the current path id
const onFetchUserData = async () => {
  response.value = await fetch("https://panorbit.in/api/users.json");
  allUsers.value = await response.value.json();
  currentUserData.value = allUsers.value.users.filter(
    (eachData) => eachData.id == userId
  )[0];
};


// This function will add the users in to the local storage along with the created todos list
const userBasedTodo = () => {
  if (localStorage.getItem("userTodos")) {
    const getCurrentStoredUsers = JSON.parse(localStorage.getItem("userTodos"));
    const isUserAltreadyExistInLs = getCurrentStoredUsers.filter((eachData) => eachData.userId == userId)[0]
    if (isUserAltreadyExistInLs) {
      console.log("entering")
      const getCurrentStoredItems = JSON.parse(localStorage.getItem("userTodos"));
      const modifyUserTodos = getCurrentStoredItems.map((eachData) => {
        if (eachData.userId == userId) {
          return {
            userId: userId,
            todos: [...todoList.value],
          };
        }
        return eachData;
      });

      localStorage.setItem("userTodos", JSON.stringify(modifyUserTodos));
    } else {
      getCurrentStoredUsers.push({ userId, todos: todoList.value });
      localStorage.setItem("userTodos", JSON.stringify(getCurrentStoredUsers));
    }
  } else {
    const lsData = JSON.stringify([
      {
        userId,
        todos: todoList.value,
      },
    ]);
    localStorage.setItem("userTodos", lsData);
  }
};

const onAddTodo = () => {
  todoList.value.push({
    //16 is the length of generated unique id
    id: uid(16),
    todoText: todoText.value,
    isTodoCompleted: isTodoCompleted.value,
    isEditable: isEditable.value,
  });

  todoText.value = "";
  //The delete modification will store in local storage
  userBasedTodo();
};

const onCheck = (todoId) => {
  todoList.value = todoList.value.map((eachData) => {
    if (eachData.id == todoId) {
      return { ...eachData, isTodoCompleted: !eachData.isTodoCompleted };
    }
    return eachData;
  });

  userBasedTodo()
};

const onDelete = (todoId) => {
  todoList.value = todoList.value.filter((eachData) => eachData.id !== todoId);
  userBasedTodo()
};

const onEdit = (todoId) => {
  todoList.value = todoList.value.map((eachData) => {
    if (eachData.id === todoId) {
      editedInputValue.value = eachData.todoText;
      return { ...eachData, isEditable: !eachData.isEditable };
    }
    return eachData;
  });
  userBasedTodo()
};

const onSaveEdit = (todoId) => {
  todoList.value = todoList.value.map((eachData) => {
    if (eachData.id === todoId) {
      return { ...eachData, todoText: editedInputValue.value, isEditable: false };
    }
    return eachData;
  });
  userBasedTodo()
};
</script>

<template>
  <div class="bg-wrapper-user-detail">
    <Sidebar :currentPath="currentPath" :userId="userId" />
    <div class="user-details-container">
      <Header :currentUserData="currentUserData" :currentPath="currentPath" />
      <div class="todos-bg-wrapper">
        <el-row type="flex" justify="start" class="input-control-container">
          <el-col :span="24">
            <div class="input-control-wrapper">
              <el-input
                v-model="todoText"
                placeholder="Enter Todo Task"
                class="input-control"
              />
              <el-button
                type="primary"
                class="add-todo-btn"
                :disabled="todoText.length < 6"
                @click="onAddTodo"
                >+</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" class="input-control-container">
          <el-col :span="24">
            <ul class="todo-listing-container" v-if="todoList.length > 0">
              <li v-for="todo in todoList" :key="todo.id" class="list-item">
                <el-input
                  v-model="editedInputValue"
                  placeholder="Enter Todo Task"
                  v-if="todo.isEditable"
                  :value="todo.todoText"
                  class="custom-edit-input"
                />
                <p
                  v-else
                  class="item-panel"
                  :class="todo.isTodoCompleted ? 'custom-completed-text' : ''"
                >
                  {{ todo.todoText }}
                </p>
                <div class="button-wrapper">
                  <el-button
                    type="primary"
                    v-if="todo.isEditable"
                    @click="onSaveEdit(todo.id)"
                    :disabled="editedInputValue.length < 6"
                    >Save</el-button
                  >
                  <el-button
                    v-else
                    type="primary"
                    :icon="Edit"
                    circle
                    @click="onEdit(todo.id)"
                  />
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="onDelete(todo.id)"
                  />
                  <el-button
                    type="success"
                    :icon="Check"
                    circle
                    @click="onCheck(todo.id)"
                    :class="todo.isTodoCompleted ? '' : 'check-box-custom'"
                  />
                </div>
              </li>
            </ul>
            <div v-else class="empty-bg-container">
              <h1 class="todoEmptyText">Todos Empty</h1>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wrapper-user-detail {
  width: 100vi;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
}

.info-panel {
  font-size: 78px;
  opacity: 0.2;
}

.posts-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.user-details-container {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.input-control {
  width: 40vw;
  height: 60px;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border: 0px !important;
}

.todo-listing-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 62vh;
  padding-left: 0px;
  list-style: none;
}

.add-todo-btn {
  width: 80px;
  height: 60px;
  font-weight: 600;
  font-size: 24px;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.input-control-container {
  margin-top: 80px;
  width: 100%;
  margin-left: 64px;
}

.todos-bg-wrapper {
  width: 100%;
}

.list-item {
  width: 95%;
  background-color: #d9f8ee;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 10px #3f7ee4 solid;
}

li:nth-child(even) {
  background-color: #ffffe0;
}

.button-wrapper {
  display: flex;
  align-items: center;
  width: 120px;
  justify-content: space-between;
  margin-right: 40px;
}

.check-box-custom {
  margin-left: 10px !important;
}

.check-box-custom {
  background-color: #ffffff;
}

.custom-edit-input {
  background-color: transparent !important;
  height: 40px;
  width: 80%;
  margin: 10px;
  background-color: black;
}

.custom-completed-text {
  text-decoration: line-through;
}

.item-panel {
  margin-left: 40px;
  word-wrap: break-word;
  line-height: 24px;
}

.empty-bg-container {
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 600;
  opacity: 0.2;
}
</style>
