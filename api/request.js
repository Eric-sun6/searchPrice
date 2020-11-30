let commonUrl ='https://www.wiser-bridge.com';
const otherUrl = 'http://192.168.0.60:9401'
//'http://front.wit-road.com:803'
//'http://192.168.3.187:20310';
//'http://192.168.0.141:20310';
//'https://www.wiser-bridge.com';
//'http://192.168.3.189:20310';
//'http://192.168.3.189:20310'
import Vue from 'vue';
// post请求封装
function post (url, data) {
    return new Promise((resolve, reject) => {
        uni.request({
            'url': commonUrl + url,
            'method': 'POST',
            'data': data
        })
		.then(data => {//res为一个数组，数组第一项为错误信息，第二项为返回数据
			let [error, res] = data;

			if (res.statusCode == 200) {
				resolve(res.data);
			} else {
				// 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
				//接口后面的then执行
				// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
				//不会被阻断在那里执行不下去！
				resolve(res.data.msg);
				uni.showToast({
					'icon': 'none',
					'title': '请求错误:' + res.statusCode,
					'duration': 1500
				});
			}

		})
		
		.catch(err=>{
		   console.log(err)
			// Vue.$store.commit('changeErrorTipFlag',true)
		})
    });
}

// get请求封装
function get (url, data,special) {
	// commonUrl = special?otherUrl:commonUrl
    return new Promise((resolve, reject) => {
        uni.request({
            'url': commonUrl + url,
            'method': 'GET',
            'data': data
        })
            .then(data => {//res为一个数组，数组第一项为错误信息，第二项为返回数据
                let [error, res] = data;

                // console.log(res.data);
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
                    //接口后面的then执行
                    // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
                    resolve(res.data.msg);
                    uni.showToast({
                        'icon': 'none',
                        'title': '请求错误:' + res.statusCode,
                        'duration': 1500
                    });
                }

            })
           .catch(err=>{
			   console.log(err)
				// Vue.$store.commit('changeErrorTipFlag',true)
           })
    });
}
//自定义拦截器，传参数方式，参数，header
function definedHttp (url, method,data,header) {
    return new Promise((resolve, reject) => {
        uni.request({
            'url': commonUrl + url,
            'method': method,
            'data': data,
			'header':header
        })
            .then(data => {//res为一个数组，数组第一项为错误信息，第二项为返回数据
                let [error, res] = data;
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    resolve(res);
                }

            })
			.catch(err=>{
			   console.log(err)
			})
    });
}
export default {
    post,
    get,
	definedHttp
};