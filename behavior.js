import { playAudio } from "./audio.js"

export const killMario = (scene, { mario }) => {
    
    mario.isDead = true
    mario.anims.play('mario-dead', true)
    playAudio('gameover', scene, {volume: 0.2})
    mario.body.checkCollision.none = true
    mario.setVelocityX(0)
       
    setTimeout(() => {
        mario.setVelocityY(-350)
        mario.setCollideWorldBounds(false)
    }, 100)

    setTimeout(() => {
        scene.scene.restart()
    }, 1650)
}

export const collectItem = (scene, mario, item) => {

    if(!item) return

        const { texture: { key } } = item
        if (item.isCollected) return
        item.destroy()

        if (key === 'coin') {

            item.isCollected = true
            playAudio('coin-collect', scene, { volume: 0.1 })
            addScore(100, item, scene)
        }

        if (key === 'mushroom') {
            playAudio('powerup', scene, { volume: 0.2 })
            scene.physics.world.pause()
            scene.anims.pauseAll()
            mario.isBlocked = true
            
            let i = 0
            const interval = setInterval(() => {
                mario.anims.play(i % 2 === 0
                    ? 'mario-grown-idle'
                    : 'mario-idle'
                )
                i++
            }, 100)
            
            setTimeout(() => {
                mario.setDisplaySize(18, 32)
                mario.body.setSize(18, 32)
                mario.setScale(1)
                mario.setOffset(0, 0)
                mario.isGrown = true
                mario.isBlocked = false
                clearInterval(interval)
                scene.physics.world.resume()
                scene.anims.resumeAll()
            }, 1000)

        }
    }

export const addScore = (score, origin, game) => {
    const scoreText = game.add.text(
        origin.getBounds().x,
        origin.getBounds().y,
        score,
        {
            fontFamily: 'SMF',
            fontSize: config.width / 25
        }
    )

    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    scoreText.destroy()
                }
            })
        }
    })
    
}

export const isTouchingEnemy = (scene, mario, enemy) => {
        if (mario.isDead) return

        if (enemy.body.touching.up && mario.body.touching.down) {
            enemy.anims.play('goomba-dead', true)
            playAudio('goomba-kill', scene)
            mario.setVelocityY(-150)
            enemy.setVelocityX(0)
            enemy.disableBody(true, false)

            setTimeout(() => {
                enemy.destroy()
            }, 500)
            addScore(200, enemy, scene)

            return;
        }

        if (mario.isGrown) {

            playAudio('powerdown', scene, { volume: 0.2 })
            scene.physics.world.pause()
            scene.anims.pauseAll()
            mario.isBlocked = true

            let i = 0
            const interval = setInterval(() => {
                mario.anims.play(i % 2 === 0
                    ? 'mario-grown-idle'
                    : 'mario-idle'
                )
                i++
            }, 100)


            setTimeout(() => {
                mario.setDisplaySize(18, 16)
                mario.body.setSize(18, 16)
                mario.setScale(1)
                mario.isGrown = false
                mario.isBlocked = false
                clearInterval(interval)
                scene.physics.world.resume()
                scene.anims.resumeAll()
            }, 1000)
        }

        if (enemy.body.touching.left
            && mario.body.touching.right
            && !mario.isBlocked
            || enemy.body.touching.right
            && mario.body.touching.left
            && !mario.isBlocked) {
            killMario(scene, { mario: scene.mario })

        }
    };