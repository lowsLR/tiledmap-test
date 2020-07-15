// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		progressBarView: {
			type: cc.ProgressBar,
			default: null
		}
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		// cc.log(this.progressBarView.progress, "==>??node") 
	},

	start() {

	},

	update(dt) {
		var progress = this.progressBarView.progress;
		// if (progress < 1) {
		// 	progress -= dt;
		// } else {
		// 	progress = 1;
		// }
		progress -= dt;
		if (progress < 0) {
			progress = 1;
		}
		this.progressBarView.progress = progress;
	},
});
