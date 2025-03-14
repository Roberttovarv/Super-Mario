export function gameControls({ mario, keys }) {
    let moving = false

    const isTouchingFloor = mario.body.touching.down


    const isLeftKEyDown = keys.left.isDown
    const isUpKEyDown = keys.up.isDown
    const isRightKEyDown = keys.right.isDown

    if (mario.isDead)  {return}

    if (isLeftKEyDown) {
        isTouchingFloor && mario.anims.play('mario-walk', true)
        mario.setVelocityX(-120)
        mario.flipX = true
        moving = true
    } else if (isRightKEyDown){
        mario.setVelocityX(120)
        isTouchingFloor && mario.anims.play('mario-walk', true)
        mario.flipX = false
        moving = true  
    } else if (isTouchingFloor) {
        mario.anims.play('mario-idle', true)
    }

    if (isUpKEyDown && isTouchingFloor) {
       mario.setVelocityY(-200)
       mario.anims.play('mario-jump', true)

    } else if (!moving) {
        mario.anims.play('mario-idle', true)
        mario.setVelocityX(0)

    }
}