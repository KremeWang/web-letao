/**
 * Created by Administrator on 2018/9/15.
 */
$(function() {
    $('#register-btn').on('click', function() {
        //alert(111);
        //获取表单元素中用户输入的值
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var againPass = $('[name="againPass"]').val();
        var vCode = $('[name="vCode"]').val();
    })
})