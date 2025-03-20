export const loadFloor = (scene) => {
    scene.floor = scene.physics.add.staticGroup()
    
    scene.floor
        .create(-20, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

        for (let i = 0; i < 2; i++) {
            scene.floor
            .create(150 + (i * 128), 228, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()
        }

        for (let i = 0; i < 2; i++) {
            scene.floor
            .create(458 + (i * 128), 228, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()
        }



        for (let i = 0; i < 4; i++) {
            scene.floor
            .create(828 + (i * 128), 228, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()
        }
    
   for (let i = 0; i < 5; i++) {
        scene.floor
        .create(1450 + (i * 128), 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
    }
}