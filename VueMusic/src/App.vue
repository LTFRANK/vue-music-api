<template>
  <div id="app">
    <header class="header">
      <h1><i class="fa fa-music"></i>音乐随心听</h1>
      <a href="###" @click="toggleShow(false)"><i class="fa fa-search" title="搜索"></i></a>
      <router-link to="/historylist"> <i class="fa fa-history" title="播放记录"></i> </router-link> 
    </header>
    <transition>
    <search v-show="isShow" @toggleShow="toggleShow" :isShow="isShow" ></search>
    </transition>
    <section class="main">
      <router-view></router-view> 
    </section>
  </div>
</template>

<script>
  import './assets/css/font-awesome.css'
  import './assets/css/app.css'

  import search from '@/components/search'
  import axios from "axios"
  export default {
  name: 'App',
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    toggleShow:function(data){

      this.isShow=!data;
    },
    showHistoryList:function(){

    }
  },
  components:{
    //需要挂载在父组件的子组件，用于子父组件传递的时候用 需要import子组件
    search
  }

}
</script>

<style>
</style>
