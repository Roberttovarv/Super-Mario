import { loadCoins } from "./Collectibles/coins.js"
import { loadCollider } from "./colliders.js"
import { loadBushes } from "./Map/bushes.js"
import { loadClouds } from "./Map/clouds.js"
import { loadFloor } from "./Map/floor.js"
import { loadMountains } from "./Map/mountains.js"
import { loadPipes } from "./Map/pipes.js"
import { loadStaticBlock } from "./Map/staticBlock.js"

export const loadMap = (scene) => {
    loadFloor(scene)
    loadStaticBlock(scene)
    loadCoins(scene)
    loadClouds(scene)
    loadMountains(scene)
    loadBushes(scene)
    loadPipes(scene)
}

