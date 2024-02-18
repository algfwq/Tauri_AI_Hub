import { createApp } from "vue";
//导入Vue文件
import App from "./App.vue";
//导入蚂蚁框架
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Antd).mount("#app")