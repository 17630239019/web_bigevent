$(function () {
    //调用 函数 获取用户基本信息
    getUserInfo()

    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储的token
            localStorage.removeItem('token')
            ///重新跳到登录页
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers请求配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return alert('获取用户信息失败')
            }
            //调用renderAvarar 渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('执行了complete');
        //     // console.log(res);
        //     //在complete 回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1、强中清空token
        //         localStorage.removeItem('token');
        //         //2、强制调转要登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //1、获取用户的名称
    var uname = user.nickname || user.username;
    //2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}