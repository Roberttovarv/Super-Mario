export const loadCoins = (scene) => {    
    scene.staticCollectibles = scene.physics.add.staticGroup()


    for (let i = 0; i < 6; i++){
        scene.staticCollectibles
            .create(695 + (i * 32), 120, 'coin')
            .anims.play('coin-spin', true)

    }
}