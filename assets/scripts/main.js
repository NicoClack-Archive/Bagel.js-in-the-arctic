let game = Bagel.init({
    id: "game",
    width: 800,
    height: 450,
    game: {
        assets: {
            imgs: [
                {
                    id: "Person1",
                    src: "assets/imgs/person1.png"
                },
                {
                    id: "Snow",
                    src: "assets/imgs/snow.png"
                },
                {
                    id: "Background",
                    src: "assets/imgs/background.png"
                }
            ]
        },
        sprites: [
            {
                id: "Background",
                img: "Background",
                width: 800,
                height: 450,
                scripts: {
                    init: [{
                        code: null,
                        stateToRun: "Scene1"
                    }]
                }
            },
            {
                id: "Person1",
                img: "Person1",
                scripts: {
                    init: [{
                        code: me => {
                            me.scale = 5;
                            me.x = 50;
                            me.y = 350;
                        },
                        stateToRun: "Scene1"
                    }]
                }
            },
            {
                id: "Snow",
                img: "Snow",
                vars: {
                    spawnTick: 0,

                    rate: 0,
                    wind: 2,
                    gravity: 3
                },
                clones: {
                    visible: true,
                    y: -5,
                    scripts: {
                        init: [me => {
                            me.scale = (Math.random() * 5) + 5;
                            let offset = me.parent.vars.wind * (game.height / me.parent.vars.gravity); // Takes into account the wind so it's spread evenly
                            me.x = Math.round(Math.random() * (game.width + offset)) - offset;
                        }],
                        main: [me => {
                            me.y += me.parent.vars.gravity;
                            me.x += me.parent.vars.wind;
                            if (me.y - (me.height / 2) > game.height) {
                                me.delete();
                            }
                        }]
                    }
                },
                scripts: {
                    init: [{
                        code: me => {
                            me.visible = false;
                        },
                        stateToRun: "Scene1"
                    }],
                    main: [{
                        code: me => {
                            Bagel.step.sprite("tick");
                        },
                        stateToRun: "Scene1"
                    }],
                    steps: {
                        tick: me => {
                            me.vars.spawnTick++;
                            if (me.vars.spawnTick > me.vars.rate) {
                                me.vars.spawnTick = 0;
                                me.clone();
                            }
                        }
                    }
                }
            }
        ]
    },
    state: "Scene1",
    config: {
        display: {
            resolution: "fixed",
            backgroundColour: "#202020"
        },
        loading: {
            skip: false
        }
    }
});
