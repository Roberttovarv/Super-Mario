export const createAnimations = (game) => {
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 }
        ),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-grown-walk',
        frames: game.anims.generateFrameNumbers(
            'mario-grown',
            { start: 1, end: 3 }
        ),
        frameRate: 18,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 0}]
    })

    game.anims.create({
        key: 'mario-grown-idle',
        frames: [{ key: 'mario-grown', frame: 0}]
    })
    
    game.anims.create({
        key: 'mario-jump',
        frames: [{key: 'mario', frame: 5}]
    })
    
    game.anims.create({
        key: 'mario-grown-jump',
        frames: [{key: 'mario-grown', frame: 5}]
    })
    
    game.anims.create({
        key: 'mario-dead',
        frames: [{key: 'mario', frame: 4}]
    })

    game.anims.create({
        key: 'mario-grown-crouch',
        frames: [{key: 'mario-grown', frame: 4}]
    })


    game.anims.create({
        key: 'goomba-walk',
        frames: game.anims.generateFrameNumbers(
            'goomba',
            {start : 0, end: 1}
        ),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'goomba-dead',
        frames: [{key: 'goomba', frame: 2}]
    })

    game.anims.create({
        key: 'coin-spin',
        frames: game.anims.generateFrameNumbers(
            'coin',
            {start: 0, end: 3}),
        frameRate: 12,
        repeat: -1

    })

    game.anims.create({
        key: 'mistery-block-switch',
        'frames': game.anims.generateFrameNumbers(
            'mistery-block',
            { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
    })

    game.anims.create({
        key: 'empty-mistery-block',
        'frames': [{key: 'empty-block', frame: 0}],
            frameRate: 10,
            repeat: -1
    })
    
}

