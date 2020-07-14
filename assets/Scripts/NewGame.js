// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		prefabHero: cc.Prefab,
		prefabNpc: cc.Prefab,
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {	
		let scene = cc.director.getScene();
		for (let i = 1; i < 4; i++) {
			let nodeHero = cc.instantiate(this.prefabHero);
			nodeHero.parent = scene;
			nodeHero.setPosition(150 * i, 400);
			let nodeNpc = cc.instantiate(this.prefabNpc);
			nodeNpc.parent = scene;
			nodeNpc.setPosition(150 * i, 200);
		}
		this.node.opacity = 0;
		this.node.runAction(cc.fadeIn(1.0));
	},

	start() {

	},

	// update (dt) {},
});
