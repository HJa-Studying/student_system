import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import * as echarts from 'echarts';

import {
  Container,
  Header,
  Aside,
  Main,
  Input,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Button,
  Form,
  FormItem,
  Breadcrumb,
  BreadcrumbItem,
  Radio,
  RadioGroup,
  Dialog,
  Select,
  Option,
} from "element-ui";

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);

Vue.config.productionTip = false;
// 将导入的axios挂载到Vue的原型对象上
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
// 每次发送请求都会自动带一个/api的前缀
// axios.defaults.baseURL = '/api'

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
