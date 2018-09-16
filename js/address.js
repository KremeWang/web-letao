/**
 * Created by Administrator on 2018/9/16.
 */
$(function () {
    $.ajax({
        url: '/address/queryAddress',
        method: 'get',
        success: function (result) {
            console.log(result);
            $('#adress').html(template('adressTpl', {result: result}))
        }
    });

    // 删除收货地址
    $('body').on('tap', '.deleteAdress', function () {
        //var id = this.getAttribute('data-id');
        var id = $(this).data('id');
        //var li = this.parentNode.parentNode;
        var li = $(this).parentNode.parentNode;
        mui.confirm("确认要删除吗?", function (message) {
            // 确认删除
            if (message.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        // 删除成功
                        if (res.success) {
                            // 重新加载当前页面
                            location.reload();
                        }
                    }
                })
            } else {
                // 取消删除
                // 关闭列表滑出效果
                mui.swipeoutClose(li);
            }
        });
    });
})