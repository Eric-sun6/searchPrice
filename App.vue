<script>
	
import './static/css/reset.css';
export default {
    onLaunch: function () {
		// #ifdef MP-WEIXIN
			try{
			  wx.removeStorage({ key: 'dataFromPlanListBack'})
			}catch (e){
			  wx.removeStorage({ key: 'dataFromPlanListBack'})
			}
		// #endif
        console.log('App Launch')
    },

	mounted() {
		
		
	},
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    }
}
</script>


