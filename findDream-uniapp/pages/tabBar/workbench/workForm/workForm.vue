<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">任务名</text>
			<input class="input" type="text" v-model="Task.tsskName" placeholder="任务名称" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">内容</text>
			<input class="input" type="text" v-model="Task.specifications" placeholder="任务内容" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">完成时间</text>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="Task.finishTime" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{Task.finishTime}}</view>
				</picker>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">权重</text>
			<input class="input" type="number" v-model="Task.price" placeholder="任务权重" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{Task.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">分类</text>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
					</label>
				</checkbox-group>
			</view>
			</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="Task.defaule" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
		import Api from '@/common/api';
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				Task: {
					tsskName: '',
					specifications: '',
					finishTime:  getDate({
					format: true
				}),
					price: '12',
					area: '',
					default: false
				},
				startDate:getDate('start'),
				endDate:getDate('end'),
				date: getDate({
					format: true
				})
			}
		},
		onLoad(option){
			let title = '新增任务';
			if(option.type==='edit'){
				title = '编辑任务'
				this.addressData = JSON.parse(option.data)
			} 
			if(option.type==='detail'){
				title = '查看任务'	
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		mounted() {
			this.findList()
		},
		methods: {
			 findList() {
				let params = { tsskName: this.Task.tsskName, specifications: this.Task.specifications,price: this.Task.price,userId: '7' };
				let data =  Api.apiCall('post', Api.task.createTask, params);
				// this.dataList = data.data
				console.log(data.data,'0000000');
				if (data) {
			        
				}
			},
			switchChange(e){
				this.addressData.default = e.detail;
			},
			bindDateChange: function(e) {
				this.Task.finishTime = e.detail.value
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.Task;
				if(!data.tsskName){
					this.$api.msg('任务名不能为空');
					return;
				}
				// if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
				// 	this.$api.msg('请输入正确的手机号码');
				// 	return;
				// }
				if(!data.specifications){
					this.$api.msg('任务内容不能为空');
					return;
				}
				// if(!data.area){
				// 	this.$api.msg('请填写门牌号信息');
				// 	return;
				// }
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				this.findList()
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 50upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
