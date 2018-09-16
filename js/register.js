/**
 * Created by Administrator on 2018/9/15.
 */
$(function () {
    //获取认证码
    $('#getCode').on('click', function () {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (res) {
                alert(res.vCode);
            }
        })
    })
    //表单提交
    $('#register-btn').on('click', function () {
        //alert(111);
        //获取表单元素中用户输入的值
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var againPass = $('[name="againPass"]').val();
        var vCode = $('[name="vCode"]').val();
        //提交前检测用户输入的值是否符合要求(利用正则表达式)
        if(!username.trim()){
            mui.toast("请输入用户名...");
            return;
        }
        var num = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if(!num.test(mobile)) {
            mui.toast("请输入正确的手机号...");
            return;
        }
        if(!password.trim()){
            mui.toast("密码不能为空");
            return;
        }else if(password != againPass){
            mui.toast("两次输入的密码不一样,请重新输入");
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/register',
            data:{
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(res) {
                setTimeout(function(){
                    alert("注册成功!!!");
                    location.href = "login.html";
                }, 2000)
            }
        })
    })

})