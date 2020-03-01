import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {initMenu} from './utils/menus'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(Element)

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    if (window.sessionStorage.getItem("user")) {
      initMenu(router,store);
      next();
    } else {
      next('/?redirect='+ to.path);
    }

  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
