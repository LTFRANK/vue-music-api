import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import player from '@/components/player'
import player_bak from '@/components/player_bak'
import index from '@/components/index'
import playlist from '@/components/playlist'
import searchlist from '@/components/searchlist'
import historylist from '@/components/historylist'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
   {
     path: '/',
      name: 'index',
      component:index
   },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/list/:id',
      name: 'player',
      component: player
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: playlist

    },
      {
      path: '/player_bak/:id',
      name: 'player_bak',
      component: player_bak

    },
     {
      path: '/search/:id',
      name: 'searchlist',
      component: searchlist
    },
    {
      path:"/historylist",
      name:"historylist",
      component:historylist
    }
  ]
})
