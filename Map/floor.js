export const loadFloor = (scene) => {
    scene.floor = scene.physics.add.staticGroup()
    
    scene.floor
        .create(-20, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(150, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(278, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(458, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(586, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(828, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(956, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(1084, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(1212, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
    
    scene.floor
        .create(1400, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(1528, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
    
    scene.floor
        .create(1656, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(1784, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(1912, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    scene.floor
        .create(2030, 228, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
}