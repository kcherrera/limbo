function sketch1(p) {
    let graphic; // defining on a global scope

    // creating poem array
    let currentIndex = 0;
    let poem = [
        "i feel stuck.",
        "i want to move.",
        "i don't know\nwhere else to go,",
        "but",
        "i can't stay here.",
        "i am in limbo...",
        "are you too?"
    ];
    let poemDuration = 105;

    p.setup = async function () {
        let cnv = p.createCanvas(window.innerWidth, window.innerHeight);
        p.noSmooth();
        let font = await p.loadFont('assets/Shrikhand-Regular.ttf');

        graphic = p.createGraphics(window.innerWidth, window.innerHeight);
        graphic.noSmooth();
        p.frameRate(30)
        graphic.textFont(font);
        graphic.fill(200);
        let responsiveSize = graphic.width / 10;
        graphic.textSize(responsiveSize);
        graphic.textAlign(p.CENTER, p.CENTER);
        graphic.text("i feel stuck.", graphic.width / 2, graphic.height / 2); //starts here

        // attaching canvas to a specific div
        cnv.parent('canvas1Container');
    };

    p.draw = function () {
        // updating text for every frame
        if (p.frameCount % poemDuration === 0 && p.frameCount > 0) {
            currentIndex = (currentIndex + 1) % poem.length;

            // redrawing graphic
            graphic.clear();
            graphic.fill(200);
            let responsiveSize = graphic.width / 10;
            graphic.textSize(responsiveSize);
            graphic.textAlign(p.CENTER, p.CENTER);
            graphic.text(poem[currentIndex], graphic.width / 2, graphic.height / 2);
        }

        // transparent-ish background
        p.clear();
        p.background(255, 100);

        if (graphic) {
            // wave distortion effect
            const tileSize = 125;
            const cols = Math.ceil(p.width / tileSize);
            const rows = Math.ceil(p.height / tileSize);

            for (let x = 0; x < cols; x = x + 1) {
                for (let y = 0; y < rows; y = y + 1) {
                    const wave = 0.07;

                    const distortionX = p.sin(p.frameCount * wave + x * 0.3 + y * 0.1) * 10;
                    const distortionY = p.sin(p.frameCount * wave + x * 0.3 + y * 1) * 5;

                    const sx = x * tileSize + distortionX;
                    const sy = y * tileSize + distortionY;
                    const sw = tileSize;
                    const sh = tileSize;

                    const dx = x * tileSize;
                    const dy = y * tileSize;
                    const dw = tileSize;
                    const dh = tileSize;

                    p.image(graphic, dx, dy, dw, dh, sx, sy, sw, sh);
                }
            }
        }
        // window resize for p5
        p.windowResized = function () {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };

    }
}


new p5(sketch1);
