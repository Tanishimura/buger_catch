// This is a JavaScript file

                    var gu1 = new Sprite(56, 276);
                    gu1.fps = 5;
                    gu1.frame = Math.floor(Math.random()*6);
                    gu1.image = core.assets['burger.png'];
                    gu1.x = Math.random()*(768-burger.width);
                    gu1.y = -500*1;
                    gu1.scale(0.8, 0.8);
                    core.rootScene.addChild(gu1);
                    
                    var gu2 = new Sprite(56, 276);
                    gu2.fps = 5;
                    gu2.frame = Math.floor(Math.random()*6);
                    gu2.image = core.assets['burger.png'];
                    gu2.x = Math.random()*(768-burger.width);
                    gu2.y = -500*2;
                    gu2.scale(0.8, 0.8);
                    core.rootScene.addChild(gu2);
