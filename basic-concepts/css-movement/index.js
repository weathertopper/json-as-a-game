let hero_top = 450;
let hero_left = 100;

$(document).ready( () =>{
    $('#hero').css('background-color', 'green');
    $('#hero').css('position', 'absolute');
    $('#hero').css('top', hero_top);
    $('#hero').css('left', hero_left);
    console.log('document ready');
})

$(document).keydown( (event) => {
    switch(event.keyCode){
        case 37:    // left
            console.log('left');
            moveLeft();
            break;
        case 38:    // up
            console.log('up');
            moveUp();
            break;
        case 39:    // right
            console.log('right');
            moveRight();
            break;
        case 40:    // down
            console.log('down');
            moveDown();
            break;
        default: 
            console.log('what key is this? ' + event.keyCode);
    }
})

const moveLeft = () => {
    hero_left -= 1; 
    $('#hero').css('left', hero_left);
}

const moveRight = () => {
    hero_left += 1; 
    $('#hero').css('left', hero_left);
}

const moveDown = () => {
    hero_top += 1; 
    $('#hero').css('top', hero_top);
}

const moveUp = () => {
    hero_top -= 1; 
    $('#hero').css('top', hero_top);
}

