let orbs = []; let num = 10;
let font, fontSize = 30;
// let isHoveringText = false;

async function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    font = await loadFont('assets/Karla-Italic.ttf');

    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    for (let i=0; i<num; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(500, 500);
        orbs[i] = new Circle(x, y, r);
    }

}

function draw() {

    fill('brown');
    text('i feel stuck.', 270, 50);
    text('i want to move on.', 270, 150);
    text('i don\'t know where else to go', 270, 250);
    text('but i can\'t grow here.', 270, 350);
    text('i am in limbo...', 270, 450);
    text('are you too?', 270, 550);

    background(255);

    //     // Add hover detection to the HTML poem element
    // let poemElement = document.getElementById("poem");
    // poemElement.addEventListener('mouseenter', () => {
    //     isHoveringText = true;
    // });
    // poemElement.addEventListener('mouseleave', () => {
    //     isHoveringText = false;
    // });

    // if(abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0) {
    //     orbs[i].push();// isHoveringText = false;
    // }



    for (let i=0; i<num; i++) {
        // if (isHoveringText) {
        //     orbs[i].repel(mouseX, mouseY);
        // }
        if(mouseIsPressed){
            let mouse = createVector(mouseX, mouseY);
            trigger(orbs[i], mouse);
        }
        orbs[i].update();
        orbs[i].display();
        // orbs[i].repel(mouseX, mouseY);
    }

}

function trigger(orbs) {
    let force = p5.Vector.sub(orbs.pos, mouse);
    let distance = force.mag();
    force.normalize();

    let magnitude = map(distance, 0, width, 0.1, 1);
    force.mult(magnitude);
    orbs.applyForce(force);
}
