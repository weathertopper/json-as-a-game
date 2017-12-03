let top = 100;
let left = 100;

$(document).ready( () =>{
    $('#hero').css('background-color', 'green');
    $('#hero').css('position', 'absolute');
    $('#hero').css('top', top);
    $('#hero').css('left', left);
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
    left -= 1; 
    $('#hero').css('left', left);
}

const moveRight = () => {
    left += 1; 
    $('#hero').css('left', left);
}

const moveDown = () => {
    top += 1; 
    $('#hero').css('top', top);
}

const moveUp = () => {
    top -= 1; 
    $('#hero').css('top', top);
}

