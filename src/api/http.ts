import {
	BASE_URL
} from '@/common/ts/variable';
import {
	getServeIP
} from '@/common/ts/common';
import store from '@/store'
/**
 * 定义请求
 * @param config HTTPCONFIG类型
 */
export const HTTP = (config: HTTPCONFIG): any => {
	uni.showLoading({
		title: '请求中',
		mask: true
	});
	// config.$KModel.showModel();
	let url: string = getServeIP();
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + BASE_URL + config.url,
			// url: 'http://wthrcdn.etouch.cn/weather_mini',
			data: config.bodyPrama || {},
			method: "POST",
			timeout: 60, //超时时间
			header: {
				"Accept": "application/json",
				"Authorization": store.state.token,
				"Content-Type": "application/json"
			},
			success: (res: any) => {
				console.log("url", url + BASE_URL + config.url)
				console.log("bodyParma", config.bodyPrama)
				console.log("返回结果", res.data)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err.errMsg)
				uni.showModal({
					title: '提示',
					content: '请求失败，请稍后重试',
					showCancel: false
				});
			},
			complete: function () {
				setTimeout(() => {
					// config.$KModel.showModel();
					uni.hideLoading()
				}, 1000);
			}
		});
	})
}
/**
 * 处理请求函数
 * @param config 参数
 * @param failFn   data 传入的数据  失败回调函数
 */
export const HTTPHandle = (config: HTTPCONFIG, failFn: any = (data: any = {}) => {}): any => {
	return new Promise((resolve, reject) => {
		HTTP(config)
			.then((res: any) => {
				if (res.error !== null) {
					// config.$KModel.showModel();
				} else if (res.result.isSuccess) {
					// } else if (res !== null) {
					resolve(res.result)
				} else {
					failFn(res.result)
					uni.showModal({
						title: '提示',
						content: res.result.failMessage,
						showCancel: false
					});
				}
			})

	})
}

/**
 * 定义请求
 * 不带token
 * @param config HTTPCONFIG类型
 */
export const HTTPNotToken = (config: HTTPCONFIG): any => {
	// config.$KModel.showModel();
	uni.showLoading({
		title: '请求中',
		mask: true
	});
	let url: string = getServeIP();
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + BASE_URL + config.url,
			// url: 'http://wthrcdn.etouch.cn/weather_mini',
			data: config.bodyPrama || {},
			method: "POST",
			timeout: 60, //超时时间
			header: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			success: (res: any) => {
				console.log("url", url + BASE_URL + config.url)
				console.log("bodyParma", config.bodyPrama)
				console.log("返回结果", res.data)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err.errMsg)
				uni.showModal({
					title: '提示',
					content: '请求失败，请稍后重试',
					showCancel: false
				});
			},
			complete: function () {
				setTimeout(() => {
					uni.hideLoading()
					// config.$KModel.closeModel();
				}, 1500);
			}
		});
	})
}
/**
 * 处理请求函数
 * @param config 参数
 * @param failFn   data 传入的数据  失败回调函数
 */
export const HTTPNotTokenHandle = (config: HTTPCONFIG, failFn: Function = (data: any = {}) => {}): any => {
	return new Promise((resolve, reject) => {
		HTTPNotToken(config)
			.then((res: any) => {
				if (res.error !== null) {
					uni.showModal({
						title: '提示',
						content: res.error.message,
						showCancel: false
					});
					// } else if (res.result.isSuccess) {
				} else if (res.result !== null) {
					resolve(res.result)
				} else {
					failFn(res.result)
					uni.showModal({
						title: '提示',
						content: res.result.failMessage,
						showCancel: false
					});
				}
			})
	})
}