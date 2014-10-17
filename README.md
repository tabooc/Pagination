Pagination
==========

jquery.pagination.js 的修改版,增加了一些参数,改变了回调处理方式

具体修改

1:新增参数`trigger`,只有当`trigger`为`true`的时候,才会执行回调;

2:新增首页末页设置(`first_text`,`end_text`,`first_show_always`,`end_show_always`);

3:修改`link_to`属性的`__id__`值与url一致(从1开始);
