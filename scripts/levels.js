import { Obstacle } from "./obstacle.js"

export const levels = []


// carX, carY, parkingspotX, parkingspotY
const level1 = [100, 100, 500, 500]
const level2 = [100, 110, 400, 400]
const level3 = [100, 110, 400, 400]
const level4 = [100, 110, 400, 400]
const level5 = [100, 110, 400, 400]


// Level 1
level1.push(new Obstacle(100, 500, "img/obstacle.png", 0.5))


// Level 2
level2.push(new Obstacle(300, 100, "img/obstacle.png", 1, false))



// Level 3



// Level 4


// Level 5












levels.push(level1, level2, level3, level4, level5)