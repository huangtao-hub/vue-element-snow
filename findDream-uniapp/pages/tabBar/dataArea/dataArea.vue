<template>
	<view class="qiun-columns">
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
			<!--#endif-->
		</view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<!-- 三大数据 -->
			<view class="balance-info">
				<view class="left">
					<view class="box">
						<view class="num">{{user.integral}}</view>
						<view class="text">任务</view>
					</view>
					<view class="box">
						<view class="num">{{user.envelope}}</view>
						<view class="text">笔记</view>
					</view>
					<view class="box">
						<view class="num">{{user.balance}}</view>
						<view class="text">余额</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 更多 -->
		<view class="content">
			<view class="list">
				<view class="row">
					<view class="title">能力雷达</view>
					<view class="right">
						<view class="tis">
							<image src="/static/img/face.jpg" mode="widthFix"></image>
						</view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">收支统计</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">任务概况</view>
					<view class="right">
						<view class="tis">这人太懒了，什么都不写</view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">甜蜜值</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">账户安全</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">通知提醒</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">支付设置</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">通用</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">版本升级</view>
					<view class="right">
						<view class="tis">v1.0.0</view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">清除缓存</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">问题反馈</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
				<view class="row">
					<view class="title">关于商城</view>
					<view class="right">
						<view class="tis"></view>
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaGauge = null;

	export default {
		data() {
			return {
				headerTop: "274px",
				headerPosition: "inherit",
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				gaugeWidth: 15,
				type: 'default',
				orderbyList: [{
						text: "销量",
						selected: true,
						orderbyicon: false,
						orderby: 0
					},
					{
						text: "价格",
						selected: false,
						orderbyicon: ['sheng', 'jiang'],
						orderby: 0
					},
					{
						text: "好评",
						selected: false,
						orderbyicon: false,
						orderby: 0
					}
				],
				user: {
					username: '游客1002',
					face: '/static/img/face.jpg',
					signature: '点击昵称跳转登录/注册页',
					integral: 40,
					balance: 99,
					envelope: 20
				},
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			// uni.getSystemInfo({
			// 	success: function (res) {
			// 		if(res.pixelRatio>1){
			// 			//正常这里给2就行，如果pixelRatio=3性能会降低一点
			// 			//_self.pixelRatio =res.pixelRatio;
			// 			_self.pixelRatio =2;
			// 		}
			// 	}
			// });
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();


		},
		methods: {
			getServerData() {
				let Gauge1 = {
					categories: [{
							"_endAngle_": 1.05,
							"_startAngle_": 0.75,
							"color": "#1890ff",
							"value": 0.20000000000000001
						},
						{
							"_endAngle_": 1.9500000000000002,
							"_startAngle_": 1.05,
							"color": "#2fc25b",
							"value": 0.80000000000000004
						},
						{
							"_endAngle_": 0.25,
							"_startAngle_": 1.9500000000000002,
							"color": "#f04864",
							"value": 1
						}
					],
					series: [{
						"_endAngle_": 1.74,
						"_oldAngle_": 0.75,
						"_proportion_": 0.80823625499999996,
						"color": "#0055ff",
						"data": 0.7,
						"index": 0,
						"legendShape": "circle",
						"name": "完成率",
						"pointShape": "circle",
						"show": true,
						"type": "gauge"

					}]
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				_self.showGauge("canvasGauge", Gauge1);
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		console.log(res.data)
				// 		let Gauge={categories:[],series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		Gauge.categories=res.data.data.Gauge.categories;
				// 		Gauge.series=res.data.data.Gauge.series;
				// 		_self.textarea = JSON.stringify(res.data.data.Gauge);
				// 		_self.showGauge("canvasGauge",Gauge);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
			showGauge(canvasId, chartData) {
				canvaGauge = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'gauge',
					fontSize: 11,
					legend: {
						show: false
					},
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: '#666666',
						fontSize: 25 * _self.pixelRatio,
						offsetY: 50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: -50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge: {
							type: 'default',
							width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 0,
							endNumber: 100,
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
								color: '#FFFFFF',
								childNumber: 5,
								childWidth: _self.gaugeWidth * 0.4 * _self.pixelRatio, //仪表盘背景的宽度
							},
							pointer: {
								width: _self.gaugeWidth * 0.8 * _self.pixelRatio, //指针宽度
								color: 'auto'
							}
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
				});
				this.type = 'progress';
				console.log(this.type);
				canvaGauge.opts.extra.gauge.type = this.type;
				canvaGauge.opts.title.fontSize = 35 * _self.pixelRatio;
				canvaGauge.opts.title.offsetY = 0;
				canvaGauge.opts.subtitle.offsetY = 0;
				canvaGauge.updateData({});
			},
			select(index) {
				// let tmpTis = this.orderbyList[index].text+"排序 "
				// if(this.orderbyList[index].orderbyicon){
				// 	let type = this.orderbyList[index].orderby==0?'升序':'降序';
				// 	if(this.orderbyList[index].selected){
				// 		type = this.orderbyList[index].orderby==0?'降序':'升序';
				// 		this.orderbyList[index].orderby = this.orderbyList[index].orderby==0?1:0;
				// 	}
				// 	tmpTis+=type
				// }
				// this.orderbyList[index].selected = true;
				// let len = this.orderbyList.length;
				// for(let i=0;i<len;i++){
				// 	if(i!=index){
				// 		this.orderbyList[i].selected = false;
				// 	}
				// }
				// uni.showToast({title:tmpTis,icon:"none"});
				console.log(index);
			},
			changeData() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #000000;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #000000;
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: inherit;
		top: 0;
		z-index: 10;
		background-color: #000000;
		border-bottom: solid 1upx #eee;

		.target {
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #ffffff;

			&.on {
				color: #66ffa6;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}


		}
	}

	.balance-info {
		display: contents;
		padding: 10upx 0;

		.left {
			width: 100%;
			display: contents;

			.box {
				width: 100%;
				font-size: 28upx;

				.num {
					width: 100%;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					color: #f9a453;
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					color: #ffffff;
					font-size: 28upx;
				}
			}
		}
	}

	.icon {
		font-size: 30upx;

	}

	.content {
		padding-bottom: 20upx;

		.list {
			width: 96%;
			padding-left: 4%;
			background-color: #fff;
			margin-bottom: 20upx;

			.row {
				widows: 100%;
				min-height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1upx #eee;

				&:last-child {
					border-bottom: none;
				}

				.title {
					font-size: 32upx;
					color: #333;
				}

				.right {
					display: flex;
					align-items: center;
					color: #999;

					.tis {
						font-size: 26upx;
						margin-right: 5upx;
						max-height: 120upx;

						image {
							width: 100upx;
							height: 100upx;
							border-radius: 100%;
							margin: 10upx 0;
						}
					}

					.icon {
						width: 40upx;
						color: #cecece;
					}
				}
			}
		}
	}
</style>
