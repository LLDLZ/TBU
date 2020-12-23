<template>
	<view class="loading-container" v-if="showLoadModel">

		<view class="my-loading-line" v-if="style_ === 'line'" :style="[shadeStyle]">
			<view class="translate-line">
				<view class="line"></view>
				<view class="line"></view>
				<view class="line"></view>
				<view class="line"></view>
				<view class="line"></view>
				<view class="line"></view>
			</view>
			<view class="gray-text">{{ `${loadingNmme}` }}</view>
		</view>
		
		<view class="my-loading" v-else-if="style_ === 'circle'"  :style="[shadeStyle]">
			<image class="image" v-if="icon_" :src="icon_" mode="aspectFit"></image>
			<view class="gray-text">{{ `${loadingNmme}` }}</view>
		</view>

		<view class="my-loading-success" v-else-if="style_ === 'success'||'error'||'warn'" :style="[shadeStyle]">
			<text class="my-icons icon-success" v-if="style_ === 'success'" style="color: #4cd964;font-size: 60rpx;"></text>
			<text class="my-icons icon-error" v-if="style_ === 'error'" style="color: #dd524d;font-size: 60rpx;"></text>
			<text class="my-icons icon-warn" v-if="style_ === 'warn'" style="color: #f0ad4e;font-size: 60rpx;"></text>
			<view class="gray-text">{{ `${loadingNmme}` }}</view>
			<view class="white-view"></view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'k-loading',
		data() {
			return {
				showLoadModel: false,
				loadingNmme: '',
				icon_: '',
				shade_: true,
				style_: ''
			};
		},
		computed: {
			shadeStyle() {
				const style = {}
				if (this.shade_) {
					style['box-shadow'] = '0 0 0rpx 2000rpx rgba(0, 0, 0, 0.5)'
				}
				return style
			}
		},
		methods: {
			showModel(config) {
				const {
					type,
					title,
					icon,
					shade,
					style,
					duration
				} = config || { type: "loading", style: "line", title: "加载中..." }

				if (!type || type === 'toast') {
					uni.showToast({
						icon: 'none',
						title: title || '提示',
						position: 'bottom',
						duration: duration
					})
					return
				}

				if (shade === 'false' || shade === false) {
					this.shade_ = false
				} else {
					this.shade_ = true
				}

				if (type) {
					this.icon_ = icon || ''
					this.showLoadModel = true;

					switch (type) {
						case 'loading':
							this.loadingNmme = title || '加载中...';
							this.style_ = style || 'line'
							this.closeOutTimer(duration)
							return;
						case 'success':
						case 'error':
						case 'warn':
							this.loadingNmme = title || '提示';
							this.style_ = type
							this.closeOutTimer(1000)
							return;
						default:
							return;
					}
				}
			},
			closeModel() {
				this.showLoadModel = false;
			},
			closeOutTimer(time) {
				const that = this
				if (that.closeTimer) {
					clearTimeout(that.closeTimer)
				}
				// console.log("我执行了")
				that.closeTimer = setTimeout(function() {
					// 最多执行 60s
					that.closeModel()
				}, time || 60000)
			}
		}
	};
