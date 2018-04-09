<template>
	<div class="list">
		<ol>
			<li v-for="item in list" @click="playthis(item)">
				<div class="desc">
					<h2>{{item.filename}}</h2>
					<span>{{item.artist}}</span>
				</div>
				<div class="head-icon">
					<img :src="item.poster">
				</div>
				<span class="durtion">{{item.duration}}</span>
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
	name:"list",
	data(){

		return{
			list:[]
		}

	},
	mounted(){
		var list=[{
				_id:"1",
				filename :" 刚好遇见你 ",
				src:'/static/music/append.mp3',
				artist :" 李玉刚 ",
				duration :"03:19",
				poster :"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=c25c794180025aafd73279c9cbecab8d/b999a9014c086e060eda00ca00087bf40bd1cbc4.jpg"
			},
			{
				_id :"2",
				filename:" 大哥 ",
				src:'/static/music/brother.mp3',
				artist:" 卫兰 ",
				duration:"03:55",
				poster:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=c25c794180025aafd73279c9cbecab8d/b999a9014c086e060eda00ca00087bf40bd1cbc4.jpg"
			},
			{
				_id:"3",
				filename:" 你瞒我瞒 ",
				src:'/static/music/joke.mp3',
				artist:" 陈柏宇 ",
				duration:"03:19",
				poster:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=c25c794180025aafd73279c9cbecab8d/b999a9014c086e060eda00ca00087bf40bd1cbc4.jpg"
			},
			{
				_id:"4",
				filename:"小幸运",
				src:'/static/music/luck.mp3',
				artist:"谭家仪",
				duration:"04:18",
				poster:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=c25c794180025aafd73279c9cbecab8d/b999a9014c086e060eda00ca00087bf40bd1cbc4.jpg"
			},
			{
				_id:"5",
				filename:"傻女",
				src:'/static/music/stupid girl.mp3',
				artist:"卫兰",
				duration:"03:19",
				poster:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=c25c794180025aafd73279c9cbecab8d/b999a9014c086e060eda00ca00087bf40bd1cbc4.jpg"
			}];

	
			this.list=list;
			this.$store.commit({type:"ADD"});
			this.$store.commit("MUSIC",list);
			console.log(this.$store.state.musiclist)
			
	},
	methods:{
		//方法

		//子组件通过$emit调用父组件方法 this.$emit(fn,"data")
		playthis:function(item){

			this.$router.push("/player_bak/"+item._id)

		}

	},
	props:{
		//验证父组件传递的是否合法类型
		
	}
	
}

</script>
<style type="text/css"></style>