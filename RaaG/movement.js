let keys = {};

const startMovement = () => {
    setInterval( () => {
        move();
    }, 1);
}

$(document).keydown( (event) => {
    keys[event.keyCode] = true;
})

$(document).keyup( (event) => {
    delete keys[event.keyCode];
})

const move = () => {
    for (var keyCode in keys){
        switch(keyCode){
            case '37':    // left
                moveHorz(-1 * move_x_interval);
                break;
            case '38':    // up
                jump();
                break;
            case '39':    // right
                moveHorz(move_x_interval);
                break;
            case '40':    // down
                // moveVert(-1);
                break;
            default: 
                console.log('what key is this? ' + keyCode);
        }
    }
    if (!touchingFloor(hero) && !isJumping()){
        fallDown();
    }
}



//  x_delta (+) goes right, y_delta (-) goes left
const moveHorz = (x_delta) => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.left += x_delta; 
    const intersected_obj = intersectsAny(updated_hero)
    if (!intersected_obj){
        hero = updated_hero;
        setPosition('hero', hero);
    }
}

//  y_delta (+) goes up, y_delta (-) goes down
const moveVert = (y_delta) => {
    let updated_hero = Object.assign({}, hero);
    updated_hero.bottom += y_delta; 
    const intersected_obj = intersectsAny(updated_hero)
    if (intersected_obj){
        let snug_hero = makeSnugOnFloor( updated_hero, intersected_obj);
        hero = (snug_hero)? snug_hero : hero; 
    }
    else{
        hero = updated_hero;
    }
    setPosition('hero', hero);
}

//  returns first obst intersected, if any (else null)
const intersectsAny = (obj) => {
    let obj_coords = getCoords(obj);
    for (let i = 0; i < obst_arr.length; i++){
        let obst_coords = getCoords(obst_arr[i]);
        if (intersects(obj_coords, obst_coords)){
            return obst_arr[i];
        }
    }
    return null;
}

const intersects = (a_coords, b_coords) => {
    if (a_coords.x1 < b_coords.x2
        &&  a_coords.x2 > b_coords.x1
        &&  a_coords.y1 < b_coords.y2
        &&  a_coords.y2 > b_coords.y1 ){
        return true; 
    }
    return false;
}
