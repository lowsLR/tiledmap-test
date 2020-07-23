// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		prefabHero: cc.Prefab
	},

	// LIFE-CYCLE CALLBACKS: 

	onLoad() {
		let scene = cc.director.getScene();
		let nodeHero;
		this.heroArr = [];
		for (let i = 1; i < 4; i++) {
			nodeHero = cc.instantiate(this.prefabHero);
			nodeHero.parent = scene;
			nodeHero.setPosition(200 * i, 400);
			this.heroArr.push(nodeHero);
		}
	},

	start() {

	},

	// update (dt) {},
});
