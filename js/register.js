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
    })

})