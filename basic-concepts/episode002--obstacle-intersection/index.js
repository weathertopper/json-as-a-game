let hero_top = 450;
let hero_left = 100;
const hero_width = 50; 
const hero_height = 50; 

let obst_top = 450;
let obst_left = 300;
const obst_width = 50; 
const obst_height = 50; 

$(document).ready( () =>{
    heroInit();
    obstInit();
    console.log('document ready');
})

const heroInit = () => {
    $('#hero').css('background-color', 'green');
    $('#hero').css('top', hero_top);
    $('#hero').css('left', hero_left);
    $('#hero').css('width', hero_width);
    $('#hero').css('height', hero_height);
}

const obstInit = () => {
    $('#obst').css('top', obst_top);
    $('#obst').css('left', obst_left);
    $('#obst').css('width', obst_width);
    $('#obst').css('height', obst_height);
}

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
    let new_hero_left = hero_left - 1; 
    if (!intersects( new_hero_left, 
                    new_hero_left + hero_width, 
                    hero_top,
                    hero_top + hero_height)){
        hero_left = new_hero_left;
    }
    $('#hero').css('left', hero_left);
}

const moveRight = () => {
    let new_hero_left = hero_left + 1; 
    if (!intersects( new_hero_left, 
        new_hero_left + hero_width, 
        hero_top,
        hero_top + hero_height)){
        hero_left = new_hero_left;
    }
    $('#hero').css('left', hero_left);
}

const moveDown = () => {
    let new_hero_top = hero_top + 1;
    if (!intersects( hero_left, 
        hero_left + hero_width, 
        new_hero_top,
        new_hero_top + hero_height)){
        hero_top = new_hero_top;
    }
    $('#hero').css('top', hero_top);
}

const moveUp = () => {
    let new_hero_top = hero_top - 1; 
    if (!intersects( hero_left, 
        hero_left + hero_width, 
        new_hero_top,
        new_hero_top + hero_height)){
        hero_top = new_hero_top;
    }
    $('#hero').css('top', hero_top);
}

const intersects = (hero_x1, hero_x2, hero_y1, hero_y2) => {
    const obst_x1 = obst_left;
    const obst_x2 = obst_left + obst_width;
    const obst_y1 = obst_top;
    const obst_y2 = obst_top + obst_height;
    if (hero_x1 < obst_x2
        &&  hero_x2 > obst_x1
        &&  hero_y1 < obst_y2
        &&  hero_y2 > obst_y1 ){
        return true; 
    }
    return false;
}

// const setPosition    add this later

