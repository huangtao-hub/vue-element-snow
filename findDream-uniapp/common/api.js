import store from '../store/index';
export default {

	BASEURI: 'http://pl55d74.nat.ipyingshe.com/',
	ESURI: 'http://localhost:8081/api/',

	es: {
		searchList: 'search',
	},
	/**
	 * 登录接口
	 */
	login: {
		submitLocaltion:'single/home/submitLocaltion',
		login: 'wx/auth/login',
		appletLogin_by_weixin: 'applet/login_by_weixin', // 登录(手机号:phone 密码:password)
		currentUser: "api-uaa/oauth/member/userinfo",
		simpleReg: 'api-uaa/oauth/user/reg/token', // 登录(手机号:phone 密码:password)

		updatePassword: 'notAuth/home/updatePassword',
		loginByCode: 'notAuth/home/loginByCode', // 手机和验证码登录
		reg: 'notAuth/home/reg', // 注册
		sendCodes: 'notAuth/home/sms/codes', // 获取验证码
	},
	task: {
		taskList: '/wx/task/index' ,//任务列表
		taskDetail: '/wx/task/index', // 查询任务详情信息
		createTask: '/wx/task/add', //创建任务
		deleteTask: '/wx/task/delete', // 删除任务
		updateTask: '/wx/task/update', //修改任务信息
	},
	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiCall(method, endpoint, data, load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		let fullurl = this.BASEURI + endpoint;
		let Authorization;
		const userToken = uni.getStorageSync('userToken');
		if (userToken) {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo && userInfo.id) {
				let mid = userInfo.id;
				if (mid) {
					data.memberId = mid;
					Authorization = userToken.token_type + " " + userToken.access_token;
				}
			}

		}
		console.log(userToken);
		if (endpoint == 'api-uaa/oauth/user/ums/token') {
			let [error, res] = await uni.request({
				url: fullurl,
				data: data,
				method: method,
				header: {

					'client_id': 'app',
					'client_secret': 'app',
					'storeid': 1,
					//	'Content-Type': 'application/x-www-form-urlencoded',
					// 'content-type': 'application/json',
					'Authorization': Authorization || ''
				},
			});
			if (!load) {
				uni.hideLoading();
			}
			console.log(res);
			if (res.data.message == 'User token expired!') {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: `/pages/public/login`
				})
			}
			if (res.data.message == '请先登录') {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: `/pages/public/login`
				})
			}
			return res.data;
		} else {
			let [error, res] = await uni.request({
				url: fullurl,
				data: data,
				method: method,
				header: {
					//      'content-type': 'application/x-www-form-urlencoded',
					'client_id': 'app',
					'client_secret': 'app',
					'storeid': 1,
					// 'Content-Type': 'application/x-www-form-urlencoded',
					// 'content-type': 'application/json',
					'Authorization': Authorization || ''
				},
			});
			if (!load) {
				uni.hideLoading();
			}

			console.log(fullurl);
					console.log(res);
			if (res.data.resp_code == 401) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: `/pages/public/login`
				})
			}
			if (res.data.message == '请先登录') {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: `/pages/public/login`
				})
			}
			return res.data;
		}




	},
	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiEsCall(method, endpoint, data, load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}

		let fullurl = this.ESURI + endpoint;
		//let fullurl = 'http://localhost:8085/api/' + endpoint;
		let Authorization = `${store.state.userInfo.tokenHead}${store.state.userInfo.token}`;
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				// 'Content-Type': 'application/x-www-form-urlencoded',
				// 'content-type': 'application/json',
				'Authorization': Authorization || ''
			},
		});
		console.log(error);
		if (!load) {
			uni.hideLoading();
		}
		return res.data;

	},
}
