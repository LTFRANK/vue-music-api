<template>
  <div class="banner-list">
 <!--   <audio   id="play-audio" :src="currentmusicurl" autoplay>
       
      </audio> -->
    <ul>
     <!--  <li v-for="item in bannerlist" @click="bannerthis(item)">
        <div>
          <img :src="item.coverImgUrl" class="pull-left">
          <p :style="{color:item.titleColor}">{{item.typeTitle}}</p>
        </div>
      </li> -->
      <li v-for="item in musicmenu" @click="menuthis(item)">
        <div>
          <div class="menu-imgwrap">
            <img :src="item.coverImgUrl" class="pull-left">
          </div>
          <h3>{{item.tag}}</h3>
          <p class="menu-write"><i>{{item.name}}</i></p>
        </div>
      </li>
    </ul>
    </div>
</template>
<script>
import '../assets/css/font-awesome.css'
 import '../assets/css/app.css'
  import axios from "axios"
	export default {
  	name: 'index',
   	data(){ 
      return {
        bannerlist:[],
        musicmenu:[],
        currentmusicurl:'',
        currentindex:null,
        currenmenuid:''
      }
   	},
   	mounted(){
      const _that=this;
      //music banner
      // const result=axios.get('http://localhost:3000/banner')
      // .then(function (response) {
      // console.log(response.data.banners)
     
      //    _that.bannerlist=response.data.banners;
      //    _that.$store.commit("BANNER",response.data.banners);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      //music歌单
      const musicmenu=axios.get('http://localhost:3000/top/playlist/highquality')
      .then(function (response) {
      console.log(response.data)
     
         _that.musicmenu=response.data.playlists;
         _that.$store.commit("MUSICMENU",response.data.playlists);
      })
      .catch(function (error) {
        console.log(error);
      });



   	},
    methods:{
      bannerthis:function(item){
      },
      menuthis:function(item){
        var  _that=this;

        // if(this.currenmenuid==null||this.currenmenuid==item.id)
        // {
        //    _that.currentindex++;
        //  }else{
        //    _that.currentindex=0;
        //    this.currenmenuid=item.id;
        //  }

        axios.get('http://localhost:3000/playlist/detail?v=1&&id='+item.id).then(function(response){
          console.log(response.data)
            _that.$store.commit("PLAYLIST",response.data.result.tracks)
            _that.$router.push("/playlist/"+item.id)
//            axios.get('http://127.0.0.1:3000/music/url?id='+response.data.result.tracks[_that.currentindex].id,{withCredentials:true},{
//     'Content-Type':'application/x-www-form-urlencoded'
// }).then(function(response){
//               console.log(response.data.data)
//               _that.currentmusicurl='http://music.163.com/song/media/outer/url?id='+response.data.data[0].id+'.mp3';

//               document.querySelector("#play-audio").setAttribute("src",_that.currentmusicurl)
//             }

//           ).catch(function(error){

//           })

        }).catch(function(error){
          console.log(error)
        })
      }

    }

	}
</script>
<style  scoped>
/*//scoped只对当前代组件有效*/
	

</style>