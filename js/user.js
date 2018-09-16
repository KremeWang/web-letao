/**
 * Created by Administrator on 2018/9/15.
 */
$(function () {
    $.ajax({
        url: '/user/queryUserMessage',
        type: 'get',
        success: function (result) {
            //console.log(result);
            if (result.error == 400) {
                localStorage.setItem('returnUrl', location.href);
                location.href = "login.html";
            } else {
                var html = template('userTpl', result);
                $('#userInfoBox').html(html);
            }
        }
    });

    $('#logout').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (result) {
                if (result.success) {
                    location.href = "index.html";
                } else {
                    mui.toast('退出登录失败');
                }
            }
        })
    });
});