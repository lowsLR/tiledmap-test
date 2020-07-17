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
		// cc.log(this.progressBarView.progress, "==>??node");
		let progress = this.progressBarView.progress;
		let count = 0.1;
		this.callback = function() {
			progress = this.subtr(progress, count);
			if (this.progress <= 0) {
				this.unschedule(this.callback);
			}
			this.progressBarView.progress = progress;
		}
		this.schedule(this.callback, 1);
	},
	subtr(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
	 	}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		//last modify by deeka
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(2);
	},
	start() {

	},

	update(dt) {
		// var progress = this.progressBarView.progress;
		// progress -= dt;
		// if (progress < 0) {
		// 	progress = 1;
		// }
		// this.progressBarView.progress = progress;
	},
});
