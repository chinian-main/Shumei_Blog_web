import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
import HomePage from '@/views/home/HomePage';
import SharePage from '@/views/share/SharePage';
import NotFound from '@/views/error/NotFoundPage';
import LoginPage from '@/views/user/account/LoginPage'
import Dashboard from '@/views/user/Dashboard';
import My from '@/views/user/my/MyView.vue';
import RegisterPage from '@/views/user/account/RegisterPage.vue';
import WriterPage from '@/views/user/write/WriterPage'
import ArticleShowView from '@/views/article/ArticleShowView.vue';
import ArticleManageView from "@/views/user/article/ArticleManageView";
import ModifyPage from "@/views/user/modify/ModifyPage";
import PeopleView from "@/views/people/PeopleView";
import CollectionManageView from "@/views/user/collection/CollectionManageView";
import FollowManageView from "@/views/user/follow/FollowManageView";
import HumanManagerView from "@/views/user/human/HumanManagerView";
import UnityContentView from "@/views/unity/UnityContentView";
import StudentManagerView from "@/views/user/teach/StudentManagerView";
const routes = 
[
        {path:'/',redirect:'/home'},
        {path:'',redirect:'/home'},
        {name:'home',path:'/home',component:HomePage,
        meta: {
          requestAuth: false,
        }},
        {   name:'share',path:'/share',component:SharePage,
            meta: {
                requestAuth: false,
            }
        },
        {   name:'help',path:'/help',redirect:'/art/10',
            meta: {
                requestAuth: false,
            }
        },
        {   path:'/people/:id',
            component: PeopleView,
            meta: {
                requestAuth: false,
            }
        },
        {
            path:'/art/:id',
            component:ArticleShowView,
            meta: {
                requestAuth: false,
            }
        },
        {
            path: "/404/",
            name: "404",
            component: NotFound,
            meta: {
              requestAuth: false,
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginPage,
            meta: {
              requestAuth: false,
            }
        },
        {
            path: "/unity",
            name: "unity",
            component: UnityContentView,
            meta: {
                requestAuth: false,   
            },
            Headers:{
                Encoding: 'gzip',
            }
        },
        {
          path: "/register",
          name: "register",
          component: RegisterPage,
          meta: {
            requestAuth: false,
          }
      },
        {name:'dashboard',path:'/dashboard',redirect:'/dashboard/my',component:Dashboard,meta: {
          requestAuth: true,
        },
            children:[
                {
                    path: 'my',
                    component:My,
                    meta: {
                      requestAuth: true,
                    }
                },
                {
                    path: 'student',
                    component:StudentManagerView,
                    meta: {
                        requestAuth: true,
                    }
                },
                {
                    path: 'collect',
                    component:CollectionManageView,
                    meta: {
                        requestAuth: true,
                    }
                },
                {
                    path: 'follow',
                    component:FollowManageView,
                    meta: {
                        requestAuth: true,
                    }
                },
                {
                    path: 'human',
                    component:HumanManagerView,
                    meta: {
                        requestAuth: true,
                    }
                },
                {
                    path: 'writer',
                    component:WriterPage,
                },
                {
                    path: 'arts',
                    component:ArticleManageView,
                },
                {
                    path: 'modify/:id',
                    name:'modify',
                    component:ModifyPage,


                },

            ]
        },
        {
          path:"/public/:catchAll(.*)",
            meta: {
                requestAuth: false,
            }
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/404/"
        }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({name: "login"});
  } else {
      next();
      window.scrollTo(0,0);
  }
})

export default router;