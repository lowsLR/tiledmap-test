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
		btn: [cc.Button]
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		this.node.opacity = 0;
		this.node.runAction(cc.fadeIn(1.0));
		let scene = cc.director.getScene();
		let nodeHero, nodeNpc;
		this.heroArr = [];
		this.npcArr = [];
		for (let i = 1; i < 4; i++) {
			nodeHero = cc.instantiate(this.prefabHero);
			nodeHero.parent = scene;
			nodeHero.setPosition(150 * i, 400);
			nodeNpc = cc.instantiate(this.prefabNpc);
			nodeNpc.parent = scene;
			nodeNpc.setPosition(150 * i, 200);
			this.heroArr.push(nodeHero);
			this.npcArr.push(nodeNpc);
		}
	},
	actionFun(index, dt, cloum, zl) {
		// cc.log("你获取到了index",index,zl)  
		switch (index) {
			case 1:
				this.heroArr[0].children[0].getComponent('action').setActionFun(index, dt, cloum);
				break;
			case 2:
				this.npcArr[0].children[0].getComponent('action').setActionFun(index, dt, cloum);
				break;
			case 3:
				this.npcArr[2].children[0].getComponent('action').setActionFun(index, dt, cloum, zl);
				break;
			case 4:
				this.npcArr[1].children[0].getComponent('action').setActionFun(index, dt, cloum, zl);
				break;
		}
	},
	start() {

	},

	// update (dt) {
	// },
});
