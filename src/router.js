import { createWebHistory, createRouter } from "vue-router";
import signUp from '@/components/signUp.vue';
import test from '@/components/test.vue';
import userMain from '@/components/user/userMain.vue';
import userVideo from '@/components/user/userVideo.vue';
import operMain from '@/components/oper/operMain.vue';
import operCloud from '@/components/oper/operCloud.vue';
import operCreate from '@/components/oper/operCreate.vue';
import operVideo from '@/components/oper/operVideo.vue';

const routes = [
    {
        path: "/",
        component: signUp,
    },
    {
        path: "/userMain",
        component: userMain,
    },
    {
        path: "/operMain",
        component: operMain,
    },
    {
        path: "/operCloud",
        component: operCloud,
    },
    {
        path: "/operCreate",
        component: operCreate,
    },
    {
        path: "/test",
        component: test,
    },
    {
        path: "/video",
        component: userVideo,
    },
    {
        path: "/archiveVideo",
        component: operVideo,
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; 