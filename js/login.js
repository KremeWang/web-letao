/**
 * Created by Administrator on 2018/9/15.
 */
$(function () {
    $('#login-btn').on('tap', function () {
        //alert(111);
        var username = $.trim($("[name='username']").val());
        var password = $.trim($("[name='password']").val());
        //console.log(username --- password);
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            beforeSend:function() {
                $('#login-btn').html("正在登录...");
            },
            success: function(res) {
                mui.toast("登录成功");

                $('#login-btn').html("登录");

                setTimeout(function(){
                    location.href = "user.html";
                }, 2000);
            }
        })
    })
})