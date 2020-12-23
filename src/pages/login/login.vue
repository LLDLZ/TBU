<template>
	<view class="login">
		<view class="content">
			<view class="title">
				<view class="header-bg"></view>
				<text>A+MES</text>
			</view>
			<view class="version">
				<text>当前版本号：{{currentVerion}}</text>
			</view>
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column username">
					<input type="number" placeholder="用户名" class="uni-input" name="username" :value="userName" id="username" />
				</view>
				<view class="uni-form-item uni-column password">
					<input type="password" placeholder="密码" class="uni-input" name="password" :value="password" id="password" />
				</view>
				<view class="uni-title uni-common-pl">请选择工厂</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
						</view>
						<view class="uni-list-cell-db">
							<picker :value="factoryIndex" :range="factoryList" @change="bindPickerChange" :range-key="'name'">
								<view class="uni-input">{{factoryList[factoryIndex].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit" class="login-btn" type="primary">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script lang="ts">
	import {
		Component,
		Vue,
		Watch,
		Prop
	} from "vue-property-decorator";
	import {
		requestCheckUserPwd,
		requestGetPlantsOfUser,
		requestSynPlantToken,
	} from '@/api/requestList';
	import {
		VERSION
	} from '@/common/ts/variable.ts'
	import {
		State,
		Action,
		Mutation
	} from 'vuex-class';
	@Component({
		components: {},
	})
	export default class Login extends Vue {
		title: string = "LOGIN";
		userName: string = "63000042";
		password: string = "123456";
		factoryList: any = [{
			name: null
		}];
		factoryIndex: number = 0;
		USERID: string = "";
		currentVerion: string = VERSION
		@State('token') token: any
		@Mutation('setToken') setToken: any
		// @Action('setToken') asyncSetToken: any
		mounted() {
			// console.log(this);
			// console.log(this.$store);
			// console.log("token:", this.$store.state.token);
			// console.log("@State('token'):", this.token);
			// this.setToken(1223344)
			// console.log("@Mutation('token'):", this.token);
			// this.asyncSetToken(435234)
			// console.log("@Action('token'):", this.token);
			this.checkFormData();
			uni.hideTabBar()
		}
		/**
		 * 请求服务器返回的userID 用于后面请求接口
		 * @param userid 用户名
		 * @param password 密码
		 */
		async obtainFactoryList(userid: string, password: string) {
			// 获取了userID
			let userId = await requestCheckUserPwd(
				userid,
				password
			)
			this.USERID = userId
			let resultFactory = await requestGetPlantsOfUser(
				userId
			)
			this.factoryList = resultFactory;
		}
		/**
		 * 校验form表单数据
		 * @param e any类型  表单数值对象
		 */
		async formSubmit(e: any) {
			let userid = this.USERID
			let cplantid = this.factoryList[this.factoryIndex].code
			let version = `Mobile:${VERSION}`
			const result = await requestSynPlantToken(
				userid,
				cplantid,
				version
			)
			this.setToken(result)
			uni.switchTab({
				url: '/pages/index/index'
			});
			// console.log("@Mutation('token'):", this.token);
		}
		/**
		 * pick事件
		 * @param e  目标picker
		 */
		bindPickerChange(e: any) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.factoryIndex = e.target.value
		}
		/**
		 * 校验表单信息
		 */
		checkFormData() {
			let oldUserName: string = this.userName
			let oldPassword: string = this.password
			setTimeout(() => {
				let newUserName: string = this.userName
				let newPassword: string = this.password
				if (oldUserName === newUserName || oldPassword === newPassword) {
					if (newUserName === "" || newPassword === "") {
						uni.showModal({
							title: '提示',
							content: "请输入用户名或密码",
							showCancel: false
						});
						return
					}
					this.obtainFactoryList(newUserName, newPassword)
				}
			}, 1000);
		}

	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.login {
		position: relative;
		height: 100vh;
		background: url("@/static/image/login-bg.png") no-repeat center/cover;

		.content {
			width: 80%;
			height: 400rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.title {
				color: #ffffff;
				font-size: 26px;
				text-align: center;

				.header-bg {
					background: url('@/static/image/logo.png') no-repeat;
					background-size: cover;
					width: 125px;
					height: 38px;
					margin: 0 auto;
				}
			}

			.version {
				color: #ffffff;
				text-align: center;
				padding: 5px;
				background: rgba($color: #000000, $alpha:0.5);
				border-radius: 10px;
			}

			.username,
			.password {
				margin: 5px 0;
				display: flex;
				background-color: #ffffff;
				border-radius: 5px;
			}

			.uni-title {
				color: #ffffff;
			}
		}
	}
</style>