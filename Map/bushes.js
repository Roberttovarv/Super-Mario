function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
let bushes = []

let ranges = [
    [48, 210],
    [333, 520],
    [644, 920],
    [1100, 1500]

];

function isInRange(x, ranges) {
    for (let i = 0; i < ranges.length; i++) {
        if (x >= ranges[i][0] && x <= ranges[i][1]) {
            return true
        }
    }
    return false
}

function createBushes() {
    let lastX = 0
    let lastX2 = 0

    for (let i = 0; i < 10; i++) {
        let spacing, x
        spacing = getRandomInt(100, 250)
        x = spacing + lastX
        lastX = x
        bushes.push(x)

        let spacing2, x2
        spacing2 = getRandomInt(100, 250)
        x2 = spacing2 + lastX2
        lastX2 = x2
        bushes.push(x2)
    }
    return bushes
}

export const loadBushes = (scene) => {
    createBushes()

    for (let i = 0; i < 18; i += 2) {
        if (!isInRange(bushes[i], ranges)) {

            scene.add.image(bushes[i], 195, 'bush1')
                .setOrigin(0.5, 0)
                .setScale(.5)
                .setDepth(2)
        }

        if (!isInRange(bushes[i + 1], ranges)) {

            scene.add.image(bushes[i + 1], 195, 'bush2')
                .setOrigin(0.5, 0)
                .setScale(.5)
                .setDepth(3)
        }
    }
}