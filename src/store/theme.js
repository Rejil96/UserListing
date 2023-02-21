import { defineStore } from "pinia";
import { ref } from 'vue'

export const useThemeStore = defineStore("theme", () => {
    const darkTheme = ref(false)
    
    if (localStorage.getItem("theme")) {
        darkTheme.value = JSON.parse(localStorage.getItem("theme"))
    } else {
        localStorage.setItem("theme", JSON.stringify(darkTheme.value))
    }

    const changeTheme = () => {
        darkTheme.value = !darkTheme.value
        localStorage.setItem("theme", JSON.stringify(darkTheme.value))
    }
    return { darkTheme, changeTheme };
})