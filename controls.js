export function gameControls({ mario, keys }) {
    let moving = false

    const isTouchingFloor = mario.body.touching.down


    const isLeftKeyDown = keys.left.isDown
    const isUpKeyDown = keys.up.isDown
    const isRightKeyDown = keys.right.isDown
    const isShiftKeyDown = keys.sprint.isDown

    if (mario.isDead)  {return}

    if (isLeftKeyDown) {
        if (!isTouchingFloor) {
            mario.setVelocityX(-120)
            mario.flipX = true
            moving = true
            mario.anims.play('mario-jump', true)    
        }
        isTouchingFloor && mario.anims.play('mario-walk', true)
        mario.setVelocityX(-120)
        mario.flipX = true
        moving = true
    } else if (isRightKeyDown){
        if (!isTouchingFloor) {
            mario.setVelocityX(120)
            mario.flipX = false
            moving = true
            mario.anims.play('mario-jump', true)    
        }
        mario.setVelocityX(120)
        isTouchingFloor && mario.anims.play('mario-walk', true)
        mario.flipX = false
        moving = true  
    } else if (isTouchingFloor) {
        mario.anims.play('mario-idle', true)
    }

    if (isUpKeyDown && isTouchingFloor) {
       mario.setVelocityY(-200)
       mario.anims.play('mario-jump', true)

    } else if (!moving) {
        mario.anims.play('mario-idle', true)
        mario.setVelocityX(0)

    }

    if(isShiftKeyDown) {
        if(isLeftKeyDown){
            mario.setVelocityX(-200)
            moving = true
            mario.flipX = true

        } else if(isRightKeyDown) {
            mario.setVelocityX(200)
            moving = true
            mario.flipX = false
        }
    }
}