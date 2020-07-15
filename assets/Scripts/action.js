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

	onLoad() {
		// 初始化抖动动作  
		// this.skewByAction = this.setskewByAction(0.2);
		// this.node.runAction(this.skewByAction);
		// this.moveByAction = this.setMoveByAction(0.5);
		// this.node.runAction(this.moveByAction);
	},

	start() {

	},

	// update (dt) {}, 
	setskewByAction(dt) {
		// cc.log("抖动动111");
		let left = cc.skewBy(dt, 5, -5).easing(cc.easeCubicActionOut());
		let right = cc.skewBy(dt, -5, 5).easing(cc.easeCubicActionIn());
		return cc.repeatForever(cc.sequence(left, right));
	},
	setMoveByAction(dt) {
		// cc.log("后退222");
		let moveByLeft = cc.moveBy(dt, cc.v2(0, -20)).easing(cc.easeCubicActionOut());
		let moveByRight = cc.moveBy(dt, cc.v2(0, 20)).easing(cc.easeCubicActionIn());
		// return cc.sequence(moveByLeft, moveByRight);
		return cc.repeatForever(cc.sequence(moveByLeft, moveByRight));
	},
	actionFun(index) {
		// cc.log(index, "==>执行了index")
		switch (index) {
			case 1:
				// cc.log("==>执行了1");
				this.skewByAction = this.setskewByAction(0.2);
				this.node.runAction(this.skewByAction);
				break;
			case 2:
				// cc.log("==>执行了2");
				this.moveByAction = this.setMoveByAction(0.5);
				this.node.runAction(this.moveByAction);
				break;
		}
		// cc.log(this.node,"===?actionFun")
	}
});
