<template>
	<div id="search-wrap" v-show="isShow">
        <div id="search-content">
          <div class="pull-left search-back" @click="searchBack"><i class="fa fa-chevron-left"></i></div>
          <div class="pull-left search-text">
            <input type="text" placeholder="歌曲名字" id="seacr-name">
          </div>
           <div class="pull-left search-go" @click="searchGo">确定</div>
        </div>
    </div>

</template>
<script type="text/javascript">
	import '../assets/css/font-awesome.css'
  import '../assets/css/app.css'
    import axios from "axios"
 export default{
	name:"search",
	data(){
		return {
			
		}
	},
	mounted(){	
	},
	methods:{
		//方法
		//子组件通过$emit调用父组件方法 this.$emit(fn,"data")
		 searchGo:function(){
		      var value=this.$el.querySelector("#seacr-name").value;

		      if(value!=""&&value!=null&&value!=undefined)
		      {

			      	axios.get('http://localhost:3000/search?keywords='+value,{withCredentials:true},{
			            'Content-Type':'application/x-www-form-urlencoded'
			        }).then((response)=>{
			        this.$store.commit("SHOWSEARCH",true);
			        
			        document.querySelector("#search-wrap").setAttribute("class","hide")
			       	this.$store.commit("PLAYLIST",response.data.result.songs);
			       	this.$router.push("/playlist/"+value);


			      }).catch((error)=>{

			      })

		      }
		      

   		 },
   		 searchBack:function(){
   		 	
   		 	this.$emit("toggleShow",true);
   		 
   		 	// this.$store.commit("SHOWSEARCH",!isShow);
   		 	
   		 }

	},
	props:{
		isShow:Boolean
	}
	
	
}



</script>
<style type="text/css"></style>