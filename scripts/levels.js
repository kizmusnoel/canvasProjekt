import { Obstacle } from "./obstacle.js"

export const levels = []


// carX, carY, parkingspotX, parkingspotY
const level1 = [100, 100, 585, 390] 
const level2 = [100, 100, 975, 475]
const level3 = [100, 110, 1150, 470]
const level4 = [100, 110, 400, 400]
const level5 = [100, 110, 400, 400]


// Level 1

level1.push(new Obstacle(590, 305, "img/kek.png", 0.185))
level1.push(new Obstacle(580, 485, "img/rendor.png", 0.6))



// Level 2
level2.push(new Obstacle(990, 305, "img/rendor.png", 0.6))
level2.push(new Obstacle(740, 305, "img/sarga.png", 0.185))
level2.push(new Obstacle(990, 567.5, "img/kek.png", 0.185))
level2.push(new Obstacle(580, 480, "img/rendor.png", 0.6))
level2.push(new Obstacle(1150, 480, "img/kek.png", 0.185))



// Level 3



// Level 4


// Level 5












levels.push(level1, level2, level3, level4, level5)