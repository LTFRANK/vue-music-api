<template>
  <div class="player">
      <audio  id="play-audio" :src="currentmusicurl" autoplay>
       
      </audio>
      <div class="music-desc">
        
            <div class="artist-poster">
              <transition >
                <img :src="item.album.picUrl?item.album.picUrl:item.album.artist.img1v1Url" :style="{transform:'rotate('+(current/duration*360*2)+'deg)'}">
              </transition>
            </div>
          <h2>{{item.name}}</h2>
          <h3>{{item.artists[0].name}}</h3>
          <div class="lrc-wrap" style="position: relative">
            <div style="width:100%;position: absolute;top:1.6rem;left:0" id="lrc-wrap-inner">
              <p v-for="(ly,index) in lyric" :class="currentline==index?'active':''">
                  {{ly.content}}
              </p>
            </div>
          </div>
      </div>
      <div class="play-wrap">
           <div class="play-prev" @click="prev"><i class="fa fa-backward"></i></div>
           <div class="play-pause" @click="play"><i class="fa" :class="{'fa-play':!playing,'fa-pause':playing}"></i></div>
           <div class="play-next" @click="next"><i class="fa fa-forward"></i></div>
      </div>
  </div>
 
</template>
<script>
import '../assets/css/font-awesome.css'
 import '../assets/css/app.css'
  import axios from "axios"
 import $ from "jquery"
  export default {
    name: 'player',
    data(){ 
      return{
        item:{
          album:{
            picUrl:null,
            artist:{
              img1v1Url:null
            }
          },
          name:null,
          artists:[{name:null}]
        },
        currentIndex:0,
        playing:true,
        duration:0,
        current:0,
        currentmusicurl:"",
        lyric:{},
        currentlyric:0,
        currentline:"w",
        history:0
      } 
    },
    mounted(){
      var _that=this;
      var id=this.$route.params.id;
       console.log(this.$route.params.id)


      // this.history=this.$router.params.history;

      this.$store.state.playlist.forEach((a,index)=>{

          if(a.id==id)
          {
            _that.item=a;
            _that.currentIndex=index;
            _that.duration=a.duration/1000;
            console.log(a)
          }

      })
      this.fetchmusic(id);
      // this.init();
      

    },
    beforeDestroy(){
        //用queryselector  不能用getElement
        this.playing=false;
       this.$el.querySelector("#play-audio").removeEventListener("timeupdate",this.timeupdate)
    },
    destroyed(){

       console.log("destroyed")
    },
    methods:{
      init:function(){
        document.getElementById("play-audio").src=this.currentmusicurl;
        document.getElementById("play-audio").addEventListener("timeupdate",this.timeupdate)


      },
      fetchmusic:function(id){
        this.currentlyric=0;
        document.querySelector("#lrc-wrap-inner").style.top=1.6+'rem';
         var _that=this;
           axios.get('http://127.0.0.1:3000/music/url?id='+id,{withCredentials:true},{
            'Content-Type':'application/x-www-form-urlencoded'
        }).then(function(response){
        
              _that.currentmusicurl='http://music.163.com/song/media/outer/url?id='+response.data.data[0].id+'.mp3';
              document.querySelector("#play-audio").setAttribute("src",_that.currentmusicurl)
              _that.init();
             

            
            }

          ).catch(function(error){
            console.log(error)
          })
        axios.get('http://127.0.0.1:3000/lyric?id='+id,{withCredentials:true},{
            'Content-Type':'application/x-www-form-urlencoded'
        }).then(function(response){
              console.log(response)


              var lyriclist=response.data.lrc.lyric.split("\n");
              var lrc=[];
              lyriclist.forEach((a,index)=>{
                let lrcarr=a.split("]");
                let lrcobj={};
                lrcobj.time=lrcarr[0].replace("[","");
                 lrcobj.content=lrcarr[1];
                 lrcobj.classColor="";
                
                if(lrcobj.content!=null&&lrcobj.content!=""&&lrcobj.content!=undefined)
                {
                    lrc.push(lrcobj)
                }
               

               
                 if(index==lyriclist.length-1)
                 {
                   _that.lyric=lrc;

                 }
              })

             
            }

          ).catch(function(error){
            console.log(error)
          })
     
      },
      timeupdate(){
          // if(document.getElementById("play-audio").currentTime)
          // {

             this.duration= document.getElementById("play-audio").duration;
              this.current=document.getElementById("play-audio").currentTime;
             

             if(this.currentlyric>=this.lyric.length)
             {
               if(document.getElementById("play-audio").ended)
              {
                this.next();
              }
              return false;
             }
              // console.log(this.lyric.length)
              if(this.lyric.length==null||this.lyric.length==undefined){
                   if(document.getElementById("play-audio").ended)
                    {
                      this.next();
                       return false;
                    }

              }else{
                 var oldtime=this.lyric[this.currentlyric].time.split(":");
                var str=parseInt(oldtime[0]*60)+parseInt(oldtime[1])
                var changetime=this.current-str;
              }
             
              // 
              if(changetime>0||changetime==0)
              {
                this.currentline=this.currentlyric;
                document.querySelector("#lrc-wrap-inner").style.top=-this.currentline*0.8+1.6+'rem';
                this.currentlyric+=1;

              }
             
             
          // }
      },
      play(){
        if(this.playing)
        {
          this.playing=false;
           document.getElementById("play-audio").pause();
         }else{
           this.playing=true;
           document.getElementById("play-audio").play();
          this.duration= document.getElementById("play-audio").duration;

         }
      
      },
      prev(){
        var number=--this.currentIndex;

          if(number<0)
          {
            number=0;
            this.currentIndex=number;
          }

        
             this.item=this.$store.state.playlist[number];
            this.fetchmusic(this.$store.state.playlist[number].id)
        
         

      },
      next(){
         var number=++this.currentIndex;

          if(number<this.$store.state.playlist.length-1)
          {
            
            this.currentIndex=number;
             this.item=this.$store.state.playlist[number];
             this.$store.commit("AddHistory",this.$store.state.playlist[number]);
             this.fetchmusic(this.$store.state.playlist[number].id)
          
          }else{

            this.currentIndex=--number;
             this.item=this.$store.state.playlist[this.currentIndex+1];
              this.$store.commit("AddHistory",this.$store.state.playlist[number+1]);
             this.fetchmusic(this.$store.state.playlist[number+1].id)
           
          }
         
      }

    }

  }
</script>
<style  scoped>
/*//scoped只对当前代组件有效*/
  

</style>