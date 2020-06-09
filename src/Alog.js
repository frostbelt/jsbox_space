/*
 * @Author: caowenbin 
 * @Date: 2020-06-09 10:28:38 
 * @Last Modified by: caowenbin
 * @Last Modified time: 2020-06-09 14:28:38
 */
const height_item = 42;     // 查询条件，一行
const height_input = 32;    // 输入框
const width_label = 80;    // label 宽度
const width_page = 414;     // 页面宽度

const width_sep = 12;

// 查询条件
let search = {
  m2 : "",                        // APP 内用户 m2
  qid : "",                       // APP 内用户 qid
  duration : String(3 / 24),      // 时间段(天) 从指定时间(默认当前)倒推多长时间(默认3小时)
  url : "",                       // 页面 url
  du : "",                        // url pathname
  dua : "",                       // url host
  line : String(5),               // page size, 默认 5
  bid : "",                       // monitor 打点参数
  c : "",                         // monitor 打点参数
  channel_id : "",                // monitor 打点参数
  cid : "",                       // monitor 打点参数
  dl : "",                        // monitor 打点参数
  ext : "",                       // monitor 打点参数
  vid : "",                       // monitor 打点参数

  // h5mid : "",                     // APP 外用户标识
  // totime : "",                    // 指定时间(默认当前)，格式 "2020-06-09"
  // ua : "",                        // useragent
  // offset : "",                    // 从第几条开始
  // reverse : "true",               // 是否逆序输出(默认逆序)
}

let renderData = {
	props: {
		title: 'ALog',
  },
  views : [
    {
      type: "view",
      info: "查询条件列表",
      props: {
        id : "search_box",
      },
      layout: function(make, view) {

      },
      views : [],
    },
    {
      type: "button",
      info: "查询条件按钮",
      props: {
        id : "search_btn",
        title : "查询",
      },
      layout: function(make, view) {
        make.left.right.inset(width_sep);
        make.top.equalTo(Object.keys(search).length * height_item + width_sep);
      },
    },
  ],
};

// 查询条件
Object.keys(search).forEach((k, index) => {
  let item = {
    type : "view",
    info : "查询条件，行",
    props : {
      id : "query_" + k,
      class : "query_line",
    },
    layout: function(make, view) {
      make.height.equalTo(height_item);
      make.top.equalTo(height_item * index);
    },
    views: [
      {
        type: "label",
        props: {
          text: k,
          align: $align.right,
        },
        layout: function(make, view) {
          make.width.equalTo(width_label);
          make.height.equalTo(height_item);
        }
      },
      {
        type: "input",
        props: {
          text: search[k],
          placeholder: k,
        },
        layout: function(make, view) {
          make.width.equalTo(width_page - width_label - width_sep * 3);
          make.height.equalTo(height_input);
          make.top.equalTo((height_item - height_input) / 2);
          make.left.equalTo(width_label + width_sep * 2);
        },
        events : {
          changed: function(sender) {
            // test
            console.log(sender);

            search[k] = sender;
          },
        },
      },
    ],
  };

  renderData.views.filter(item => item.props.id == "search_box")[0].views.push(item);
});

$ui.render(renderData);