import {
	HTTPHandle,
	HTTPNotTokenHandle,
} from '@/api/http';
/**
 * 获取userID  不含token
 * @param userid 用户名
 * @param password 密码
 */
export const requestCheckUserPwd = (userid: string, password: string) => (HTTPNotTokenHandle({
	url: "GlueNet.Bussiness.AuthToken.AccessTokenInternalService/CheckUserPwd",
	bodyPrama: {
		userid,
		password
	}
}, ))

/**
 * 获取工厂  不含token
 * @param userid 用户名
 */
export const requestGetPlantsOfUser = (userid: string) => (HTTPNotTokenHandle({
	url: "GlueNet.Bussiness.AuthToken.AccessTokenInternalService/GetPlantsOfUser",
	bodyPrama: {
		userid
	}
}))

/**
 * 获取token  不含token
 * @param userid 接口返回的userid
 * @param cplantid 工厂code
 * @param version 版本号
 */
export const requestSynPlantToken = (userid: string, cplantid: string, version: string) => (HTTPNotTokenHandle({
	url: "GlueNet.Bussiness.AuthToken.AccessTokenInternalService/SynPlantToken",
	bodyPrama: {
		userid,
		cplantid,
		version
	}
}))