const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const carWidth = 50;
const carHeight = 90;
const parkingSpotWidth = 70;
const parkingSpotHeight = 110;

let car = {
    x: 100,
    y: 100,
    width: carWidth,
    height: carHeight,
    speed: 5
};

let parkingSpot = {
    x: canvas.width - 150,
    y: canvas.height / 2 - parkingSpotHeight / 2,
    width: parkingSpotWidth,
    height: parkingSpotHeight
};

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Car movement logic
function moveCar() {
    if (keys.up && car.y > 0) car.y -= car.speed;
    if (keys.down && car.y + car.height < canvas.height) car.y += car.speed;
    if (keys.left && car.x > 0) car.x -= car.speed;
    if (keys.right && car.x + car.width < canvas.width) car.x += car.speed;
}

// Detect collision with parking spot
function checkCollisionWithParking() {
    if (
        car.x + car.width > parkingSpot.x &&
        car.x < parkingSpot.x + parkingSpot.width &&
        car.y + car.height > parkingSpot.y &&
        car.y < parkingSpot.y + parkingSpot.height
    ) {
        return true;
    }
    return false;
}

// Draw the car
function drawCar() {
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Draw the parking spot
function drawParkingSpot() {
    ctx.fillStyle = "green";
    ctx.fillRect(parkingSpot.x, parkingSpot.y, parkingSpot.width, parkingSpot.height);
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw parking spot
    drawParkingSpot();

    // Draw the car
    drawCar();

    // Check if the car is parked
    if (checkCollisionWithParking()) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Parked! Press R to reset", canvas.width / 2 - 150, canvas.height / 2 - 150);
    }
}

// Keydown event listener to handle car movement
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") keys.up = true;
    if (event.key === "ArrowDown") keys.down = true;
    if (event.key === "ArrowLeft") keys.left = true;
    if (event.key === "ArrowRight") keys.right = true;
});

// Keyup event listener to stop car movement
window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") keys.up = false;
    if (event.key === "ArrowDown") keys.down = false;
    if (event.key === "ArrowLeft") keys.left = false;
    if (event.key === "ArrowRight") keys.right = false;
    if (event.key === "r" || event.key === "R") resetGame();
});

// Reset the game when the car is parked
function resetGame() {
    car.x = 100;
    car.y = 100;
}

// Main game loop
function gameLoop() {
    moveCar();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();