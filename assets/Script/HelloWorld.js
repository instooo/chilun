cc.Class({
    extends: cc.Component,

    properties: {
		  // 这个属性引用了星星预制资源
        cicunPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
		 cc.director.getCollisionManager().enabled = true;
		 cc.director.getCollisionManager().enabledDebugDraw = true;
		this.newchilun();
    },
	newchilun:function(){
		// 使用给定的模板在场景中生成一个新节点	
        var newStar = cc.instantiate(this.cicunPrefab);		
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
	},
	getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

    // called every frame
    update: function (dt) {

    },
});
