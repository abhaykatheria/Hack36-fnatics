function gameOver() {
    background(0);

    // Draw and update stars
    stars.forEach((star) => {
        star.show();
        star.update();
    });

    // Draw ship
    ship.show();
    
    // Draw meteors
    meteors.forEach((meteor) => {
        meteor.show();
    });
    
    textAlign(CENTER);
    textSize(64);
    fill(255);
    stroke(0, 200, 0);
    text('Game Over', width / 2, height / 2);
}