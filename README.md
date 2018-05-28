Pagination
==========

基本使用:
```
$("#Pagination").pagination(total, options);
```

参数说明：
```

| 参数名称    | 参数数据类型   |  默认值  |  是否必填  |  描述  |
| --------   | -----:       | ----:  | ----:    | :----: |
| total     | Number |     null   | true | 数据总量 |
| options.items_per_page      |   Number   |   10  | false | 每页显示的条目数 |
| options.num_display_entries  |  Number |  10  | false | 连续分页主体部分显示的分页条目数 |
| options.current_page | Number | 0 | false | 当前页码 |
| options.num_edge_entries | Number | 0 | false | 两侧显示的首尾分页的条目数 |
| options.link_to | String | '#' | false | 分页的链接 |
| options.prev_text | String | 'Prev' | false | “前一页”分页按钮上显示的内容 |
| options.next_text | String | 'Next' | false | “下一页”分页按钮上显示的内容 |
| options.first_text | String | 'Home' | false | “首页”显示文字 |
| options.end_text | String | 'End' | false | “末页”显示文字 |
| options.ellipse_text | String | '...' | false | 省略的页码 |
| options.prev_show_always | Boolean | true | false | 是否显示“前一页”分页按钮 |
| options.next_show_always | Boolean | true | false | 是否显示"下一页"分页按钮 |
| options.first_show_always | Boolean | true | false | 是否显示“首页”分页按钮 |
| options.end_show_always | Boolean | true |  false | 是否显示"末页"分页按钮  |
| options.trigger | Boolean | true | false | 是否触发回调 |
| options.callback | Function | function | false | 回调方法;接受两个参数，新一页的id和pagination容器(一个DOM元素),如果回调函数返回false，则pagination事件停止执行 |

```
