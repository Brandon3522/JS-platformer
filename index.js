const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.1;

class Player {
	constructor() {
		this.position = {
			x: 100, 
			y: 100
		}
		this.velocity = {
			x: 0,
			y: 0 // May need to be 1
		}
		this.width = 100;
		this.height = 100;
	}

	draw() {
		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.y += this.velocity.y;
		if (this.position.y + this.height + this.velocity.y <= canvas.height) { // Check for bottom of canvas
			this.velocity.y += gravity;
		}
		else { // Reaches bottom
			this.velocity.y = 0;
		}
	}
}

const player = new Player();

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
}

animate();
