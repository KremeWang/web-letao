/**
 * Created by Administrator on 2018/9/13.
 */
$(function () {
    // 给搜索按钮绑定点击事件
    $('#search-btn').on('click', function () {
        // 获取搜索框的对应值
        var keyWords = $('#search-btn').siblings('input').val();
        //当有搜索关键字时点击跳转到对应的搜索结果页面,并带搜索值
        if(keyWords.trim()) {
            //将搜索历史存储在数组中
            keyArr.unshift(keyWords);
            //存储到本地localStorage,只能存储字符串,需要转格式
            localStorage.setItem('keyArr', JSON.stringify(keyArr)); //将数组转换为字符串
            location.href = "search-result.html?keyword =" + keyWords;
        }else {
            alert('请输入搜索关键字...');
        }
    })

    var keyArr = [];
    // 页面加载时判断本地是否有搜索历史记录
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('historyTpl', { result: keyArr })
        $('#history-box').html(html);
    }
    //清空历史记录
    $('#clearBtn').on('click', function () {
        $('#history-box').html("");
        localStorage.removeItem("keyArr");
        keyArr.length = 0;
    });
})