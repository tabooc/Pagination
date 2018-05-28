/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 * /
 
 /*
 * 原插件资源已不可用，当前版本为修改版
 * 1:新增参数`trigger`,只有当`trigger`为`true`的时候,才会执行回调;
 * 2:新增首页末页设置(`first_text`,`end_text`,`first_show_always`,`end_show_always`); 
 * 3:修改`link_to`属性的`__id__`值与url一致(从1开始);
 * @website https://github.com/tabooc/Pagination
 */
jQuery.fn.pagination = function(maxentries, opts) {
	opts = jQuery.extend({
		//每页显示的条目数;可选参数，默认是10
		items_per_page: 10,
		//连续分页主体部分显示的分页条目数;可选参数，默认是10
		num_display_entries: 10,
		//当前页码
		current_page: 0, 
		//两侧显示的首尾分页的条目数;可选参数,默认0
		num_edge_entries: 0,
		//分页的链接;字符串，可选参数
		link_to: "#",
		//“前一页”分页按钮上显示的文字;  可选字符串参数
		prev_text: "Prev",
		//“下一页”分页按钮上显示的文字;  可选字符串参数
		next_text: "Next",
		//首页显示文字;可选字符串参数
		first_text: "Home",
		//末页显示文字;可选字符串参数
		end_text: "End",
		//省略的页码;可选参数
		ellipse_text: "...",
		//是否显示“前一页”分页按钮;可选参数
		prev_show_always: true,
		//是否显示"下一页"分页按钮;可选参数
		next_show_always: true,
		//是否显示“首页”分页按钮;可选参数
		first_show_always: true,
		//是否显示"末页"分页按钮;可选参数
		end_show_always: true,
		//是否触发回调
		trigger: true,
		//回调方法;接受两个参数，新一页的id和pagination容器(一个DOM元素),如果回调函数返回false，则pagination事件停止执行
		callback: function() { 
			return false;
		}
	}, opts || {});

	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries / opts.items_per_page);
		}

		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval() {
			var ne_half = Math.ceil(opts.num_display_entries / 2);
			var np = numPages();
			var upper_limit = np - opts.num_display_entries;
			var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
			var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
			return [start, end];
		}

		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt) {
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				} else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}

		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt) {
					return pageSelected(page_id, evt);
				}
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts) {
				page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
				appendopts = jQuery.extend({
					text: page_id + 1,
					classes: ""
				}, appendopts || {});
				if (page_id == current_page) {
					var lnk = jQuery("<span class='current'>" + (appendopts.text) + "</span>");
				} else {
					var lnk = jQuery("<a>" + (appendopts.text) + "</a>")
						.attr('href', opts.link_to.replace(/__id__/, page_id + 1));

					if (opts.trigger) {
						lnk.bind("click", getClickHandler(page_id));
					}


				}
				if (appendopts.classes) {
					lnk.addClass(appendopts.classes);
				}
				panel.append(lnk);
			}
			// Generate "first"-Link
			if (opts.first_text && (current_page > 1 || opts.first_show_always)) {
				appendItem(0, {
					text: opts.first_text,
					classes: "first"
				});
			}
			// Generate "Previous"-Link
			if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
				appendItem(current_page - 1, {
					text: opts.prev_text,
					classes: "prev"
				});
			}

			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0) {
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for (var i = 0; i < end; i++) {
					appendItem(i);
				}
				if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
					jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for (var i = interval[0]; i < interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0) {
				if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
					jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
				}
				var begin = Math.max(np - opts.num_edge_entries, interval[1]);
				for (var i = begin; i < np; i++) {
					appendItem(i);
				}

			}
			// Generate "Next"-Link
			if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
				appendItem(current_page + 1, {
					text: opts.next_text,
					classes: "next"
				});
			}
			// Generate "End"-Link
			if (opts.end_text && (current_page < np - 1 || opts.end_show_always)) {
				appendItem(np, {
					text: opts.end_text,
					classes: "end"
				});
			}
		}

		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id) {
			pageSelected(page_id);
		}
		this.prevPage = function() {
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			} else {
				return false;
			}
		}
		this.nextPage = function() {
			if (current_page < numPages() - 1) {
				pageSelected(current_page + 1);
				return true;
			} else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
	});
}


