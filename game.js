import { createAnimations } from "./animations.js"

/* global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update 
    }
}

new Phaser.Game(config)

function preload () {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
}

function create () {
    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)

    this.mario = this.physics.add.sprite(50, 200, 'mario')
        .setOrigin(0, 0.4)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        

    this.floor = this.physics.add.staticGroup()
    

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.physics.add.collider(this.mario, this.floor)
    this.physics.world.setBounds(0, 0, 2000, config.height)
    
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S
    })

}

function update () {
    let moving = false

    if (this.mario.isDead)  {return}

    if (this.keys.left.isDown) {
        this.mario.x -=2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true
        moving = true
    } else if (this.keys.right.isDown){
        this.mario.x += 2;
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = false
        moving = true
  
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
       this.mario.setVelocityY(-200)
       this.mario.anims.play('mario-jump', true)

    } else if (!moving) {
        this.mario.anims.play('mario-idle', true)
    }

    if (this.mario.y >= config.height - 10){
        this.mario.isDead = true
        this.mario.anims.play('mario-dead', true)
        this.sound.add('gameover', { volume: 0.2}).play()

        setTimeout(() => {
         this.mario.setVelocityY(-350)   
        }, 100)
        
        setTimeout(() => {
            this.scene.restart()
        }, 1650)
// Comment 

        
    }
}
