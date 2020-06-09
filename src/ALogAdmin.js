/*
 * ALog 后台日志
 * @Author: caowenbin 
 * @Date: 2020-06-09 10:28:38 
 * @Last Modified by: caowenbin
 * @Last Modified time: 2020-06-09 17:36:45
 */
const height_item = 42;     // 查询条件，一行
const height_input = 32;    // 输入框
const width_label = 80;    // label 宽度
const width_page = 414;     // 页面宽度
const width_sep = 12;

const Helper = {
  data : {
    token : "frostbelt'snodetools",
  },

  /**
   * 简单校验
   * @param {String} time 有效时间 10 分钟
   */
  getSign (time) {
    if(!time){
      return "";
    }

    time = Number(time);
    if(!time){
      return "";
    }

    let sub = new Date().getTime() - time;
    if(sub > 600000){
      return "";
    }

    return this.data.token.charCodeAt(time % this.data.token.length);
  },

  /**
	 * 参数序列化
	 * @param {Object} data 
	 */
  param(data) {
    if (!data) {
      return "";
    }

    let keys = Object.keys(data);
    let params = [];
    keys.map((key) => {
      params.push(key + "=" + encodeURIComponent(data[key]));
    });
    return params.join("&");
  },
}


// 查询条件 区别于 ALog
let search = {
  duration : String(3 / 24),      // 时间段(天) 从指定时间(默认当前)倒推多长时间(默认3小时)
  line : String(5),               // page size, 默认 5
  url : "",                       // 页面 url
  phone : "",                     // 手机号
  key : "",                       // 打点参数
  action : "",                    // 打点参数
  label : "",                     // 打点参数
  refer : "",                     // 打点参数
  ext : "",                       // 打点参数
  vid : "",                       // 打点参数

  // ua : "",                        // useragent
}

let renderData = {
	props: {
		title: 'ALog',
  },
  views : [
    
  ],
};

// 查询条件
Object.keys(search).forEach((k, index) => {
  let _height = height_item * index;

  // 自测 views 嵌套时，input 呼不起键盘
  renderData.views.push({
    type: "label",
    props: {
      text: k,
      align: $align.right,
    },
    layout: function(make, view) {
      make.top.equalTo(_height);
      make.width.equalTo(width_label);
      make.height.equalTo(height_item);
    }
  });
  renderData.views.push({
    type: "input",
    props: {
      text: search[k],
      placeholder: k,
    },
    layout: function(make, view) {
      make.width.equalTo(width_page - width_label - width_sep * 3);
      make.height.equalTo(height_input);
      make.top.equalTo(_height + (height_item - height_input) / 2);
      make.left.equalTo(width_label + width_sep * 2);
    },
    events : {
      changed: function(sender) {
        search[k] = sender.text;
      },
    },
  });
});
// 查询按钮
renderData.views.push({
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
  events: {
    tapped: function(sender) {
      let now = new Date().getTime();
      $http.get({
        url: "http://alog.frostbelt.cn/getData?" + Helper.param({
          ...search,
          ...{
            // 区别于 ALog
            logstore : "tubeadmin",
            t : now,
            s : Helper.getSign(now),
          },
        }),
        handler: function(resp) {
          let res = resp.data;

          if(!res || res.errno != 0){
            $ui.toast(res && res.errmsg || '请求报错');
            return;
          }

          let _data = res.data;
          let list = [];
          _data.forEach(item => {
            item = {...item};
            // 排序 区别于 ALog
            ["time", "du", "phone", "key"].forEach(key => {
              list.push(key + ": " + item[key]);
              delete(item[key]);
            });
            // 其它
            Object.keys(item).forEach(key => {
              list.push(key + ": " + item[key]);
            });
            list.push("");
          });

          $clipboard.text = list.join("\n");
          $ui.toast('已复制' + _data.length + "条日志");
        }
      })
    },
  },
});

$ui.render(renderData);