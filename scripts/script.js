import { Car } from "./car.js";
import { ParkingSpot } from "./parkingSpot.js";
import { levels } from "./levels.js"

let lastTime = 0;
const fps = 60;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = document.createElement("img");
let currentLevel = 0


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = new Car("green", levels[currentLevel][0], levels[currentLevel][1], 4)
let parkingSpot = new ParkingSpot(levels[currentLevel][2], levels[currentLevel][3], 70, 120)

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Car movement logic
function moveCar() {
    const angleOffset = -Math.PI / 2; // 90 degrees in radians

    const speedX = car.speed * Math.cos(car.rotation + angleOffset); // Adjusted horizontal movement
    const speedY = car.speed * Math.sin(car.rotation + angleOffset); // Adjusted vertical movement

    if (keys.up) {
        car.x += speedX;
        car.y += speedY;
    }
    if (keys.down) {
        car.x -= speedX / 2;
        car.y -= speedY / 2;
    }

    // going forwards and turning
    if (keys.left && keys.up) {
        car.rotation -= 0.03;
    }
    if (keys.right && keys.up) {
        car.rotation += 0.03;
    }

    // going backwards and turning
    if (keys.left && keys.down) {
        car.rotation += 0.023;
    }
    if (keys.right && keys.down) {
        car.rotation -= 0.023;
    }
}

// Detect collision with parking spot
function checkCollisionWithParking() {
    if (
        Math.abs(car.x - parkingSpot.x) < 40 &&
        Math.abs(car.y - parkingSpot.y) < 40
    ) return true;
    return false;
}

// Draw the car
function drawCar() {

    ctx.save();

    ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
    ctx.rotate(car.rotation);

    img.src = car.img;
    ctx.drawImage(img, -car.width / 2, -car.height / 2, car.width, car.height);

    ctx.restore();

}


function drawParkingSpot() {
    if (checkCollisionWithParking()) ctx.fillStyle = "lightgreen";
    else ctx.fillStyle = "green";
    ctx.lineWidth = "5"
    ctx.beginPath()
    ctx.rect(parkingSpot.x, parkingSpot.y, parkingSpot.width, parkingSpot.height);
    ctx.stroke()
    ctx.fill()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    drawLevel(levels[currentLevel])
    drawParkingSpot();
    drawCar();

    if (checkCollisionWithParking()) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Parked! Press [Space] to Continue", canvas.width / 2 - 150, canvas.height / 2 - 150);
    }
    if (Collision()) {
        car.x = levels[currentLevel][0]
        car.y = levels[currentLevel][1]
    }
}

function Collision() {
    for (let obstacle of levels[currentLevel]) {
        if (obstacle.collision) {
            return false

        }
    }

    return false

}

function drawLevel(level) {
    for (let index = 4; index < level.length; index++) {
        const obstacle = level[index];
        img.src = obstacle.texture;
        ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.scale, obstacle.scale);
    }
}

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") keys.up = true;
    if (event.key === "ArrowDown") keys.down = true;
    if (event.key === "ArrowLeft") keys.left = true;
    if (event.key === "ArrowRight") keys.right = true;
    if (event.key === "w") keys.up = true;
    if (event.key === "s") keys.down = true;
    if (event.key === "a") keys.left = true;
    if (event.key === "d") keys.right = true;
});

window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") keys.up = false;
    if (event.key === "ArrowDown") keys.down = false;
    if (event.key === "ArrowLeft") keys.left = false;
    if (event.key === "ArrowRight") keys.right = false;
    if (event.key === "w") keys.up = false;
    if (event.key === "s") keys.down = false;
    if (event.key === "a") keys.left = false;
    if (event.key === "d") keys.right = false;
    if (event.code === "Space" && checkCollisionWithParking()) NextLevel()
});

function NextLevel() {
    currentLevel++

    car.x = levels[currentLevel][0]
    car.y = levels[currentLevel][1]
    parkingSpot.x = levels[currentLevel][2]
    parkingSpot.y = levels[currentLevel][3]
}


function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    if (currentTime - lastTime < 1000 / fps) return
    lastTime = currentTime;

    draw()
    moveCar()
}

requestAnimationFrame(gameLoop);