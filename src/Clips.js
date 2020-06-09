/**
 * 剪贴板
 *
 * 由 JSBox 自带 demo 改进
 * @author frostbelt
 */

$ui.render({
	props: {
		title: '剪贴板',
	},
	views: [
		{
			type: 'input',
			props: {
				placeholder: 'Type text here...',
			},
			layout: function (make) {
				make.top.left.right.inset(10);
				make.height.equalTo(32);
			},
			events: {
				returned: function (sender) {
					insertItem(sender.text);
					sender.blur();
					sender.text = '';
				},
			},
		},
		{
			type: 'list',
			props: {
				id: 'list',
				reorder: true,
				actions: [
					{
						title: 'delete',
						handler: function (sender, indexPath) {
							deleteItem(indexPath);
						},
					},
				],
			},
			layout: function (make) {
				make.left.bottom.right.equalTo(0);
				make.top.equalTo($('input').bottom).offset(10);
			},
			events: {
				didSelect: function (sender, indexPath, title) {
					$clipboard.text = title;
					$device.taptic();
					$ui.toast('Copied');
				},
				reorderFinished: function (data) {
					saveItems(data);
				},
			},
		},
	],
});

var listView = $('list');
var clips = $cache.get('clips') || [];
listView.data = clips;

function insertItem(text) {
	clips.unshift(text);
	listView.data = clips;
	saveItems();
}

function deleteItem(indexPath) {
	var text = clips[indexPath.row];
	var index = clips.indexOf(text);
	if (index >= 0) {
		clips.splice(index, 1);
		saveItems();
	}
}

function saveItems(data) {
	clips = data || clips;
	$cache.set('clips', clips);
}
