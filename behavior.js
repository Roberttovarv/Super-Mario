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
