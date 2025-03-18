import { createAnimations } from "./animations.js"
import { inGameAudio, playAudio } from "./audio.js"
import { killMario } from "./behavior.js"
import { gameControls } from "./controls.js"
import { loadImage } from "./images.js"
import { loadSpriteSheets } from "./spritesheets.js"

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
            // debug: true
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

new Phaser.Game(config)

function preload() {

    loadImage(this)

    loadSpriteSheets(this)

    inGameAudio(this)
}

function create() {
    createAnimations(this)

    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)

    this.staticBlock = this.physics.add.staticGroup()

    this.staticBlock
        .create(180, config.height - 40.5, 'immovable-block')
        .refreshBody()

    this.staticBlock
        .create(360, config.height - 40.5, 'immovable-block')
        .refreshBody()

    this.mario = this.physics.add.sprite(50, 200, 'mario')
        .setOrigin(0, 0.4)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setSize(16, 18) // Ajusta el tamaño del cuerpo de Mario
        .setOffset(0, 0)
    this.mario.setDepth(1)


    this.floor = this.physics.add.staticGroup()

    this.goomba = this.physics.add.sprite(250, config.height - 64, 'goomba')
        .setOrigin(0, 1)
        .setVelocityX(-50)

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(278, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.collectibles = this.physics.add.staticGroup()
    this.collectibles.create(150, 180, 'coin').anims.play('coin-spin', true)
    this.collectibles.create(330, 180, 'coin').anims.play('coin-spin', true)
    this.collectibles.create(180, 180, 'mushroom')


    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.goomba, this.floor)

    this.physics.add.collider(this.goomba, this.staticBlock, (goomba, block) => {
        if (goomba.x < block.x) {
            goomba.setVelocityX(-50);
        } else {
            goomba.setVelocityX(50);
        }
    });

    this.physics.add.overlap(this.mario, this.collectibles, collectItem, null, this)

    this.physics.add.collider(this.mario, this.goomba, isTouchingEnemy, null, this)


    this.physics.add.collider(this.mario, this.staticBlock)
    this.physics.world.setBounds(0, 0, 2000, config.height + 40)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)


    this.goomba.anims.play('goomba-walk', true)


    this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT
    })

    function isTouchingEnemy(mario, enemy) {
        if (mario.isDead) return

        if (enemy.body.touching.up && mario.body.touching.down) {
            enemy.anims.play('goomba-dead', true)
            playAudio('goomba-kill', this)
            mario.setVelocityY(-150)
            enemy.setVelocityX(0)
            enemy.disableBody(true, false)

            setTimeout(() => {
                enemy.destroy()
            }, 500)
            addScore(200, enemy, this)

            return;
        }

        if (mario.isGrown) {

            playAudio('powerdown', this, { volume: 0.2 })
            this.physics.world.pause()
            this.anims.pauseAll()
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
                this.physics.world.resume()
                this.anims.resumeAll()
            }, 1000)
        }

        if (enemy.body.touching.left
            && mario.body.touching.right
            && !mario.isBlocked
            || enemy.body.touching.right
            && mario.body.touching.left
            && !mario.isBlocked) {
            killMario(this, { mario: this.mario })

        }
    };

    function collectItem(mario, item) {

        const { texture: { key } } = item
        if (item.isCollected) return
        item.destroy()

        if (key === 'coin') {

            item.isCollected = true
            playAudio('coin-collect', this, { volume: 0.1 })
            addScore(100, item, this)
        }

        if (key === 'mushroom') {
            playAudio('powerup', this, { volume: 0.2 })
            this.physics.world.pause()
            this.anims.pauseAll()
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
                this.physics.world.resume()
                this.anims.resumeAll()
            }, 1000)

        }
    }
}

function addScore(score, origin, game) {
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


function update() {
    gameControls(this)

    const { mario, sound, scene, goomba } = this

    if (mario.y >= config.height && !mario.isDead) {
        killMario(this, { mario: mario })
    }
}






