/**
 * Created by Administrator on 2018/9/13.
 */
// 获取地址栏中用户输入的关键字
//"http://localhost:3000/myproject/search-result.html?keyword%20=333"
var keyword = getParamsByUrl(location.href, 'keyword');
//console.log(keyword);
// 当前页
var page = 1;
// 页面中的数据
var html = "";
// 价格排序规则 升序
var priceSort = 1;
var This = null;
$(function () {
    //上拉刷新JS组件
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //tap 事件在用户轻击一个元素时触发
    $('#priceSort').on('tap', function () {
        // 更改价格排序条件
        priceSort = priceSort == 1 ? 2 : 1;
        // 对之前的各种配置进行初始化
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });

});

function getData() {
    if (!This) {
        This = this;
    }
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort
        },
        success: function (response) {
            if (response.data.length > 0) {
                html += template('searchTpl', response);
                $('#search-box').html(html);
                // 告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            } else {
                // 告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(true);
            }
        }
    });
}