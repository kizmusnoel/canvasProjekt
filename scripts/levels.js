import { Obstacle } from "./obstacle.js"

export const levels = []


// carX, carY, parkingspotX, parkingspotY
const level1 = [100, 100, 605, 400] 
const level2 = [100, 100, 995, 490]
const level3 = [100, 110, 1170, 490]
const level4 = [100, 110, 770, 580]
const level5 = [100, 110, 400, 400]


// Level 1

level1.push(new Obstacle(610, 315, "img/kek.png", 0.185))
level1.push(new Obstacle(600, 495, "img/rendor.png", 0.6))



// Level 2
level2.push(new Obstacle(1010, 315, "img/rendor.png", 0.6))
level2.push(new Obstacle(760, 315, "img/sarga.png", 0.185))
level2.push(new Obstacle(1010, 592, "img/kek.png", 0.185))
level2.push(new Obstacle(590, 480, "img/rendor.png", 0.6))
level2.push(new Obstacle(1180, 490, "img/kek.png", 0.185))



// Level 3
level3.push(new Obstacle(1150, 592, "img/kek.png", 0.185))
level3.push(new Obstacle(1150, 315, "img/sarga.png", 0.185))
level3.push(new Obstacle(1150, 230, "img/rendor.png", 0.6))
level3.push(new Obstacle(1150, 405, "img/kek.png", 0.185))

level3.push(new Obstacle(990, 592, "img/rendor.png", 0.6))
level3.push(new Obstacle(1000, 315, "img/kek.png", 0.185))
level3.push(new Obstacle(1000, 230, "img/sarga.png", 0.185))
level3.push(new Obstacle(1000, 405, "img/sarga.png", 0.185))
level3.push(new Obstacle(1000, 490, "img/kek.png", 0.185))


level3.push(new Obstacle(1420, 315, "img/kek.png", 0.185))
level3.push(new Obstacle(1420, 230, "img/sarga.png", 0.185))
level3.push(new Obstacle(1420, 405, "img/sarga.png", 0.185))
level3.push(new Obstacle(1420, 490, "img/kek.png", 0.185))


// Level 4
level4.push(new Obstacle(1150, 592, "img/kek.png", 0.185))
level4.push(new Obstacle(1150, 315, "img/sarga.png", 0.185))
level4.push(new Obstacle(1150, 230, "img/rendor.png", 0.6))
level4.push(new Obstacle(1150, 405, "img/kek.png", 0.185))
level4.push(new Obstacle(1150, 490, "img/sarga.png", 0.185))
level4.push(new Obstacle(1150, 680, "img/kek.png", 0.185))

level4.push(new Obstacle(990, 592, "img/rendor.png", 0.6))
level4.push(new Obstacle(1000, 315, "img/kek.png", 0.185))
level4.push(new Obstacle(1000, 230, "img/sarga.png", 0.185))
level4.push(new Obstacle(1000, 405, "img/sarga.png", 0.185))
level4.push(new Obstacle(1000, 490, "img/kek.png", 0.185))


level4.push(new Obstacle(1420, 315, "img/kek.png", 0.185))
level4.push(new Obstacle(1420, 230, "img/sarga.png", 0.185))
level4.push(new Obstacle(1420, 405, "img/sarga.png", 0.185))
level4.push(new Obstacle(1420, 490, "img/kek.png", 0.185))
level4.push(new Obstacle(1420, 592, "img/sarga.png", 0.185))

level4.push(new Obstacle(770, 315, "img/kek.png", 0.185))
level4.push(new Obstacle(770, 230, "img/sarga.png", 0.185))
level4.push(new Obstacle(770, 405, "img/sarga.png", 0.185))
level4.push(new Obstacle(770, 490, "img/kek.png", 0.185))
level4.push(new Obstacle(770, 680, "img/sarga.png", 0.185))


level4.push(new Obstacle(620, 315, "img/kek.png", 0.185))
level4.push(new Obstacle(620, 230, "img/sarga.png", 0.185))
level4.push(new Obstacle(770, 405, "img/kek.png", 0.185))
level4.push(new Obstacle(620, 490, "img/kek.png", 0.185))
level4.push(new Obstacle(620, 592, "img/sarga.png", 0.185))
level4.push(new Obstacle(620, 680, "img/sarga.png", 0.185))

// Level 5












levels.push(level1, level2, level3, level4, level5)