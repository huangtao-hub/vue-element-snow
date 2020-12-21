<template>
	<view>
		<view >
			<view class="logo">
				<image class="img" src="/static/login.png"></image>
			</view>
			
			<!-- 账号密码输入框 -->
			<view class="form">
				<view class="text-box" >
				
					<text>{{text}}</text>
				</view>
				<view class="username">
					<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
				</view>
				<view class="password">
					<input placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
				</view>
				<view class="btn" @tap="doLogin">登 录</view>
				<view class="res">
					<view @tap="toPage('register')">用户注册</view>
					<view @tap="toPage('resetpasswd')">忘记密码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/common/api';
	import store from '@/store/index';
	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				text: 'hello',
				username: '123456',
				password: 'user123',
				logining: false
			}
		},
		methods: {
	        toPage(page){
				uni.hideKeyboard()
				uni.navigateTo({
					url: page
				});
			},
			async doLogin() {
				this.logining = true;
				let params = { username: this.username, password: this.password };
				let data = await Api.apiCall('post', Api.login.login, params);
				this.logining = false;
				console.log(data,'223');
				uni.navigateTo({
					url: 'pages/tabBar/index/index'
				});
				if (data) {
					uni.showToast({title: '登录成功',icon:"success"});
					uni.setStorageSync('userToken', data.token);
					// let params = { username: this.username };
					// let data1 = await Api.apiCall('get', Api.member.memberDetail, params);	
					uni.setStorageSync('userInfo', data.data.userInfo);
				
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #f06c7a 0%, #f06c7a 100%);
		height: 100%;
	}
	.icon {
			color:#ffffff;
		}
	.logo {
		width: 100%;
		height: 45vw;
		display: flex;
		justify-content: center;
		align-items: center;
		.img {
			width: 25%;
			height: 25vw;
	
			image {
				width: 100%;
				border-radius: 100%;
			}
		}
	}
	.form {
		width: 86%;
		padding: 0 7%;
		font-size: 30upx;
		.username,
		.password,
		.code {
			width: calc(100% - 90upx);
			height: 90upx;
			display: flex;
			align-items: center;
			border-radius: 45upx;
			background-color: rgba($color: #ffffff, $alpha: 0.1);
			padding: 0 45upx;
			margin-bottom: 26upx;
			input {
				width: 100%;
				height: 50upx;
				color: rgba($color: #ffffff, $alpha: 0.8);
				font-weight: 200;
			}
		}
	
	    .text-box {
			    display: flex;
			    align-items: center;
			    padding: 0 45upx;
			    width: calc(100% - 90upx);
			    margin-bottom: 26upx;
			    margin: 0px;
			    color: beige;
			    margin-left: 36%;
			    font-size: 20px;
			    margin-bottom: 8px;
		}
		.btn {
			color: #f06c7a;
			width: 100%;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 45upx;
			background-color: #fff;
			font-size: 40upx;
		}
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
		}
	}
</style>
