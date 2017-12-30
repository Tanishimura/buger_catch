enchant();

window.onload = function(){
	var game = new Game(500, 500);
	game.preload('img/chara1.png', 'img/ball.png');
	game.onload = function(){
		var star = new Sprite(32, 32);
		star.image = game.assets['img/chara1.png'];
		star.frame = 5;
		game.rootScene.addChild(star);
	};
	game.start();
};
