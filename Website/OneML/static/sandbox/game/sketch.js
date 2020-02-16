// Game state variable: Training 0, Game 1, Game over 2
let gameState = 0;

// Webcam input and regression model
let video;
let regressor;
let currentPrediction = 0;

// Buttons
let leftButton, centerButton, rightButton, trainButton;

// Game variables
let dodged;
let hiScore = 0;
let ship, meteors, stars;

function setup() {
    const canvas = createCanvas(640, 480);
    background(0);
    noStroke(30);
    select('#canvas').child(canvas);
    
    // Camera
    video = createCapture(VIDEO, () => {
        console.log('Video ready');
    });
    video.hide();

    // Load model
    const mobileNet = ml5.featureExtractor('MobileNet', () => {
        console.log('MobileNet ready');
    });
    regressor = mobileNet.regression(video, () => {
        console.log('Model ready');
    })

    // Buttons
    const buttonDiv = select('#buttons');
    
    leftButton = createButton('Move left');
    leftButton.parent(buttonDiv);
    leftButton.mouseClicked(() => {
        regressor.addImage(-1)
    });
    
    centerButton = createButton('No movement');
    centerButton.parent(buttonDiv);
    centerButton.mouseClicked(() => {
        regressor.addImage(0)
    });
    
    rightButton = createButton('Move right');
    rightButton.parent(buttonDiv);
    rightButton.mouseClicked(() => {
        regressor.addImage(1)
    });

    trainButton = createButton('Train');
    select('#train').child(trainButton);
    trainButton.mouseClicked(() => {
        select('#info').html('Training - please wait');
        regressor.train((loss) => {
            if (loss === null) {
                console.log("Training done");
                setInterval(updatePrediction, 200);
                changeState(1);
            }
            console.log(loss);
        });
    });

    changeState(0);
}

function keyPressed() {
    if (key === ' ' && gameState === 2) {
        changeState(1);
    }
}

function draw() {
    if (gameState === 0) {
        trainNetwork();
    }
    if (gameState === 1) {
        gameLoop();
    }
    if (gameState === 2) {
        gameOver();
    }
}

function changeState(state) {
    gameState = state;
    
    if (state === 0) {
        select('#info').html('Add images you wish to correspond to relevant movements. Press train when done.');
        select('#buttons').show();
        select('#train').show();
    } else {
        select('#buttons').hide();
        select('#train').hide();
    }

    if (state === 1) {
        dodged = 0;
        ship = new Ship();
        meteors = [new Meteor()];
        makeStars();
        select('#info').html('0 meteors dodged. High score: ' + hiScore);
    }

    if (state === 2) {
        select('#info').html('Press space to restart');
    }
}