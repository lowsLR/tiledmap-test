// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
// 对话npc
let npc1 = [{
		role: 1,
		content: '学ccos吗？跑路的那种'
	}, {
		role: 2,
		content: '是入门到放弃吗？'
	},
	{
		role: 1,
		content: '是的，入门到放弃'
	},
	{
		role: 1,
		content: '删代码到跑路'
	},
	{
		role: 2,
		content: '有没有demo啊，啊, ，啊，啊，啊, '
	}
];
let npc2 = [{
	role: 1,
	content: '碰到了，战斗'
}, {
	role: 2,
	content: '战斗'
}];
let peng = [{
	role: 2,
	content: '你撞墙了!'
}]
cc.Class({
	extends: cc.Component,

	properties: {
		dialogNode: cc.Node
	},

	// use this for initialization
	onLoad: function() {
		this.player = this.node.getChildByName('player');
		// cc.log(this.player,"===>this.player")
		this.loadMap();

		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

		this.dialog = this.dialogNode.getComponent('dialog');
		// this.dialog.init(npc2)
		this.dialog.closeTextData() //初始化关闭对话框
		// 战争迷雾
		// cc.director.getCollisionManager().enabled = true;
		// cc.director.getCollisionManager().enabledDebugDraw = true;
		// this.tryCatchStarfalse = true;
	},

	onKeyDown: function(event) {
		var newTile = cc.v2(this.playerTile.x, this.playerTile.y);
		if (window.dialog && window.dialog.active) return;
		switch (event.keyCode) {
			case cc.macro.KEY.up:
			case cc.macro.KEY.w:
				newTile.y -= 1;
				break;
			case cc.macro.KEY.down:
			case cc.macro.KEY.s:
				newTile.y += 1;
				break;
			case cc.macro.KEY.left:
			case cc.macro.KEY.a:
				newTile.x -= 1;
				break;
			case cc.macro.KEY.right:
			case cc.macro.KEY.d:
				newTile.x += 1;
				break;
			default:
				return;
		}
		this.tryMoveToNewTile(newTile);
	},

	//加载地图文件时调用 
	loadMap: function() {
		//初始化地图位置
		this.node.setPosition(cc.visibleRect.bottomLeft);
		//地图
		this.tiledMap = this.node.getComponent(cc.TiledMap);
		//players对象层
		let players = this.tiledMap.getObjectGroup('players');
		// cc.log(players,"==>players");
		//startPoint和endPoint对象
		let startPoint = players.getObject('startPoint');
		let endPoint = players.getObject('endPoint');
		// cc.log(startPoint,"==>startPoint");
		//像素坐标
		// let startPos = cc.v2(startPoint.offset.x, startPoint.offset.y);
		let startPos = cc.v2(0, 0);
		let endPos = cc.v2(endPoint.offset.x, endPoint.offset.y);
		// cc.log(startPos,"==>startPos")
		//障碍物图层和星星图层
		this.barriers = this.tiledMap.getLayer('barriers');
		this.stars = this.tiledMap.getLayer('stars');
		//出生Tile和结束Tile
		this.playerTile = this.startTile = this.getTilePos(startPos);
		this.endTile = this.getTilePos(endPos);
		//更新player位置
		this.updatePlayerPos();
		this.smogMove();
	},
	// 获取战争迷雾层
	smogMove(pos, tryCatchStarfalse) {
		let smogLayer = this.tiledMap.getLayer('smog');
		// cc.log(smogLayer, "==?smogLayer获取")
		// smogLayer.node.active = true;
		smogLayer.node.active = false;
		let smogSize = smogLayer.getLayerSize();
		// cc.log(smogSize, "==?smogSize获取");
		// for (let i = 0; i < smogSize.width; i++) {
		// 	for (let j = 0; j < smogSize.height; j++) {
		// 		// 通过 getTiledTileAt 获取 TiledTile
		// 		let tiled = smogLayer.getTiledTileAt(i, j, true);
		// 		// cc.log(tiled, "===>tiled")
		// 		// tiled.node.active = false;
		// 		// tiled.gid = 0;
		// 		if (tiled.node.x == pos.x && tiled.node.y == pos.y) {
		// 			tiled.gid = 0;

		// 		}
		// 		if (tiled.x == pos.x && tiled.y == pos.y) {
		// 			tiled.gid = 0;
		// 		}
		// 		if (tryCatchStarfalse) {
		// 			if (tiled.x == pos.x && tiled.y == pos.y) {
		// 				tiled.gid = 0;
		// 				this.scheduleOnce(() => {
		// 					this.tryCatchStarfalse = false;
		// 				}, 2);
		// 			}
		// 		}
		// 	}
		// }
	},
	// 人物移动
	tryMoveToNewTile: function(newTile) {
		let width = this.tiledMap.node.width;
		let height = this.tiledMap.node.height;
		// cc.log(width, "===>width")
		// cc.log(height, "===>height")
		let size = this.tiledMap.getTileSize();
		if (newTile.x < 0 || newTile.x >= width / size.width) return;
		if (newTile.y < 0 || newTile.y >= height / size.height) return;
		if (this.barriers.getTileGIDAt(newTile)) { //GID=0,则该Tile为空 
			cc.log('This way is blocked!', newTile);
			// this.smogMove(newTile)
			this.dialog.init(peng);
			// this.scheduleOnce(() => {
			// 	this.dialog.closeTextData();
			// }, 2)
			return false;
		}
		this.tryCatchStar(newTile);

		this.playerTile = newTile;
		this.updatePlayerPos();

		if (cc.Vec2(this.playerTile, this.endTile)) {
			cc.log('succeed');
		}
	},

	tryCatchStar: function(newTile) {
		let GID = this.stars.getTileGIDAt(newTile);
		let prop = this.tiledMap.getPropertiesForGID(GID);
		// cc.log("GID==>", GID);
		// cc.log("prop==>", prop);
		if (this.stars.getTileGIDAt(newTile)) { //GID=0,则该Tile为空
			// let tryCatchStarfalse = true;
			// this.smogMove(newTile, tryCatchStarfalse);
			// if (this.tryCatchStarfalse == false) {
			// 通过指定的 tile 坐标获取对应的 TiledTile。
			this.stars.getTiledTileAt(newTile.x, newTile.y, true)
			//如果一个 tile 已经放在那个位置，那么它将被删除。 
			this.stars.setTileGIDAt(0, newTile.x, newTile.y)
			// console.log('removeTileAt: ', newTile)
			// cc.log("===>eat stars<==", newTile.x); 
			if (newTile.x == 4) {
				this.dialog.init(npc1);
			} else {
				this.dialog.init(npc2);
				//切换场景 
				this.node.runAction(cc.sequence(cc.fadeOut(1.0), cc.callFunc(function() {
					cc.director.loadScene('NewGame')
				})));
			}
			// }
		}
	},

	//将像素坐标转化为瓦片坐标 
	getTilePos: function(posInPixel) {
		let mapSize = this.node.getContentSize();
		let tileSize = this.tiledMap.getTileSize();
		let x = Math.floor(posInPixel.x / tileSize.width);
		let y = Math.floor(posInPixel.y / tileSize.height);
		return cc.v2(x, y);
	},

	updatePlayerPos: function() {
		let pos = this.barriers.getPositionAt(this.playerTile);
		// cc.log(pos, "===>pos") 
		this.player.setPosition(pos);
		// this.smogMove(pos)
	},
});
