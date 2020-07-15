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
		this.node.opacity = 0;
		this.node.runAction(cc.fadeIn(1.0));
		let scene = cc.director.getScene();
		let nodeHero, nodeNpc, heroArr = [],
			npcArr = [];
		for (let i = 1; i < 4; i++) {
			nodeHero = cc.instantiate(this.prefabHero);
			nodeHero.parent = scene;
			nodeHero.setPosition(150 * i, 400);
			nodeNpc = cc.instantiate(this.prefabNpc);
			nodeNpc.parent = scene;
			nodeNpc.setPosition(150 * i, 200);
			heroArr.push(nodeHero);
			npcArr.push(nodeNpc);
		}
		// cc.log(heroArr, "==???nodeHero");
		// let hero = heroArr[0].children[0].getComponent('action');
		// hero.actionFun(1);
		heroArr[0].children[0].getComponent('action').actionFun(1);
		heroArr[1].children[0].getComponent('action').actionFun(1);
		heroArr[2].children[0].getComponent('action').actionFun(2);
		npcArr[0].children[0].getComponent('action').actionFun(2);
		npcArr[1].children[0].getComponent('action').actionFun(1);
		npcArr[2].children[0].getComponent('action').actionFun(1);
		// cc.log(hero,"==???预制资源");
	},

	start() {

	},

	// update (dt) {
	// },
});
