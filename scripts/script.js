import { Car } from "./car.js";
import { ParkingSpot } from "./parkingSpot.js";
import { levels } from "./levels.js"

let lastTime = 0;
const fps = 70;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let currentLevel = 0


let unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) === null ? [1] : JSON.parse(localStorage.getItem("unlockedLevels"))
unlockedLevels.forEach((level) => {
    document.getElementById(`${level}`).classList.remove("disabled")
})


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = new Car("img/car_red.png", levels[currentLevel][0], levels[currentLevel][1], 2.7)
let parkingSpot = new ParkingSpot(levels[currentLevel][2], levels[currentLevel][3], 160, 80)

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

let totalTime = 0
let startTime = Date.now()

// menu
document.querySelector("#startButton").addEventListener("click", () => {
    document.querySelector("#startScreen").style.display = "none"
    document.querySelector("#levelScreen").style.display = "flex"
})
document.querySelectorAll(".level").forEach((level) => {
    level.addEventListener("click", () => {
        if (!level.classList.contains("disabled")) {
            currentLevel = level.id - 1
            canvas.style.display = "block"
            document.querySelector("#levelScreen").style.display = "none"
            totalTime = 0
            startTime = Date.now()
        }
    })
})

let timeInterval = setInterval(() => {
    totalTime = Math.floor((Date.now() - startTime) / 1000)
}, 1000)



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
        Math.abs((car.x + car.width / 8) - (parkingSpot.x + parkingSpot.width / 2)) < 40 &&
        Math.abs((car.y + car.height / 8) - (parkingSpot.y + parkingSpot.height / 2)) < 40
    ) return true;
    return false;
}


function drawParkingSpot() {
    if (checkCollisionWithParking()) ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
    else ctx.fillStyle = 'rgba(0, 255, 0, 0.45)';
    ctx.lineWidth = "5"
    ctx.beginPath()
    ctx.rect(parkingSpot.x, parkingSpot.y, parkingSpot.width, parkingSpot.height);
    ctx.fill()
}

function getCarCorners() {
    const corners = [];

    // Half dimensions, considering scaling
    const halfWidth = (car.width * car.scale) / 2;
    const halfHeight = (car.height * car.scale) / 2;

    // Calculate sin and cos for rotation
    const sinRotation = Math.sin(car.rotation);
    const cosRotation = Math.cos(car.rotation);

    // Define the local corners relative to the center of the car
    const localCorners = [
        { x: -halfWidth, y: -halfHeight }, // Top-left corner
        { x: halfWidth, y: -halfHeight },  // Top-right corner
        { x: -halfWidth, y: halfHeight },  // Bottom-left corner
        { x: halfWidth, y: halfHeight }    // Bottom-right corner
    ];

    // Loop through each corner, applying rotation, scaling, and translation
    for (const corner of localCorners) {
        // Apply rotation
        const rotatedX = corner.x * cosRotation - corner.y * sinRotation;
        const rotatedY = corner.x * sinRotation + corner.y * cosRotation;

        // Apply scaling and translation
        const finalX = car.x + rotatedX;
        const finalY = car.y + rotatedY;

        // Store the final position of each corner
        corners.push({ x: finalX + halfWidth, y: finalY + halfHeight });
    }

    return corners;
}

function drawUI() {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "#7b61b6";
    ctx.roundRect(canvas.width - 240, -20, 300, 100, 20)
    ctx.fill()

    ctx.fillStyle = "gold";
    ctx.font = "60px Arial";
    ctx.fillText("Level " + (currentLevel + 1), canvas.width - 210, 60);


    if (checkCollisionWithParking()) {
        ctx.beginPath()
        ctx.fillStyle = "#7b61b6";

        ctx.roundRect(canvas.width / 2 - 270, canvas.height - 60, 500, 100, 20)
        ctx.fill()
        ctx.fillStyle = "gold";
        ctx.font = "30px Arial";
        ctx.fillText("Parked! Press [Space] to Continue", canvas.width / 2 - 250, canvas.height - 20);
    }


    ctx.restore()
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawParkingSpot();
    ctx.save()
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    drawCar();
    drawLevel(levels[currentLevel])
    drawUI()
    ctx.restore()

    if (Collision()) {
        car.x = levels[currentLevel][0]
        car.y = levels[currentLevel][1]
        car.rotation = 3.14
    }

}

function Collision() {
    for (let obstacle of levels[currentLevel]) {
        if (!obstacle.collision) continue;
        const corners = getCarCorners();

        for (const corner of corners) {
            if (
                corner.x > obstacle.x &&
                corner.x < obstacle.x + obstacle.width * obstacle.scale &&
                corner.y > obstacle.y &&
                corner.y < obstacle.y + obstacle.height * obstacle.scale
            ) {
                return true;
            }
        }
    }
    return false;
}

// Draw the car
function drawCar() {

    ctx.save();
    const img = document.createElement("img");

    img.src = car.img;
    car.width = img.width
    car.height = img.height

    // Adjust the position based on the scale factor
    const scaledX = car.x + car.width / 2 * car.scale;
    const scaledY = car.y + car.height / 2 * car.scale;

    // Translate to the car's position and rotate it
    ctx.translate(scaledX, scaledY);
    ctx.rotate(car.rotation);

    // Apply the scaling factor
    ctx.scale(car.scale, car.scale);


    // Draw the image, adjusted for the scale
    ctx.drawImage(img, -car.width / 2, -car.height / 2, car.width, car.height);
    img.remove()
    ctx.restore();
}


function drawLevel(level) {
    for (let index = 4; index < level.length; index++) {
        ctx.save();

        const obstacle = level[index];
        const img = document.createElement("img")
        img.src = obstacle.texture;
        obstacle.width = img.width
        obstacle.height = img.height

        const scaledX = obstacle.x + obstacle.width / 2 * obstacle.scale;
        const scaledY = obstacle.y + obstacle.height / 2 * obstacle.scale;


        ctx.translate(scaledX, scaledY);

        ctx.scale(obstacle.scale, obstacle.scale);
        ctx.drawImage(img, -obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);

        img.remove()
        ctx.restore();
    }
}

window.addEventListener("keydown", (event) => {
    if (event.key === "w") keys.up = true;
    if (event.key === "s") keys.down = true;
    if (event.key === "a") keys.left = true;
    if (event.key === "d") keys.right = true;
});

window.addEventListener("keyup", (event) => {
    if (event.key === "w") keys.up = false;
    if (event.key === "s") keys.down = false;
    if (event.key === "a") keys.left = false;
    if (event.key === "d") keys.right = false;
    if (event.code === "Space" && checkCollisionWithParking()) NextLevel()
});

function NextLevel() {
    currentLevel++

    if (currentLevel >= levels.length) {
        document.querySelector("#totalTime").innerHTML = totalTime

        localStorage.setItem("unlockedLevels", null)
        canvas.style.display = "none"
        document.querySelector("#endScreen").style.display = "flex"
        currentLevel = levels.length - 1
    } else {
        unlockedLevels.push(currentLevel + 1)
        localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels))

        car.x = levels[currentLevel][0]
        car.y = levels[currentLevel][1]
        parkingSpot.x = levels[currentLevel][2]
        parkingSpot.y = levels[currentLevel][3]
    }
}


function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    if (currentTime - lastTime < 1000 / fps) return
    lastTime = currentTime;

    draw()
    moveCar()
}

requestAnimationFrame(gameLoop);