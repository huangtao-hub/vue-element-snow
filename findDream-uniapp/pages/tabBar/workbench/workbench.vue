<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon location"></view>
				{{ city }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">
				<!-- <view class="icon yuyin-home"></view> -->
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- <uni-section class="title-work" title="今日任务" type="line" @click="findList"></uni-section> -->
		<!-- <button class="mini-btn" type="primary"size="mini" @click="findList">刷新</button> -->
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item, index) in dataList" :right-options="options" :key="item.id" @change="swipeChange($event, index)"
			 @click="swipeClick($event, index)">
				<view class="uni-list-full">
					<uni-list>
						<uni-list-chat :title="item.tsskName" :avatar="item.picUrl" :note="item.specifications" :time="item.finishTime"
						 :clickable="true" :badge-text="item.taskSn" @click="textClick(item.tsskName,item)"></uni-list-chat>
					</uni-list>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<!-- <button class="confirm-btn" @click="findList">刷新</button> -->

	</view>
</template>

<script>
	import Api from '@/common/api';
	import store from '@/store/index';
	export default {
		data() {
			return {
				city: '远方',
				showHeader: true,
				afterHeaderOpacity: 1, //不透明度
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				nVueTitle: null,
				options: [{
						text: '修改'
					},
					{
						text: '完成',
						style: {
							backgroundColor: 'rgb(254,156,1)'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}
				],
				options2: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '确认',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				swipeList: [],
				dataList: []
			}
		},
		onReady() {
			// 模拟延迟赋值
			// setTimeout(() => {
			// 	this.isOpened = 'right';
			// }, 1000);
			this.findList()
		},
		methods: {

			//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
			onPullDownRefresh() {
				setTimeout(function() {
				
					uni.stopPullDownRefresh();
					uni.navigateTo({
						url: '/pages/tabBar/workbench'
					})
				}, 1000);
			},
			toMsg() {
				console.log('scan');
				uni.navigateTo({
					url: '/pages/tabBar/workbench/workForm/workForm'
				})
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					console.log('scan');
					uni.navigateTo({
						url: '/pages/tabBar/workbench/workForm/workForm'
					})
				} else if (index === 1) {
					// // #ifdef APP-PLUS
					// const pages = getCurrentPages();
					// const page = pages[pages.length - 1];
					// const currentWebview = page.$getAppWebview();
					// currentWebview.hideTitleNViewButtonRedDot({
					// 	index
					// });
					// // #endif
					// uni.navigateTo({
					// 	url: '/pages/notice/notice'
					// })
				}
			},
			async findList() {
				let params = {
					username: this.username,
					password: this.password
				};
				let data = await Api.apiCall('post', Api.task.taskList, params);
				this.dataList = data.data.list
				console.log(data.data, '0000000');
				if (data) {

				}
			},
			swipeChange(e, index) {
				console.log('返回：', e);
				console.log('当前索引：', index);
			},
			textClick(e, index) {
				console.log('返回：', e);
				console.log('当前索引：', index);
			},
			swipeClick(e, index) {
				console.log('click');
				let {
					content
				} = e;
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: res => {
							if (res.confirm) {
								this.swipeList.splice(index, 1);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '添加') {
					if (this.swipeList.length < 10) {
						this.swipeList.push({
							id: new Date().getTime(),
							options: [{
									text: '置顶'
								},
								{
									text: '标记为已读',
									style: {
										backgroundColor: 'rgb(254,156,1)'
									}
								},
								{
									text: '删除',
									style: {
										backgroundColor: 'rgb(255,58,49)'
									}
								}
							],
							content: '新增' + new Date().getTime()
						});
						uni.showToast({
							title: `添加了一条数据`,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: `最多添加十条数据`,
							icon: 'none'
						});
					}
				} else {
					uni.showToast({
						title: `点击了${e.content.text}按钮`,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content-text {
		font-size: 15px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}

	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}

	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}

	.title-work {
		// margin-top: 200rpx;
		color: #4CD964;
		font-size: 16px;
	}

	.uni-list-full {
		width: 100%;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;

		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.mini-btn{
		margin-top: 154upx;
		height: 80rpx;
	}
</style>
