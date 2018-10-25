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
		//Ax+By+C=0
		line1 : {
			a : 0,
			b : 0,
			c : 0,
			minX : 0,
			maxX : 0,
			minY : 0,
			maxY : 300,
			default: null,
		},
		line2 : {
			a : 0,
			b : 0,
			c : 0,
			minX : 0,
			maxX : 300,
			minY : 0,
			maxY : 0,
			default: null,
		},
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
		this.line1 = {};
		this.line1.a = 0;
		this.line1.b = 0;
		this.line1.c = 0;
		this.line1.minX = 20;
		this.line1.maxX = 20;
		this.line1.minY = 20;
		this.line1.maxY = 300;
		
		this.line2 = {};
		this.line2.a = 0;
		this.line2.b = 0;
		this.line2.c = 0;
		this.line2.minX = 20;
		this.line2.maxX = 3000;
		this.line2.minY = 20;
		this.line2.maxY = 3000;
		
		// 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
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
	
	onTouchStart (e) {
		//cc.log("onTouchStart");
	},
	
	onTouchMove (e) {		
        var move_x = e.touch._point.x - e.touch._prevPoint.x;
        var move_y = e.touch._point.y - e.touch._prevPoint.y;
		var playerPos = this.node.getPosition();
		var newPos = cc.v2(playerPos.x + move_x, playerPos.y + move_y);
        if (this.matchLinenew(newPos,this.line1) || this.matchLinenew(newPos,this.line2)){
			this.node.setPosition(newPos);
		} else {
			cc.log("fds");
		}
	},
	
	matchLine(p,l){
		if (l.a * p.x + l.b * p.y + l.c == 0 && p.x >= l.minX && p.x <= l.maxX
		&& p.y >= l.minY && p.y <= l.maxY){
			return true;
		}
		return false;
	},
	matchLinenew(p,l){
		var subx = l.maxX-l.minX;
		var suby = l.maxY-l.miny;
		cc.log(subx);
		cc.log(suby);
		cc.log(p);
		if(subx!=0 && (p.x-l.minX)!=0){
			if ((l.maxY-l.minY)/(l.maxX-l.minX)==(p.y-l.minY)/(p.x-l.minX)){
				if((p.x-l.minX)<0){
					return false;
				}
				if((p.x-l.maxX)>0){
					return false;
				}
				return true;
			}
		}else if(suby!=0 && (p.y-l.minY)!=0){
			if ((l.maxX-l.minX)/(l.maxY-l.minY)==(p.x-l.minX)/(p.y-l.minY)){
				if((p.y-l.minY)<0){
					return false;
				}
				if((p.y-l.maxY)>0){
					return false;
				}
				return true;
			}
		}
		return false;
	},
	
	onTouchEnd (e) {
		cc.log("onTouchEnd");
	},
	
	onTouchCancel (e) {
		cc.log("onTouchCancel");
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
