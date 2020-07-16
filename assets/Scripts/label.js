// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		battleLabel: cc.Label
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		this.node.color = new cc.color(255, 255, 0, 255);
		cc.log(this.battleLabel.string, "===>???") // 
		this.battleLabel.string = "战斗开始"
		
	},
	start() {

	},

	// update (dt) {},
});
