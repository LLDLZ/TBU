//请求地址
 export const serverIp: any = {
	"JDPRD": {
		name: '金东PRD',
		code: 'JDPRD',
		//办公室用(本地部署)
		// ip: "172.24.186.8",
		// port: "8100",
		//  生产环境  172.18.198.20:8215/
		// ip: "172.18.198.20",
		// port: "8215",
		// 本地  http://172.24.68.116:8010/
		ip: '172.24.68.116',
		port: "8010",
		// MOCK  172.18.209.210:9205
		// ip: '172.18.209.210',
		// port: "9205",
		// 680  172.18.198.20:8215
		// ip: '172.18.209.210',
		// port: "9205",
		// 服务器(130)
		// ip: '172.18.83.32',
		// port: "9210",
		// 服务器(310)
		// ip: '172.18.198.1',
		// port: "8010",
		//酒店用
		// ip: '192.168.65.28',
		// port: "8100"
		//ip: '172.24.186.15',
		//port: "9210",
	}
}

//基础请求地址
export const BASE_URL:string= '/nancy/api-services/'

//版本号
export const VERSION:string= '1';