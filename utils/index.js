

/**
 * @function 设置字典 Map
 * @param  {Array} 原数组
 * @param  {String} 作为 key 的的字段
 * @param  {String} 作为 value 的的字段
 * @return {Object} 获取到得新的字典
 */
function setDictMap(arr, key, value) {
    key = key || 'dictValue';
    value = value || 'name';
    let json = {};
    // 遍历数组
    arr.forEach((item) => {
        // 生成 {key:value} 对象 比赋值给json
        json[item[key]] = item[value];
    });
    return json;
}

function getQueryVariable (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
// function showToast(current){
// 	current.showToastFlag = true
// }
 import Toast from"../components/com-toast.vue";
//动态创建toast实例
function createToast(Vue, props){
  let Constructor = Vue.extend(Toast)
  let toast = newConstructor({propsData: props})     
  // toast.$slots.default= text     
  toast.$mount()     
  document.body.appendChild(toast.$el)
  toast.remove = () => {
      document.body.removeChild(toast.$el)
  
      toast.$destroy()
  }

  return toast 
}
export{setDictMap,createToast,getQueryVariable}
 