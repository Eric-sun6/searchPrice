
import request from './request.js';
//微信校验接口，包括对微信是否已经授权，是否已经获取过手机号的校验
 

export function checkWechart(code){
    return new Promise((resolve, reject) => {
	    request.get('/am/wechat/getUserCodeInfo', {'code': code})
	        .then(res => {
	            resolve(res);
	        })
	        .catch(err => {
	            reject(err);
	            console.log(err);
	        });
    });
}
