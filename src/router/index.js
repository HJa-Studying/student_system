import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由组件
import Home from "@/pages/Home.vue"
import Login from "@/pages/Login.vue"
import StudentInfo from "@/pages/StudentInfo.vue"
import InsertStudentInfo from "@/pages/InsertStudentInfo.vue"
import CourseInfo from "@/pages/CourseInfo.vue"
import InsertCourseInfo from "@/pages/InsertCourseInfo.vue"
import Grade from "@/pages/Grade.vue"
import InsertGrade from "@/pages/InsertGrade.vue"
import Chart from "@/pages/Chart.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                    path:'studentInfo',
                    component:StudentInfo
                },
                {
                    path:'insertStudentInfo',
                    component:InsertStudentInfo
                },
                {
                    path:'courseInfo',
                    component:CourseInfo
                },
                {
                    path:'insertCourseInfo',
                    component:InsertCourseInfo
                },
                {
                    path:'grade',
                    component:Grade
                },
                {
                    path:'insertGrade',
                    component:InsertGrade
                },
                {
                    path:'chart',
                    component:Chart
                }
            ]
        },
        {
            path:'/login',
            component:Login
        }
    ]
})