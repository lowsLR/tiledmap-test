// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let roleMap = {
	1: {
		name: 'NPC',
		url: 'role/npc'
	},
	2: {
		name: '男猪脚',
		url: 'role/hero'
	}
}
cc.Class({
	extends: cc.Component,

	properties: {
		picSprite: cc.Sprite,
		nameLabel: cc.Label,
		textLabel: cc.Label
	},

	// LIFE-CYCLE CALLBACKS: 

	onLoad() {
		cc.systemEvent.on('keydown', this.onKeyDown, this);
		window.dialog = this.node; //将dialog这个节点全局挂载 两周都是这样
	},
	//人物初始化
	init(textDataArr) {
		this.nowText = null; //字体播放时的内容
		this.endText = true; //字体是否播放完
		this.tt = 0; //字体播放时
		this.textIndex = -1 //默认没有对话下标
		this.textDataArr = textDataArr;
		this.node.active = true; //开启对话框
		this.nextTextData();
	},
	//对话内容切换
	nextTextData() {
		if (!this.endText) return;
		if (++this.textIndex < this.textDataArr.length) {
			this.setTextData(this.textDataArr[this.textIndex])
		} else {
			this.closeTextData()
		}
	},
	//设置对话内容
	setTextData(textData) {
		if (!this.endText) return;
		this.endText = false;
		this.nameLabel.string = roleMap[textData.role].name;
		this.textLabel.string = '';
		this.nowText = textData.content;
		//动态加载头像
		cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
			this.picSprite.spriteFrame = texture;
		})
	},
	// 关闭对话框
	closeTextData() {
		this.node.active = false;
	},
	//按下空格键切换对话
	onKeyDown(e) {
		switch (e.keyCode) {
			case cc.macro.KEY.space:
				this.nextTextData()
				break;
		}
	},
	// 销毁玩家输入事件
	onDestroy() {
		cc.systemEvent.off('keydown', this.onKeyDown, this)
	},
	start() {

	},
	update(dt) {
		if (!this.nowText) return;
		this.tt += dt;
		if (this.tt > 0.1) {
			if (this.textLabel.string.length < this.nowText.length) {
				this.textLabel.string = this.nowText.slice(0, this.textLabel.string.length + 1);
			} else {
				this.endText = true;
				this.nowText = null;
			}
			this.tt = 0;
		}
	},
});
