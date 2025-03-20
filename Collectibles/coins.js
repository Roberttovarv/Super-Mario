export const loadCoins = (scene) => {    
    scene.staticCollectibles = scene.physics.add.staticGroup()


    for (let i = 0; i < 11; i++){
        scene.staticCollectibles
            .create(695 + (i * 16), 120, 'coin')
            .anims.play('coin-spin', true)

    }
}