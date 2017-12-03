let marginTop = 100;
let marginLeft = 100;

$(document).ready( () =>{
    $('#hero').css('background-color', 'green');
    $('#hero').css('position', 'static');
    $('#hero').css('margin-top', marginTop);
    $('#hero').css('margin-left', marginLeft);
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
    marginLeft -= 1; 
    $('#hero').css('margin-left', marginLeft);
}

const moveRight = () => {
    marginLeft += 1; 
    $('#hero').css('margin-left', marginLeft);
}

const moveDown = () => {
    marginTop += 1; 
    $('#hero').css('margin-top', marginTop);
}

const moveUp = () => {
    marginTop -= 1; 
    $('#hero').css('margin-top', marginTop);
}

