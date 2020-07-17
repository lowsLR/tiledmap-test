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
	},

	start() {

	},

	// update (dt) {}, 
	// 执行运动函数 
	setActionFun(index, dt, cloum, zl) {
		switch (index) {
			case 1:
				this.node.runAction(this.setMoveToDd(dt, cloum))
				break;
			case 2:
				this.node.runAction(this.setMoveBySb(dt, cloum))
				break;
			case 3:
			case 4:
				this.node.runAction(this.setMoveScaleToAk(dt, cloum, zl))
				break;
		}
	},
	// 被攻击后左右抖动一下rotateBy 
	setMoveToDd(dt, cloum) {
		return cc.repeat(cc.sequence(
			cc.moveTo(dt, cc.v2(2, -5)),
			cc.moveTo(dt, cc.v2(-2, -5)),
		), cloum)
	},
	// 后退闪避技能
	setMoveBySb(dt, cloum) {
		return cc.sequence(
			cc.moveBy(dt, cc.v2(0, -20)).easing(cc.easeIn(2.0)),
			cc.moveBy(dt, cc.v2(0, 20)).easing(cc.easeOut(2.0))
		)
	},
	// 向前攻击
	setMoveScaleToAk(dt, cloum, zl) {
		// 垂直攻击 /*zl 1垂直2斜对*/
		if (zl == 1) {
			return cc.sequence(
				cc.moveTo(dt, cc.v2(0, -10)).easing(cc.easeOut(1.0)),
				cc.scaleTo(dt, 1.2),
				cc.moveTo(dt, cc.v2(0, 200)).easing(cc.easeElasticIn(1.0)),
				cc.scaleTo(dt / 2, 1),
				cc.moveTo(dt, cc.v2(0, -5))
			)
		} else {
			return cc.sequence(
				cc.moveTo(dt, cc.v2(0, -10)).easing(cc.easeOut(1.5)),
				cc.scaleTo(dt, 1.2),
				cc.moveTo(dt, cc.v2(150, 200)).easing(cc.easeElasticIn(1.0)),
				cc.scaleTo(dt / 2, 1),
				cc.moveTo(dt, cc.v2(0, -5))
			)
		}
	}
});
