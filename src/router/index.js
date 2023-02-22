import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserDetails from '../views/UserDetails.vue'
import PostView from "../views/PostView.vue"
import GalleryView from "../views/GalleryView.vue"
import TodosView from "../views/TodosView.vue"
import Login from '../views/Login.vue'

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/user/:id/profile", 
            name: "userDetails",
            component: UserDetails
        },
        {
            path: "/user/:id/post", 
            name: "postView",
            component: PostView
        },
        {
            path: "/user/:id/gallery", 
            name: "galleryView",
            component: GalleryView
        },
        {
            path: "/user/:id/todos", 
            name: "todosView",
            component: TodosView
        }
       
    ]
})

export default router