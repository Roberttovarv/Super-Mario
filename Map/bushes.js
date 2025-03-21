function getRamdomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const loadBushes = (scene) => {

    const ranges = [
        [108, 150],
        [403, 458],
        [714, 828],
        [1340, 1450]
    ];

     let lastX = 0
     let lastX2 = 0

    for (let i = 0; i < 15; i++) {
        let spacing = getRamdomInt(100, 250)
        let spacing2 = getRamdomInt(100, 250)
        let x = spacing + lastX
        let x2 = spacing2 + lastX2

        scene.add.image(x, 195, 'bush1')
            .setOrigin(0, 0)
            .setScale(.5)
            .setDepth(2)

        scene.add.image(x2, 195, 'bush2')
            .setOrigin(0, 0)
            .setScale(.5)
            .setDepth(3)
lastX = x
lastX2 = x2
    }
}