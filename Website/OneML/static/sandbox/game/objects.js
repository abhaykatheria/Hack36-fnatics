class Ship {
    constructor() {
        this.position = width / 2;
        this.velocity = 0;
        this.maxVelocity = 8;
        this.friction = 0.75;
        this.size = 50;
        this.speed = 5;
    }

    show() {
        stroke(20);
        strokeWeight(4);
        fill(255, 0, 0);
        ellipse(this.position, height - this.size, this.size);
        noStroke();
        fill(255, 120, 120);
        ellipse(this.position - this.size * 0.2, height - this.size * 1.2, this.size * 0.3);
        fill(255);
        ellipse(this.position - this.size * 0.2, height - this.size * 1.2, this.size * 0.2);
    }

    update() {
        this.position += this.velocity;
        this.position = constrain(this.position, this.size, width - this.size);
        this.velocity += currentPrediction * this.speed;
        this.velocity *= this.friction;
        this.velocity = constrain(this.velocity, -this.maxVelocity, this.maxVelocity);
    }
}

class Meteor {
    constructor() {
        this.size = random(50, 120);
        this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
        this.velocity = createVector(random(-3, 3), random(1, 3));    
    }

    show() {
        fill(200, 150, 100);
        stroke(180, 120, 80);
        strokeWeight(10);
        ellipse(this.position.x, this.position.y, this.size);
    }

    update() {
        this.position.add(this.velocity);
        if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2) {
            this.velocity.x *= -1;
        }
        if (this.position.y > height + this.size) {
            dodged += 1;
            if (dodged > hiScore) {
                hiScore = dodged;
            }
            select('#info').html(dodged + ' meteors dodged. High score: ' + hiScore);
            
            this.size = random(50, 120);
            this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
            this.velocity = createVector(random(-3, 3), random(1, 3));
        }
    }

    collided(ship) {
        const d2 = sq(ship.position - this.position.x) + sq(height - ship.size - this.position.y);
        const threshold = sq(ship.size * 0.5) + sq(this.size * 0.5);
        return (d2 < threshold);
    }
}

class Star {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = random(1, 5);
        this.color = random(50, 255);
    }

    show() {
        stroke(this.color, this.color, 255);
        strokeWeight(1);
        point(this.position.x, this.position.y);
    }

    update() {
        this.position.y += this.velocity;
        if (this.position.y > height) {
            this.position = createVector(random(width), 0);
            this.velocity = random(1, 5);
            this.color = random(50, 255);
        }
    }
}

function makeStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}