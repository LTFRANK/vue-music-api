<template>
	<div class="list">
		<ol>
			<li v-for="item in playlist" @click="playthis(item)">
				<div class="desc">
					<h2>{{item.name}}</h2>
					<span>{{item.artists[0].name}}</span>
				</div>
				<div class="head-icon">
					<img :src="item.album.picUrl">
				</div>
				<span class="durtion">{{parseInt(item.duration/1000/60)>10?parseInt(item.duration/1000/60):0+''+parseInt(item.duration/1000/60)}}:{{parseInt(item.duration/1000%60)>10?parseInt(item.duration/1000%60):0+''+parseInt(item.duration/1000%60)}}</span>
			</li>
		</ol>
	</div>
</template>
<script >
import '../assets/css/font-awesome.css'
 import '../assets/css/app.css'
 import axios from "axios"
 import $ from "jquery"
export default{
	name:"searchlist",
	data(){

		return{
			playlist:[],
			currentindex:0,
			duration:0,
			playing:true
		}

	},
	mounted(){
		console.log(this.$store.state.playlist);
		this.playlist=this.$store.state.playlist;
		console.log(this.playlist)
			
	},
	methods:{
		//方法
		//子组件通过$emit调用父组件方法 this.$emit(fn,"data")
		playthis:function(item){
			this.$store.commit("AddHistory",item);
			this.$router.push("/list/"+item.id)

		}

	},
	props:{
		//验证父组件传递的是否合法类型
		
	}
	
}

</script>
<style type="text/css"></style>