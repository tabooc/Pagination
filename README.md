Pagination
==========

jquery.pagination.js 的修改版,增加了一些参数,改变了回调处理方式

具体修改

1:新增参数`trigger`,只有当`trigger`为`true`的时候,才会执行回调;

2:新增首页末页设置(`first_text`,`end_text`,`first_show_always`,`end_show_always`);

3:修改`link_to`属性的`__id__`值与url一致(从1开始);

基本使用:
```
$("#Pagination").pagination(<%=num%>, //总条目数;必选参数，整数
{
  items_per_page:2,//每页显示的条目数;可选参数，默认是10
  num_display_entries:8,//连续分页主体部分显示的分页条目数;可选参数，默认是10
  num_edge_entries:1,//两侧显示的首尾分页的条目数;可选参数,默认0
  first_text:'首页',//首页显示文字;可选字符串参数,默认是 'Home'
  end_text:'末页', //末页显示文字;可选字符串参数,默认是 'End'
  prev_text:'上一页',//“前一页”分页按钮上显示的文字;  可选字符串参数，默认是"Prev"
  next_text:'下一页',//“下一页”分页按钮上显示的文字;  可选字符串参数，默认是"Next"
  link_to:'/index/list/page/__id__',//分页的链接;字符串，可选参数，默认是"#"
  current_page:<%=page-1%>,//当前页码;可选参数,默认是1
  ellipse_text:'...',//	省略的页码;可选参数,默认是'...'
  prev_show_always:true,//是否显示“前一页”分页按钮;可选参数,默认是 true
  next_show_always:true,//是否显示"下一页"分页按钮;可选参数,默认是true
  trigger:false,//是否触发回调
  callback:null //回调方法;接受两个参数，新一页的id和pagination容器(一个DOM元素),如果回调函数返回false，则pagination事件停止执行
});
<% %>区块为动态数据
```

//下面地址已不可用~~
详细API参考:[http://tutorials.ajaxmasters.com/pagination-demo/](http://tutorials.ajaxmasters.com/pagination-demo/)