</script>
<style scoped>
	@font-face {
		font-family: "my-icons";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM4AAsAAAAAB0QAAALrAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqCCIFxATYCJAMQCwoABCAFhG0HQBtbBsgusG3Y04oZ6O7gmib9sAriwLgQD/+tvd43M/uzIVSgAGVOLLAEUkAllqir6lHZGgPk2Yg//P7yrKgKdykUGNvS3p+cwLq0XZ6YICVurWUe0Ki8IpKvEFr2O3vZO84vlJSo63iy7YAEkXopnPzv83/v+P9flsC8luUy1rQxhr4TBRilaWBjTUooLRBsmF6+wIE4TqDNKDH4mvn0CFWFHheIuylfQLUQVBSWqYVGw9JyDB+BVqdXaR94Hf0+/psEjqTK9NTt62sPZr+Yn/YMmoA3cIKWOw0qZMyBKcTNRv+FQpKcg9TGexctgKnVEkt18D7tzZGTA8tMgDT5z4sGXd4B5mEq84vpRCR+8XSaDHao/ICjCqhRYQW4oDnDPjUJqRe2xKejz9ZP59Y3t+Gjzwvb268Ie+MPWuvjR9Vv3woQxLxvsNovStBP/zokjPwfg5P+M+jU/vXJ/uG075h9/uBYrRhZs93M70y8qVP432N+WSyuL4Tm0Hu/13ZaPL7cbvPyRrgFWozpPKFSBGuqik+3pr5ZWDS4VcQWlmsqoSTtDXsI0GxF15Ag4p3kRpZ5QQrj5XAE1S6JdEpVXiVevO1n+o8MqaYp/qBisOJX51U1GBCohAo6SmkKQOHsIjYOT44ntBkXPzhLn8clzINv4Q11QcGQtBhBVhujCnsOlXbzaKgtos0sy+p2/coKorRiRidA6NFA0uUjsh4HVGE/oDLkGw09gUSbw2Bu2W4iUgRDmYQjD8MfmJKcKety9bjynvyXRJi8KuI+k7FhBBWDUTmzpYzMEjMqr/6k6hTGDadoBqdRkjAWDUck3SDp3HUqG6qmNw0inELdKoMIDvGgsA8oRWIZFbR26pXv3yO+FwnBdBC5+DNiWGH3SEFKPoDa6rNBxKO8UvHKN1HlKCjOYClkBl6SmCRDxeZBESI5A8kJ8aspGWoWH6ofbG9Mf6CMNaDvLZEiR4lKy5OalGRtKVY2bIpNIZMBAAA=') format('woff2');
	}

	.my-icons {
		font-family: "my-icons" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-success:before {
		content: "\e656";
	}

	.icon-error:before {
		content: "\e613";
	}

	.icon-warn:before {
		content: "\e61f";
	}
</style>
<style lang="scss" scoped>
	.loading-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
	}

	.my-loading,
	.my-loading-line,
	.my-loading-success {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 260rpx;
		height: 260rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-size: 28rpx;
		z-index: 99999;
		line-height: 2.4em;

		.image {
			width: 60rpx;
			height: 60rpx;
		}

		.gray-text {
			font-size: 18rpx
		}
	}

	.my-loading {
		&::after {
			content: '';
			position: absolute;
			background-color: #ffffff;
			border-radius: 50%;
			width: 160rpx;
			height: 160rpx;
			font-size: 10px;
			border-top: 6rpx solid rgba(0, 0, 0, 0.05);
			border-right: 6rpx solid rgba(0, 0, 0, 0.05);
			border-bottom: 6rpx solid rgba(0, 0, 0, 0.05);
			border-left: 6rpx solid #f37b1d;
			animation: loadingRotate 1s infinite linear;
			z-index: -1;
		}
	}

	.my-loading-line {
		display: flex;
		flex-direction: column;
		align-content: center;

		.translate-line {
			width: 60rpx;
			height: 30rpx;

			display: flex;

			.line {
				flex: 1;
				margin: 2rpx;
				height: 10rpx;

				&:nth-child(1) {
					background-color: #f62e74;
					animation: translate-line1 2s infinite;
				}

				&:nth-child(2) {
					background-color: #f45330;
					animation: translate-line2 2s infinite;
					animation-delay: 0.15s;
				}

				&:nth-child(3) {
					background-color: #ffc883;
					animation: translate-line3 2s infinite;
					animation-delay: 0.3s;
				}

				&:nth-child(4) {
					background-color: #30d268;
					animation: translate-line3 2s infinite;
					animation-delay: 0.45s;
				}

				&:nth-child(5) {
					background-color: #006cb4;
					animation: translate-line2 2s infinite;
					animation-delay: 0.6s;
				}

				&:nth-child(6) {
					background-color: #784697;
					animation: translate-line1 2s infinite;
					animation-delay: 0.75s;
				}
			}
		}

	}

	.my-loading-success {
		.white-view {
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 100%;
			background-color: #fff;
			animation: successTranslate 0.8s;
		}
	}

	@keyframes successTranslate {
		from {
			left: 0;
			width: 100%;
		}

		to {
			left: 100%;
			width: 0%;
		}
	}

	@keyframes loadingRotate {
		0% {
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}

		100% {
			-webkit-transform: rotate(359deg);
			transform: rotate(359deg);
		}
	}

	@keyframes translate-line1 {

		30%,
		50% {
			height: 20rpx;
			transform: translateY(-10rpx);
		}

		75%,
		100% {
			height: 10rpx;
			transform: translateY(0);
		}
	}

	@keyframes translate-line2 {

		30%,
		50% {
			height: 40rpx;
			transform: translateY(-20rpx);
		}

		75%,
		100% {
			height: 10rpx;
			transform: translateY(0);
		}

	}

	@keyframes translate-line3 {

		30%,
		50% {
			height: 60rpx;
			transform: translateY(-30rpx);
		}

		75%,
		100% {
			height: 10rpx;
			transform: translateY(0);
		}
	}
</style>
