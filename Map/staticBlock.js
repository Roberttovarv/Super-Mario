export const loadStaticBlock = (scene) => {
    scene.staticBlock = scene.physics.add.staticGroup()

    scene.staticBlock
        .create(180, 203, 'immovable-block')
        .refreshBody()

    scene.staticBlock
        .create(360, 203, 'immovable-block')
        .refreshBody()

    scene.staticBlock
        .create(590, 187, 'immovable-block')
        .refreshBody();

    for (let i = 0; i < 3; i++) {
        scene.staticBlock
            .create(590 + (i * 35), 187 - (i * 16), 'immovable-block')
            .refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        scene.staticBlock
            .create(890 + (i * 35), 155 + (i * 16), 'immovable-block')
            .refreshBody();
    }

    for (let i = 0; i < 11; i++) {
        scene.staticBlock
            .create(695 + (i * 16), 139, 'immovable-block')
            .refreshBody()
    }




}