let orbs = []; let num = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i=0; i<num; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(500, 500);
        orbs[i] = new Circle(x, y, r);
    }


}

function draw() {
    background(255);

    for (let i=0; i<num; i++) {
        orbs[i].update();
        orbs[i].display();
    }
}

