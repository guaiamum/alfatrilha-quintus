window.addEventListener("load",function() {

  var captured_letters = 0;
  var REQUIRED_LOADS = [ 
    "sprites.png", 
    "sprites.json",
    "level.json", 
    "tiles.png",
    "boy-512.png",
    "letter.png",
    "letter_A.png",
    "letter_B.png",
    "letter_C.png",
    "letter_D.png",
    "letter_E.png",
    "letter_F.png",
    "letter_G.png",
    "letter_H.png",
    "letter_I.png",
    "letter_J.png",
    "letter_K.png",
    "letter_L.png",
    "letter_M.png",
    "letter_N.png",
    "letter_O.png",
    "letter_P.png",
    "letter_Q.png",
    "letter_R.png",
    "letter_S.png",
    "letter_T.png",
    "letter_U.png",
    "letter_V.png",
    "letter_W.png",
    "letter_X.png",
    "letter_Y.png",
    "letter_Z.png"
  ];


  var Q = window.Q = Quintus({development: true})
          .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
          // Maximize this game to whatever the size of the browser is
          .setup({ maximize: true })
          // And turn on default input controls and touch input (for UI)
          .controls().touch()

// ## Player Sprite
// The very basic player sprite, this is just a normal sprite
// using the player sprite sheet with default controls added to it.
  Q.Sprite.extend("Player",{

    init: function(p) {

      this._super(p, {
        asset: "boy-512.png",
        //sheet: "player",  // Setting a sprite sheet sets sprite width and height
        x: 72,           // You can also set additional properties that can
        y: 750             // be overridden on object creation
      });
//Y = 956; X=1088
      this.add('2d, platformerControls');

      this.on("hit.sprite",function(collision) {


        if(collision.obj.isA("Letter") ) {
          captured_letters++;
          console.log(captured_letters);
          collision.obj.destroy();
        }

        if (captured_letters == 16) {
          Q.stageScene("endGame",1, { label: "Você ganhou!" }); 
          this.destroy();
        }

      });

    }

});

  Q.Sprite.extend("Letter", {
    init: function(p) {
      this._super(p, { asset: 'letter.png' });
    }
});

// ## Level1 scene
// Create a new scene called level 1
  Q.scene("level1",function(stage) {

    // Add in a tile layer, and make it the collision layer
    stage.collisionLayer(new Q.TileLayer({
                               dataAsset: 'level.json',
                               sheet:     'tiles' }));


    // Create the player and add them to the stage
    var player = stage.insert(new Q.Player());

    // Give the stage a moveable viewport and tell it
    // to follow the player.
    stage.add("viewport").follow(player);

    // Add in a couple of enemies
    //stage.insert(new Q.Enemy({ x: 700, y: 0 }));
    //stage.insert(new Q.Enemy({ x: 800, y: 0 }));

    // Finally add in the tower goal
    stage.insert(new Q.Letter({ x: 112, y: 752, asset: "letter_A.png"}));
    stage.insert(new Q.Letter({ x: 144, y: 658, asset: "letter_B.png"}));
    stage.insert(new Q.Letter({ x: 768, y: 658, asset: "letter_C.png"}));
    stage.insert(new Q.Letter({ x: 16, y: 592, asset: "letter_E.png"}));
    stage.insert(new Q.Letter({ x: 432, y: 526, asset: "letter_D.png"}));
    stage.insert(new Q.Letter({ x: 48, y: 368, asset: "letter_F.png"}));
    stage.insert(new Q.Letter({ x: 208, y: 464, asset: "letter_G.png"}));
    stage.insert(new Q.Letter({ x: 864, y: 258, asset: "letter_H.png"}));
    stage.insert(new Q.Letter({ x: 16, y: 208, asset: "letter_K.png"}));
    stage.insert(new Q.Letter({ x: 16, y: 208, asset: "letter_J.png"}));
    stage.insert(new Q.Letter({ x: 16, y: 208, asset: "letter_I.png"}));
    stage.insert(new Q.Letter({ x: 48, y: 30 , asset: "letter_L.png"}));
    stage.insert(new Q.Letter({ x: 48, y: 30 , asset: "letter_M.png"}));
    stage.insert(new Q.Letter({ x: 432, y: 144, asset: "letter_O.png"}));
    stage.insert(new Q.Letter({ x: 592, y: 144, asset: "letter_N.png"}));
    stage.insert(new Q.Letter({ x: 1040, y: 144, asset: "letter_Z.png"}));


  });

  // To display a game over / game won popup box, 
  // create a endGame scene that takes in a `label` option
  // to control the displayed message.
  Q.scene('endGame',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

    var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                    label: "Play Again" }))         
    var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                     label: stage.options.label }));
    // When the button is clicked, clear all the stages
    // and restart the game.
    button.on("click",function() {
      Q.clearStages();
      Q.stageScene('level1');
    });

    // Expand the container to visibily fit it's contents
    // (with a padding of 20 pixels)
    container.fit(20);
  });

  Q.load(REQUIRED_LOADS, function() {
    // Sprites sheets can be created manually
    Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });

    // Or from a .json asset that defines sprite locations
    Q.compileSheets("sprites.png","sprites.json");

    // Finally, call stageScene to run the game
    Q.stageScene("level1");
  });


});
