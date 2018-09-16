/**
 * Created by Administrator on 2018/9/16.
 */
$(function () {
    //获取验证码
    $('#getCheckCode').on('click', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                alert(res.vCode);
            }
        })
    });

    //修改密码事件
    $('#modifyBtn').on('click', function () {
        var oldPassword = $.trim($('[name="originPass"]').val());
        var newPassword = $.trim($('[name="newPass"]').val());
        var reNewPassword = $.trim($('[name="sureNewPass"]').val());
        var vCode = $.trim($('[name="checkCode"]').val());
        if (!oldPassword) {
            mui.toast("请输入原始密码");
            return;
        }
        if (!newPassword) {
            mui.toast("请输入新密码");
            return;
        } else if (!reNewPassword) {
            mui.toast("请确认新密码");
            return;
        } else if (newPassword != reNewPassword) {
            mui.toast("两次输入密码不同,请重新输入");
            return;
        }
        if(oldPassword == newPassword) {
            mui.toast("新密码不能和旧密码相同,请重新输入");
            return;
        }

        if (!/^\d{6}$/.test(vCode)) {
            mui.toast('验证码不正确');
            return;
        }

        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                reNewPassword: reNewPassword,
                vCode: vCode
            },
            beforeSend: function () {
                $('#modifyBtn').html('正在修改密码...');
            },
            success: function(res) {
                //console.log(res);
                if(res.success) {
                    mui.toast('密码修改成功');
                    setTimeout(function() {
                        location.href = "login.html";
                    },2000);
                }else {
                    $('#modifyBtn').html('修改密码');
                    mui.toast('密码修改失败:'+res.message);
                    if(res.error == 400){
                        localStorage.setItem('returnUrl',location.href);
                        setTimeout(function(){
                            location.href = "login.html";
                        },2000)
                    }
                }
            }
        })

    })
});