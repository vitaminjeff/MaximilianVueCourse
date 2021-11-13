import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const CoachDetail = defineAsyncComponent(() => {
  return import('./pages/coaches/CoachDetail.vue');
});

const CoachRegistration = defineAsyncComponent(() => {
  return import('./pages/coaches/CoachRegistration.vue');
});

const ContactCoach = defineAsyncComponent(() => {
  return import('./pages/requests/ContactCoach.vue');
});

const RequestsReceived = defineAsyncComponent(() => {
  return import('./pages/requests/RequestsReceived.vue');
});

const UserAuth = defineAsyncComponent(() => {
  return import('./pages/auth/UserAuth.vue');
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function(to, _ /* from */, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // next(false);
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // can't test manually from address bar, vuex state would be cleared
    next('/coaches');
  } else {
    next();
  }
});

export default router;
