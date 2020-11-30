import {createToast} from '../utils/index.js'
import Vue from 'vue'
 import request from './request.js';
 

//获取单个单据节点
 function getLogistics(blNum,openId) {
   return new Promise((resolve, reject) => {
        request.get('/track-info/getData',
           {
                blNum: blNum,
                source: 1,
				openId: openId,
            },true
        ).then((res) => {
            resolve(res)
			console.log(res)
        })
    })
}

// 获取历史查询记录
function getHistoryQueryBlNum(openId){
	return new Promise((resolve, reject) => {
	     request.get( '/track-info/getWechatHistoryQueryBlNum',{
			 openId: openId
		 })
		 .then((res) => {
	         resolve(res)
	     })
	 })
}

export {
	getLogistics,
	getHistoryQueryBlNum
}
