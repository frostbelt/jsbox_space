/*
 * @Author: caowenbin 
 * @Date: 2020-06-09 10:28:38 
 * @Last Modified by: caowenbin
 * @Last Modified time: 2020-06-09 11:27:20
 */
const height_head = 50;     // 标题
const height_item = 60;     // 查询条件，一行
const height_input = 32;    // 输入框
const width_label = 60;    // label 宽

const width_sep = 12;

// 查询条件
let search = {
  m2 : "",
}


$ui.render({
	props: {
		title: 'ALog',
  },
  views : [
    {
      type: "label",
      info: "标题",
      props: {
        text: "油管 web 日志查询",
        align: $align.center,
        font: $font("bold", 18),
        lines: 1,
      },
      layout: function(make, view) {
        make.width.equalTo(view.super.width);
        make.height.equalTo(height_head);
      }
    },
    {
      type: "view",
      info: "查询条件列表",
      props: {

      },
      layout: function(make, view) {
        make.left.right.equalTo(width_sep);
        make.top.equalTo(height_head);
      },
      views : [
        {
          type : "view",
          info : "查询条件，行",
          props : {

          },
          layout: function(make, view) {
            make.height.equalTo(height_item);
          },
          views: [
            {
              type: "label",
              props: {
                text: "m2",
                align: $align.right,
              },
              layout: function(make, view) {
                make.width.equalTo(width_label - width_sep);
                make.height.equalTo(height_item);
              }
            },
            {
              type: "input",
              props: {
                type: $kbType.search,
                darkKeyboard: true,
                text: search.m2,
              },
              layout: function(make, view) {
                make.width.equalTo(300);
                make.height.equalTo(height_input);
                make.top.equalTo((height_item - height_input) / 2);
                make.left.equalTo(width_label + width_sep * 2);
              },
              changed: function(sender) {
                // test
                console.log(sender);

                search.m2 = sender;
              },
            },
          ],
        },  // end of 一行
        
      ],
    },  // end of 搜索条件
  ],
});