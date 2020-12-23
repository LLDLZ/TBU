import {
	serverIp
} from '@/common/ts/variable';
/**
 * 获取请求地址
 * @param type  默认值version
 */
export const getServeIP = (type: string = 'version'): string => {
	// url地址拼接
	let url: string = 'http://'
	let storageIp: string = ''
	if (type === 'version') {
		storageIp = 'JDPRD'
	} else {
		if (!storageIp) {
			storageIp = 'JDPRD'
		}
	}
	//http://172.18.83.24:8205/nancy/api-services/GlueNet.Bussiness.AuthToken.AccessTokenInternal/Token
	url = 'http://' + serverIp[storageIp].ip + ':' + serverIp[storageIp].port
	return url
}
