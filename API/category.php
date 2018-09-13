<?php
include_once '../common/mysql.php';
$conn = connect();
$offset = ($currentPage-1)*$pageSize;
$sql = "select p.id,p.title,p.feature,p.content,p.created,p.views,p.likes,c.name,u.nickname,
        (select count(*) from comments where post_id =p.id) as commentsCount
        from posts as p
        left join categories as c on p.category_id = c.id
        left join users as u on p.user_id = u.id
        where p.category_id = {$categoryId}
        limit $offset,$pageSize";
$arr = query($conn,$sql);
//返回查询数据总条数
$count_sql = "select count(*) as count from posts where category_id=$categoryId";
$count = query($conn,$count_sql)[0]['count'];

$response= array('code'=>0,'msg'=>'请求分类文章失败');
if($arr){
	$response['code'] = 1;
	$response['msg'] = '请求分类文章成功';
	$response['data'] = $arr;
	$response['count'] = $count;
}
echo json_encode($response);



 ?>