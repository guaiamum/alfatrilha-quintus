window.addEventListener("load", function () {

    var Q = window.Q = Quintus({development: true})
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
        // Maximize this game to whatever the size of the browser is
        .setup({maximize: true})
        // And turn on default input controls and touch input (for UI)
        .controls().touch()

    var ERROS = 0;
    var ACERTOS = 0;

    //LOAD ASSETS


    Q.Sprite.extend("Player", {

        init: function (p) {
            this._super(p, {
                asset: "boy-512.png",
                x: 72,
                y: 750
            });

            this.add('2d, platformerControls');

            this.on("hit.sprite", function (collision) {

                if (collision.obj.isA("Letter")) {
                    ACERTOS++;
                    collision.obj.destroy();
                } else if (collision.obj.isA("WrongLetter")) {
                    ERROS++;
                    collision.obj.destroy();
                }
                if (ERROS == 3) {
                    Q.stageScene("endGame", 1, {label: "Você ganhou!"});
                    this.destroy();
                }

            });
        }

    });

    Q.Sprite.extend("Letter", {
        init: function (p) {
            this._super(p, {asset: 'letter.png'});
        }
    });

    Q.Sprite.extend("WrongLetter", {
        init: function (p) {
            this._super(p, {asset: 'letter.png'});
        }
    });

    Q.scene("level1", function (stage) {

        Q.stageTMX("small_level.tmx", stage);

        // Create the player and add them to the stage
        var player = stage.insert(new Q.Player());

        // Give the stage a moveable viewport and tell it
        // to follow the player.
        stage.add("viewport").follow(player);

        stage.insert(new Q.Letter({x: 112, y: 752, asset: "letter_A.png"}));
        stage.insert(new Q.WrongLetter({x: 144, y: 658, asset: "letter_B.png"}));
        stage.insert(new Q.WrongLetter({x: 768, y: 658, asset: "letter_C.png"}));
        stage.insert(new Q.WrongLetter({x: 16, y: 592, asset: "letter_E.png"}));
        stage.insert(new Q.WrongLetter({x: 432, y: 526, asset: "letter_D.png"}));
        stage.insert(new Q.WrongLetter({x: 48, y: 368, asset: "letter_F.png"}));
        stage.insert(new Q.WrongLetter({x: 208, y: 464, asset: "letter_G.png"}));
        stage.insert(new Q.WrongLetter({x: 864, y: 258, asset: "letter_H.png"}));
        stage.insert(new Q.WrongLetter({x: 16, y: 208, asset: "letter_K.png"}));
        stage.insert(new Q.WrongLetter({x: 16, y: 208, asset: "letter_J.png"}));
        stage.insert(new Q.Letter({x: 16, y: 208, asset: "letter_I.png"}));
        stage.insert(new Q.WrongLetter({x: 48, y: 30, asset: "letter_L.png"}));
        stage.insert(new Q.WrongLetter({x: 48, y: 30, asset: "letter_M.png"}));
        stage.insert(new Q.Letter({x: 432, y: 144, asset: "letter_O.png"}));
        stage.insert(new Q.WrongLetter({x: 592, y: 144, asset: "letter_N.png"}));
        stage.insert(new Q.WrongLetter({x: 1040, y: 144, asset: "letter_Z.png"}));

    });

    Q.loadTMX("small_level.tmx", function(){
        Q.stageScene("level_1");
    });

    Q.scene('endGame', function (stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
        }));

        var button = container.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC",
            label: "Play Again"
        }));

        var label = container.insert(new Q.UI.Text({
            x: 10, y: -10 - button.p.h,
            label: stage.options.label
        }));

        button.on("click", function () {
            Q.clearStages();
            Q.stageScene('level1');
        });

        container.fit(20);
    });


});
