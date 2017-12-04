let keys = {};

let jumping = false;
let jump_time = 0; 

setInterval( () => {
    move();
}, 1);


$(document).keydown( (event) => {
    keys[event.keyCode] = true;
})

$(document).keyup( (event) => {
    delete keys[event.keyCode];
})

//  excluding up, jump is not infinite
const move = () => {
    for (var keyCode in keys){
        switch(keyCode){
            case '37':    // left
                moveLeft();
                break;
            case '38':    // up
                // moveUp();
                jump();
                break;
            case '39':    // right
                moveRight();
                break;
            // case '40':    // down
            //     moveDown();
            //     break;
            default: 
                console.log('what key is this? ' + keyCode);
        }
    }
}

const jump = () => {
    if(!jumping){
        startJump();
        let jumpInterval = setInterval( () => {
            let delta_y = calculateYDelta(jump_time);
            let updated_hero = Object.assign({}, hero);
            updated_hero.top -= delta_y; 
            if (intersectsAny(updated_hero)){
                jumping = false;
                clearInterval(jumpInterval)
            }
            else{
                hero = updated_hero;
                setHeroPosition();
            }
        }, 1)
    }
}

const startJump = () => {
    jumping = true;
    jump_time = Date.now();
}

const endJump = () => {
    jumping = false;
}

const moveLeft = () => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.left -= 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const moveRight = () => {
    let updated_hero = Object.assign({}, hero); 
    updated_hero.left += 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const moveVert = (y_delta) => {
    let updated_hero = Object.assign({}, hero);
    updated_hero.top -= y_delta; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

// const moveUp = (y_delta) => {
//     let updated_hero = Object.assign({}, hero); 
//     y_delta = (y_delta)? y_delta : 1;
//     updated_hero.top -= y_delta; 
//     if (!intersectsAny(updated_hero)){
//         hero = updated_hero;
//     }
//     setHeroPosition();
// }

// const moveDown = (y_delta) => {
//     let updated_hero = Object.assign({}, hero);  
//     y_delta = (y_delta)? y_delta : 1;
//     updated_hero.top += y_delta; 
//     if (!intersectsAny(updated_hero)){
//         hero = updated_hero;
//     }
//     setHeroPosition();
// }

const intersects = (a_coords, b_coords) => {
    if (a_coords.x1 < b_coords.x2
        &&  a_coords.x2 > b_coords.x1
        &&  a_coords.y1 < b_coords.y2
        &&  a_coords.y2 > b_coords.y1 ){
        
        return true; 
    }
    return false;
}

const intersectsAny = (hero) => {
    let hero_coords = getCoords(hero);
    for (let i = 0; i < obst_arr.length; i++){
        let obst_coords = getCoords(obst_arr[i]);
        if (intersects(hero_coords, obst_coords)){
            return true;
        }
    }
    return false;
}

const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.top,
        y2 : obj.top + obj.height
    }
}

const setHeroPosition = () => {
    $('#hero').css('top', hero.top);
    $('#hero').css('left', hero.left);
}