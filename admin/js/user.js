/**
 * Created by Administrator on 2018/9/18.
 */
$(function(){
    //获取数据库的注册用户数据
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(res) {
            //console.log(res);
            var html = template("userTpl", res);
            $('#user-box').html(html)
        }
    });

    //启/禁用操作
    $('#user-box').on('click', '.edit-btn', function(){
        // 当前用户的状态
        var isDelete = $(this).attr('data-isdelete');
        console.log(isDelete);
        // 用户ID
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function(res) {
                //console.log(isDelete);
                //console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        })
    });
    //用户退出操作
    $('#logout').on('click',function() {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (result) {
                if (result.success) {
                    location.href = "login.html";
                } else {
                    alert('退出登录失败');
                }
            }
        })
    })
});