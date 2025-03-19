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
    
    scene.staticBlock
        .create(625, 171, 'immovable-block')
        .refreshBody()

        scene.staticBlock
        .create(660, 155, 'immovable-block')
        .refreshBody()

        for (let i = 0; i < 10; i ++){
            scene.staticBlock
            .create(660 +(i * 16) , 155, 'immovable-block')
            .refreshBody()
        }
    
        
}