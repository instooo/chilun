// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		left : true,
		right : true,
		up : true,
		down : true,
		// a w s d
		lastOp : "a",
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		// 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	},
	onKeyDown (event) {
        var playerPos = this.node.getPosition();
        switch(event.keyCode) {
            case 65:
                if (this.left){
					playerPos = playerPos.sub(cc.Vec2.RIGHT);
				}
				this.lastOp = "a";
                break;
            case 68:
                if (this.right){
					playerPos = playerPos.add(cc.Vec2.RIGHT);
				}
				this.lastOp = "d";
                break;
			case 87:
                if (this.up){
					playerPos = playerPos.add(cc.Vec2.UP);
				}
				this.lastOp = "w";
                break;
            case 83:
                if (this.down){
					playerPos = playerPos.sub(cc.Vec2.UP);
				}
				this.lastOp = "s";
                break;
        }
		this.node.setPosition(playerPos);
    },
	onCollisionEnter: function (other) {
        cc.log("onCollisionEnter");
		switch (this.lastOp){
			case "a":
			this.left = true;
			break;
			case "s":
			this.down = true;
			break;
			case "d":
			this.right = true;
			break;
			case "w":
			this.up = true;
			break;
		}
    },

    onCollisionStay: function (other) {
        //cc.log("onCollisionStay");
    },

    onCollisionExit: function () {
        cc.log("onCollisionExit");
		switch (this.lastOp){
			case "a":
			this.left = false;
			break;
			case "s":
			this.down = false;
			break;
			case "d":
			this.right = false;
			break;
			case "w":
			this.up = false;
			break;
		}
    },

    start () {

    },

    // update (dt) {},
});
