import {createToast} from '../utils/index.js'
import Vue from 'vue'
import request from './request.js';

//报关费用
function declareFee (productNum, shippmentPortId) {
   return new Promise((resolve, reject) => {
        request.get( '/sc/getLowesPortClear',
            {
                productNum: productNum,
                shippmentPortId: shippmentPortId
            }
        ).then(res => {
            resolve(res)
        })
		.catch(err=>{
			console.log(err)
			reject(err)
		})
    })
}

//获取计量单位
function getUnit() {
  return new Promise((resolve, reject) => {
       request.get('/sys/getDictDetailList/MEASUREMENT_UNIT/' + Math.random(),{})
	   .then(res=> {
            resolve(res)
        })
		.catch(err=>{
			console.log(err)
			reject(err)
		})
    })
}


//获取币种
function getCurrency() {
   return new Promise((resolve, reject) => {
        request.get( '/sys/getDictDetailList/CURRENCY/' + Math.random(),{})
		.then((res) => {
            resolve(res)
        })
    })
}

//点击询价
function saveQuoteConsult(params,header) {
	console.log(params)
   return new Promise((resolve, reject) => {
        request.definedHttp( '/am/wechat/saveQuoteConsulting','POST',params,header)
		.then((res) => {
            resolve(res)
        })
		.catch(err=>{
			let msg = err.message
			createToast(Vue,{toastText:msg})
			console.log(err)
		})
    })
}


//记录用户行为
function saveUserAction(params,header) {
	console.log(params)
   return new Promise((resolve, reject) => {
        request.definedHttp('/am/wechat/saveQuoteConsultingBehavior','POST',params,header)
		.then((res) => {
            resolve(res)
        })
		.catch(err=>{
			let msg = err.message
			createToast(Vue,{toastText:msg})
			console.log(err)
		})
    })
}

//获取费用属性
function getFeeAttribute() {
   return new Promise((resolve, reject) => {
        request.get( '/sys/getDictDetailList/FEE_ATTRIBUTE/' + Math.random(),{})
       .then((res) => {
            resolve(res)
        })
    })
}

//获取费用名称
function getBbiExpense() {
    return new Promise((resolve, reject) => {
         request.get('/bbi/getBbiExpense',{})
        .then(res => {
            resolve(res)
        })
    })
}
//获取产装，堆装，海外，订舱费用
function getmanyFee(params) {
    return new Promise((resolve, reject) => {
         request.post('/sc/quickOrder',params)
        .then(res => {
            resolve(res)
        })
    })
}


function jsToFormData(config) { //对象转formdata格式
    let formData = new FormData();
    let obj = config.data;
    let arrayKey = config.arrayKey;
    for (var i in obj) {
        if (isArray(obj[i])) {
            obj[i].map(item => {
                if (!arrayKey) {
                    formData.append(i, item)
                } else {
                    formData.append(i + '[]', item)
                }
            })
        } else if (obj[i] instanceof FileList) {
            //filelist 文件类型的处理
            for (var fileItem = 0; fileItem < obj[i].length; fileItem++) {
                if (!arrayKey) {
                    formData.append(i, obj[i].item(fileItem))
                } else {
                    formData.append(i + '[]', obj[i].item(fileItem))
                }
            }
        } else {
            formData.append(i, obj[i])
        }
    }
    return formData;
}
//查找选择的对应的区块
function checkBlockAll(id) {
     return new Promise((resolve, reject) => {
		
		// let params=formData.append("busheetNodeId"=id);
			
         request.post('/admin/check_block_all_Applets',{"busheetNodeId":id})
        .then(res=> {
            resolve(res)
        })
    })
}

//根据单据编码查询单据
function getSheetByCode(busheetCode) {
	
   return new Promise((resolve, reject) => {
        request.get('/admin/getSheetByCode',
         {
                busheetCode: busheetCode
            }
        ).then((res) => {
            resolve(res)
        })
    })
}


//获取单个单据节点
function getSimpleSheetStatus(serviceSetCode, nodeCode, buSheetId) {
   return new Promise((resolve, reject) => {
        request.get( '/admin/getSimpleSheetStatus',
           {
                serviceSetCode: serviceSetCode,
                buSheetId: buSheetId,
                nodeCode: nodeCode
            }
        ).then((res) => {
            resolve(res)
        })
    })
}
export {
	declareFee,
	getUnit,
	getFeeAttribute,
	getBbiExpense,
	getCurrency,
	getmanyFee,
	checkBlockAll,
	getSimpleSheetStatus,
	getSheetByCode,
	saveQuoteConsult,
	saveUserAction
}