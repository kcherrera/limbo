class Circle {
    constructor(x, y, radius) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(2, 5));
        this.accel = createVector(0, 0);
        this.radius = radius;

        this.ctx = drawingContext; // move this to a global scope
        this.c = this.getPastelColor();
    }

    applyForce(force) {
        this.accel.add(force);
    }

    update() {
        this.vel.add(this.accel);
        this.pos.add(this.vel);
        this.accel.mult(0);
        

        if (this.pos.x > width) {
            this.vel.x *= -1;
            this.pos.x = width;
        } else if (this.pos.x < 0) {
            this.vel.x *= -1;
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
            this.vel.y *= -1;
            this.pos.y = height;
        } else if (this.pos.y < 0) {
            this.vel.y *= -1;
            this.pos.y = 0;
        }
    }
    


    // repel(mx, my) {
    //     let mousePos = createVector(mx, my);
    //     let direction = p5.Vector.sub(this.pos, mousePos);
    //     let distance = direction.mag();

    //     // Apply repelling force based on distance
    //     if (distance < 300) {
    //         direction.normalize();
    //         let force = map(distance, 0, 300, 2, 0);
    //         direction.mult(force);
    //         this.vel.add(direction);

    //         // Limit velocity to prevent orbs from moving too fast
    //         this.vel.limit(10);
    //     }
    // }

    display() {
        let gradient = this.ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.radius);

        let r = red(this.c);
        let g = green(this.c);
        let b = blue(this.c);

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        this.ctx.fillStyle = gradient;

        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    getPastelColor() {
        let r = random(205, 255);
        let g = random(205, 255);
        let b = random(205, 255);
        return color(r, g, b);
    }



}

