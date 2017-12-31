enchant();

//■■■■■■■■■■■■■■■■■■■■
//オブジェクト定義
//■■■■■■■■■■■■■■■■■■■■

gutati = [];	// 追加したオブジェクトを格納する配列です。
Gu = Class.create(Sprite,{	//クラスを作るメソッド。第一引数に継承元のクラスを。変数に収めることでオーバーライドした新しいクラスを作成できる。
	initialize: function(x,y,p){	
		// 位置と、パターンを渡せるように引数設定。initializeはコンストラクタなんですって。最初に実行される初期化関数。対義語はディスコンストラクタですって。意味は知らないけど。
		Sprite.call(this, 56, 276);	// 第一引数はコンテキスト…スコープ、以降は必要な引数。最初にcallすることで事実上継承してるみたい。
		this.x = x;
		this.y = y;
		this.image = core.assets['img/burger.png'];
		this.fps = 5;
		// 指定の具にしたい場合、pを使ってパターンを渡せるようにはしてあります。
		this.frame = Math.floor(Math.random()*5+1);
		this.scale(0.8, 0.8);
		core.rootScene.addChild(this);	// グループに追加。グループは複数の子ノードを持てるらしい。
		gutati[gutati.length] = this;	// 配列の一番うしろに、今作成したインスタンスを追加しています。蛇電車状態。
	},
	onenterframe: function(){
		this.y += 10;
		this.x += Math.sin( this.age*0.1);
	}
});


window.onload = function() {
	
	//■■■■■■■■■■■■■■■■■■■■
	//Coreシーン
	//■■■■■■■■■■■■■■■■■■■■
	core = new Core(768, 1024);
	core.fps = 25;
	core.preload('img/01_hidarite.png','img/02_migite.png','img/haikei.png','img/burger.png','img/kao.png','sound/damage3.mp3','sound/swing1.mp3','sound/famipop4.mp3','img/main.png');
	core.onload = function() {
		//▼BGM
		core.assets['sound/famipop4.mp3'].volume = 0.3;
		core.assets['sound/famipop4.mp3'].play();
		core.assets['sound/famipop4.mp3'].loop = "true";

		/*----------------------------------
		舞台素材
		----------------------------------*/
		// 背景
		var haikei = new Sprite(768, 1024);
		haikei.image = core.assets['img/haikei.png'];
		haikei.x = 0;
		haikei.y = 0;
		haikei.scale(1, 1);
		core.rootScene.addChild(haikei);
		
		// 右手
		var migite = new Sprite(306, 996);
		migite.image = core.assets['img/02_migite.png'];
		migite.x = 470;
		migite.y = 463;
		migite.scale(0.5, 0.5);
		core.rootScene.addChild(migite);
		
		// 左手
		var hidarite = new Sprite(306, 996);
		hidarite.image = core.assets['img/01_hidarite.png'];
		hidarite.x = - 50;
		hidarite.y = 463;
		hidarite.scale(0.5, 0.5);
		core.rootScene.addChild(hidarite);
		
		// 顔
		var kao = new Sprite(752, 283);
		kao.image = core.assets['img/kao.png'];
		kao.x = 0;
		kao.y = 880;
		kao.scale(1, 1);
		kao.gu_flg = 1;
		core.rootScene.addChild(kao);
		
		// 時間を計る変数tick
		core.tick = 0;
			
		/*----------------------------------
		UI
		----------------------------------*/
		// タイム
		var infoLabel = new Label(kao.gu_flg);
		infoLabel.x = 0;
		infoLabel.y = 0;
		infoLabel.font = '100px sens-serif';
		core.rootScene.addChild(infoLabel);

		// スコア
		var score_label = new Label("score：");
		score_label.x = 580;
		score_label.y = 10;
		score_label.font = '50px sens-serif';
		core.rootScene.addChild(score_label);

		/*----------------------------------
		以下、イベントリスナー系
		----------------------------------*/
		core.addEventListener( 'enterframe', function(){	//毎フレーム実行
			if ( core.frame%100 == 0){	//10回に１回実行。密度を1/10に減らす。
				var gu = new Gu( Math.random()*768, 0);
			}
			infoLabel.text = core.tick;
			core.tick += 1;
		});
		
		kao.addEventListener('touchstart',function(e) {
				core.assets['sound/swing1.mp3'].play();
				for( i=0, len=gutati.length; i<len; i++){	// 全ての具をチェックします。
					score_label.text = i;
					if ( migite.x <= gutati[i].x && gutati[i].x <= hidarite.x) {
						console.log("get");
					}
				}
		})

		kao.addEventListener('touchmove',function(e) {
				this.x = e.x - this.width /2;
				migite.x =  this.x + 100 + this.width /2;
				hidarite.x =  this.x + 290 - this.width /2;
		})
		
		kao.addEventListener('touchend',function(e) {
				migite.x =  this.x - 90 + this.width /2;
				hidarite.x =  this.x  - 210 + this.width /2;
				core.assets['sound/damage3.mp3'].play();
		})
									   

	}
	core.start();
	
}
