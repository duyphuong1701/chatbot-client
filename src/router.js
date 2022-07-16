import Vue from 'vue'
import VueRouter from 'vue-router'
import ChatBot from "./components/ChatBot"
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: "chatbot",
            path: '/chatbot',
            component: ChatBot,
        }
    ]
})
