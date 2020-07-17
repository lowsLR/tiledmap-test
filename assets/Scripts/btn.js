// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		button: cc.Button
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		this.button.node.on('click', this.callback, this);
	},
	callback: function(button) {
		// do whatever you want with button
		// 另外，注意这种方式注册的事件，也无法传递 customEventData
		// cc.log(button.node.name,"===?>button");
		let name = button.node.name;
		let index, dt, cloum, zl
		switch (name) {
			case 'setMoveToDd':
				index = 1, dt = 0.1, cloum = 3;
				break;
			case 'setMoveBySb':
				index = 2, dt = 0.5;
				break;
			case 'setMoveScaleToAkZl1':
				index = 3, dt = 0.5, zl = 1;
				break;
			case 'setMoveScaleToAkZl2':
				index = 4, dt = 0.5, zl = 2;
				break;

		}
		let parent = this.node.getParent();
		// cc.log(parent,"==>父节点");
		parent.getComponent('NewGame').actionFun(index, dt, cloum, zl);

	},
	start() {

	},

	// update (dt) {},
});
