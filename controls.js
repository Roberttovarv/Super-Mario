const MARIO_ANIMATIONS = {
    grown: {
        idle: 'mario-grown-idle',
        crouch: 'mario-grown-crouch',
        walk: 'mario-grown-walk',
        jump: 'mario-grown-jump'
    },
    normal: {
        idle: 'mario-idle',
        dead: 'mario-dead',
        walk: 'mario-walk',
        jump: 'mario-jump'
    }
}

export function gameControls({ mario, keys }) {
    let moving = false
    const isTouchingFloor = mario.body.touching.down
    const marioAnims = mario.isGrown ? MARIO_ANIMATIONS.grown : MARIO_ANIMATIONS.normal

    const isJumpPressed = Phaser.Input.Keyboard.JustDown(keys.up)
    const isLeftKeyDown = keys.left.isDown
    const isDownKeyDown = keys.down.isDown
    const isRightKeyDown = keys.right.isDown
    const isShiftKeyDown = keys.sprint.isDown

    if (mario.isDead) return
    if (mario.isBlocked) return

    if (isLeftKeyDown) {
        if (!isTouchingFloor) {
            mario.setVelocityX(-120)
            mario.flipX = true
            moving = true
            mario.anims.play(marioAnims.jump, true)
        }
        isTouchingFloor && mario.anims.play(marioAnims.walk, true)
        mario.setVelocityX(-120)
        mario.flipX = true
        moving = true
    } else if (isRightKeyDown) {
        if (!isTouchingFloor) {
            mario.setVelocityX(120)
            mario.flipX = false
            moving = true
            mario.anims.play(marioAnims.jump, true)
        }
        mario.setVelocityX(120)
        isTouchingFloor && mario.anims.play(marioAnims.walk, true)
        mario.flipX = false
        moving = true
    } else if (isTouchingFloor) {
        mario.anims.play(marioAnims.idle, true)
    }

    if (isJumpPressed && isTouchingFloor) {
        mario.setVelocityY(-200)
        mario.anims.play(marioAnims.jump, true)
    }
    if (!isTouchingFloor) {
        mario.anims.play(marioAnims.jump, true)
    }
    else if (!moving) {
        mario.anims.play(marioAnims.idle, true)
        mario.setVelocityX(0)

    }

    if (isShiftKeyDown) {
        if (isLeftKeyDown) {
            mario.setVelocityX(-200)
            moving = true
            mario.flipX = true

        } else if (isRightKeyDown) {
            mario.setVelocityX(200)
            moving = true
            mario.flipX = false

        }
    }

    if (isDownKeyDown) {
        if (mario.isGrown) {
            mario.anims.play(marioAnims.crouch, true)
        }
    }

    // if ( 
    //     isNotLeftKeyDown
    //     && isNotDownKeyDown
    //     && isNotRightKeyDown
    //     && isNotShiftKeyDown
    // ) {
    //     mario.setVelocityX(0)
    // }

    // if (
    //     isNotJumpPressed
    //     && isNotUpKeyDown
    // ) {
    //     mario.setVelocityX(0)
    // }
    
}