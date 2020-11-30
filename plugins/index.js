exports.install=function(Vue,option,reloadList){
	Vue.prototype.handletouchmove=(that,event)=>{
		if (that.moveflag !== 0) {
			return;
		}
		let currentX = event.touches[0].pageX;
		let currentY = event.touches[0].pageY;
		let tx = currentX - that.lastX;
		let ty = currentY - that.lastY;
		let text = '';
		that.mindex = -1;
		//左右方向滑动
		if (Math.abs(tx) > Math.abs(ty)) {
			if (tx < 0) {
				text = '向左滑动';
				that.moveflag = 1;
			//  that.getList();  //调用列表的方法
			} else if (tx > 0) {
				text = '向右滑动';
				that.moveflag = 2;
				that.goToPreIndex()
			}
		}else {
			if (ty < 0) {
				text = '向上滑动';
				that.moveflag = 3;
				if(reloadList) {that.reachBottomLoadList();}  //调用列表的方法
			} else if (ty > 0) {
				text = '向下滑动';
				that.moveflag = 4;
			}
		}

		//将当前坐标进行保存以进行下一次计算
		that.lastX = currentX;
		that.lastY = currentY;
		that.text = text
		console.log(text)
	}
	Vue.prototype.handletouchstart=function(that,event) {
		// console.log(event)
		that.lastX = event.touches[0].pageX;
		that.lastY = event.touches[0].pageY;
		// console.log(that.lastY)
	},
	Vue.prototype.handletouchend= function(that,event) {
		that.moveflag = 0;
		that.text = '没有滑动';
	},
	Vue.prototype.getDateRange=(baseDate,days)=>{
		 var date1 = baseDate ? new Date(baseDate) : new Date();
		 var date2 = new Date(date1);
		 date2.setDate(date1.getDate() + days);
		 let dateRange=date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() 
		 console.log(dateRange)
		return dateRange
		
		// console.log(defaulTime2(new Date(),-24),defaulTime2(new Date(),6)); 
	}
}