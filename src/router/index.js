import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserDetails from '../views/UserDetails.vue'

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/user/:id", 
            name: "userDetails",
            component: UserDetails
        }
       
    ]
})

export default router