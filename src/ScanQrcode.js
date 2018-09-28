/**
 * 二维码解码
 * 
 * @author frostbelt
 * @description 微信可以扫描二维码，但有时希望得到二维码的原始信息
 */

$ui.render({
    props: {
        title: "二维码解码"
    },
    views: [{
        type: "button",
        props: {
            id: "btn",
            title: "扫描二维码",
        },
        layout: (make, view) => {
            make.top.left.right.inset(10);
        },
        events: {
            tapped () {
                $qrcode.scan((text) => {
                    $clipboard.text = text;
                    $ui.toast("已复制");
                });
            }
        }
    }]
});