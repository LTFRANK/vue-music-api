// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import list from "@/components/list"
import player from "@/components/player"
import index from "@/components/index"
import playlist from "@/components/playlist"
import player_bak from "@/components/player_bak"
import search from "@/components/search"
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

Vue.config.productionTip = false



const store=new Vuex.Store({
	state:{
		musiclist:[],
		count:0,
		bannerlist:[],
		musicmenu:[],
		playlist:[],
		showsearch:false,
		historyList:[],
		togglehistory:false
	},
	mutations:{
		MUSIC (state,data){
			state.musiclist=data;
		},
		ADD (state){
			state.count++;
		},
		BANNER(state,data){
			state.bannerlist=data;
		},
		MUSICMENU(state,data){
			state.musicmenu=data;
		},
		PLAYLIST(state,data){
			state.playlist=data;
		},
		SHOWSEARCH(state,data){
			state.showsearch=data;
		},
		AddHistory(state,data){
			state.historyList.push(data);
		},
		ToggleHistory(state,data){
			state.togglehistory=!data;
		}
	}



})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,list,player,index,playlist,player_bak,search},
  template: '<App/>'
})
