<template>
  <!--  加载动画-->
  <a-spin :spinning="spinning" tip="正在启动后端服务，请耐心等待..." id="load">
    <div class="container">
      <img src="./背景.png" class="full-screen-image" alt=""/>
    </div>
  </a-spin>
</template>

<script setup>
import { ref } from 'vue';
const spinning = ref(true);
const url = 'ws://localhost:8000/websocket';
import { invoke } from '@tauri-apps/api'

//确保后端启动
function check() {
  // 调用命令
  invoke('greet')
    // `invoke` 返回的是一个 Promise
    .then((response) => console.log(response))
}
check()
//创建websocket连接后端
var socket = new WebSocket(url)
//定义一个定时器变量
var timer = null
//定义一个连接函数
function connect() {
  //判断websocket是否连接成功
  if (socket.readyState === 1){
    console.log("websocket连接成功！")
    // 跳转到指定的 URL 地址
    location.href = "http://localhost:8000/";
    console.log('完成跳转！')
    spinning.value = false
    //清除定时器
    clearInterval(timer)
  }else{
    console.log("websocket连接失败！")
    //尝试重新连接
    socket = new WebSocket(url)
  }
}
//设置定时器，每隔一秒调用一次连接函数
timer = setInterval(connect, 1000)
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.full-screen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>