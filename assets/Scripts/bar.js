// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {

	},

	// LIFE-CYCLE CALLBACKS:

	onLoad () {
		// cc.log(this.node.progressBar,"===????")
	},

	start() {

	},

	update(dt) {
		// var progress = progressBar.progress;
		// if (progress > 0) {
		// 	progress += dt;
		// } else {
		// 	progress = 1;
		// }
		// progressBar.progress = progress;
	},
});
