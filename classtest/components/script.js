enchant();

Enemy = Class.create(Sprite,{
	initialize: function(x,y,p){	//位置と、パターンを渡せるように引数設定
		Sprite.call(this, 32, 32);	//第一引数はコンテキスト…スコープ、以降は必要な引数
		this.x = x;
		this.y = y;
		this.image = game.assets['img/chara1.png'];
		stage.addChild(this);	//グループに追加。グループは複数の子ノードを持てるらしい。
	},
	onenterframe: function(){
		this.x -= 1;
		this.y += Math.sin( this.age*0.1);
	}

});

window.onload = function(){
	game = new Game(500, 500);
	game.preload('img/chara1.png', 'img/ball.png');
	game.onload = function(){
		stage = new Group();	//新しいグループを作成。インスタンスたちの受け皿になる予定？
		game.rootScene.addChild( stage );	//↑を、シーンに追加
		
		game.addEventListener( 'enterframe', function(){	//毎フレーム実行
			if ( game.frame%10 == 0){
				var enemy = new Enemy( 320, Math.random()*320);	//
			}
		});
	};
	game.start();
};
