
import request from './request.js';

export function saveCode (code) {
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
export function saveUserInfo(params){
    return new Promise((resolve, reject) => {
	    request.post('/am/wechat/saveUserInfo',params)
	        .then(res => {
	            resolve(res);
	        })
	        .catch(err => {
	            reject(err);
	            console.log(err);
	        });
    });
}

export function getTel(params){
    return new Promise((resolve, reject) => {
	    request.post('/am/wechat/getUserPhoneInfo',params)
	        .then(res => {
	            resolve(res);
	        })
	        .catch(err => {
	            reject(err);
	            console.log(err);
	        });
    });
}
export function getIp(){
	return new Promise((resolve, reject) => {
	   uni.request({
	       'url': 'https://pv.sohu.com/cityjson',
	       'method': 'GET'
	   }) .then(res => {
	            resolve(res);
	        })
	        .catch(err => {
	            reject(err);
	            console.log(err);
	        });
	});
	
}