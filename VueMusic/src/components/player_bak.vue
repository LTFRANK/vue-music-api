<template>
  <div class="player">
      <audio  crossOrigin="anonymous" id="play-audio" :src="item.src" autoplay>
       
      </audio>
      <div class="music-desc">
        
            <div class="artist-poster">
              <transition >
                <img :src="item.poster" :style="{transform:'rotate('+(current/duration*360*2)+'deg)'}">
              </transition>
            </div>
           
          <h2>{{item.filename}}</h2>
          <h3>{{item.artist}}</h3>
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
	export default {
  	name: 'player_bak',
   	data(){ 
   		return{
        item:{},
        currentIndex:0,
        playing:false,
        duration:0,
        current:0
   		} 
   	},
   	mounted(){
      var that=this;
      var id=this.$route.params.id;
    
      this.$store.state.musiclist.forEach((a,index)=>{
        if(id==a._id)
        {
          that.item=a;
          that.currentIndex=index;
         
          that.init()
        }

      })

   	},
    beforeDestroy(){
        //用queryselector  不能用getElement
       this.$el.querySelector("#play-audio").removeEventListener("timeupdate",this.timeupdate)
    },
    destroyed(){

       console.log("destroyed")
    },
    methods:{
      init(){
        this.playing=true;
        var that=this;
        document.getElementById("play-audio").src=this.item.src;
        document.getElementById("play-audio").addEventListener("timeupdate",this.timeupdate)
      },
      timeupdate(){
          if(document.getElementById("play-audio").currentTime)
          {
               this.duration= document.getElementById("play-audio").duration;
              this.current=document.getElementById("play-audio").currentTime;
              var changetime=this.duration-this.current;
        
              if(document.getElementById("play-audio").ended)
              {
                this.next();
              }
          }
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
          this.item=this.$store.state.musiclist[number];
           this.duration= document.getElementById("play-audio").duration;
          this.playing=true;
      },
      next(){
         var number=++this.currentIndex;

          if(number<this.$store.state.musiclist.length-1)
          {
            
            this.currentIndex=number;
             this.item=this.$store.state.musiclist[number];
            this.playing=true;
             this.duration= document.getElementById("play-audio").duration;
          }else{

            this.currentIndex=--number;
             this.item=this.$store.state.musiclist[this.currentIndex];
              this.duration= document.getElementById("play-audio").duration;
              this.playing=true;
          }
         
      }

    }

	}
</script>
<style  scoped>
/*//scoped只对当前代组件有效*/
	

</style>