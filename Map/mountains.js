function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loadMountains = (scene) => {
    const ranges = [
        [108, 150],
        [403, 458],
        [714, 828],
        [1340, 1450]
    ];

    let lastX = 0;
    let lastX2 = 0;

    for (let i = 0; i < 15; i++) {
        let x;
        let x2;
        let spacing = getRandomInt(100, 250);
        let spacing2 = getRandomInt(100, 250);

        x = spacing + lastX;
        x2 = spacing2 + lastX2;

        for (let j = 0; j < ranges.length; j++) {
            if (x > ranges[j][0] && x < ranges[j][1]) {
                console.log("Montaña encontrada en rango", ranges[j]);
                let mid = (ranges[j][0] + ranges[j][1]) / 2;
                if (x < mid) {
                    x = ranges[j][0] - (mid - x);
                } else {
                    x = ranges[j][1] + (x - mid);
                }
            }
        }

        scene.add.image(x, 192, 'mountain1')
            .setOrigin(0, 0)
            .setScale(.5)
            .setDepth(2);

        scene.add.image(x2, 175, 'mountain2')
            .setOrigin(0, 0)
            .setScale(.5)
            .setDepth(1);

        lastX = x;
        lastX2 = x2;
    }
};