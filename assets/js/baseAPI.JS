//每次调用$.get()或$.post()或$.ajax()的时候
//会调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真这个的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
    //统一为由权限的接口，这只headers请求偷
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete 回调函数
    options, complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1、强中清空token
            localStorage.removeItem('token');
            //2、强制调转要登录页面
            location.href = '/login.html'
        }
    }
})