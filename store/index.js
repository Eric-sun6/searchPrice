import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    'state': {
        'start': {},
        'end':{},
        'planSearchInfo':{},
        'userInfoParams':null,
		'userInfoFlag': false,
		'showErrorTipFlag': false,
		'planListCheckbox': [],
		'param': [],
		'openidSessionKey':null,
		'ifGotTelNum': false,
		'planListSelectData': {},
		'wechartCode': ''
    },
    'mutations': {
        saveStartInfo(state,val){
            state.start = val;
        },
        saveEndInfo(state,val){
            state.end = val;
        },
		// saveWechartCode(state,code){
		// 	state.code = code
		// },
        savePlanSearchInfo(state,val){
            state.planSearchInfo = val;
        },
        saveUserInfoParams(state, val){
            state.userInfoParams = val;
        },
		saveUserInfoFlag(state, val){
			 state.userInfoFlag = val;
		},
		changeErrorTipFlag(state, val){
			state.showErrorTipFlag = val
		},
		
		savePlanListCheckbox(state, val){
			state.planListCheckbox = val
		},
		saveParam(state,val){
			state.param = val
		},
		saveOpenidSessionKey(state, val){
			state.openidSessionKey= val
		},
		saveIfGotTelNum(state,val){
			state.ifGotTelNum = val
		},
		savePlanListSelectData(state, val){
			state.planListSelectData = val
		}
    },
    'actions': {}
});

export default store;