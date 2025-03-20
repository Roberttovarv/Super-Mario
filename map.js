import { loadCoins } from "./Collectibles/coins.js"
import { loadCollider } from "./colliders.js"
import { loadFloor } from "./Map/floor.js"
import { loadStaticBlock } from "./Map/staticBlock.js"

export const loadMap = (scene) => {
    loadFloor(scene)
    loadStaticBlock(scene)
    loadCoins(scene)
}

