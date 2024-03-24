

export class Player {
    constructor(context, gravity) {
        this.position = {
            x: 100,
            y: 100,
        };
        this.velocity = {
            x: 0,
            y: 0, // May need to be 1
        };
        this.width = 100;
        this.height = 100;
		this.context = context;
		this.gravity = gravity;
    }

    draw() {
        this.context.fillStyle = 'red';
        this.context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        // Y axis collision detection
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            // Check for bottom of canvas
            this.velocity.y += this.gravity;
        } else {
            // Reaches bottom
            this.velocity.y = 0;
        }
    }
}