
import request from './request.js';
export function quicklyBeginInit () {
    return new Promise((resolve, reject) => {
        request.get('/search/quickly/begin/init', {})
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err);
				
            });
    });
}

export function quicklyEndInit (searchWord) {
    return new Promise((resolve, reject) => {
        request.get('/search/quickly/end/init', {})
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err);
            });
    });
}
export function quickOrderBeginSite (searchWord) {
    return new Promise((resolve, reject) => {
        request.get('/search/quickly/begin/division?searchWord=' + searchWord)
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err);
            });
    });
}

export function quickOrderEndSite (searchWord) {
    return new Promise((resolve, reject) => {
        request.get('/search/quickly/end/division?searchWord=' + searchWord)
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err);
            });
    });
}
export function getQuickPlanList ( params) {
    return new Promise((resolve, reject) => {
        request.get('/bc/getRouteListQuickOrderList', params)
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err);
            });
    });
}