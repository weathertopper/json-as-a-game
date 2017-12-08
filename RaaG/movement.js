let keys = {};

let jumping = false; 

setInterval( () => {
    move();
}, 1);

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
                moveHorz(-1);
                break;
            case '38':    // up
                // moveVert(1);
                jump();
                break;
            case '39':    // right
                moveHorz(1);
                break;
            case '40':    // down
                // moveVert(-1);
                break;
            default: 
                console.log('what key is this? ' + keyCode);
        }
    }
}

const jump = () => {
    if(touchingFloor(hero)){
        startJump();
        jumpUp();
    }
}

const startJump = () =>{
    jumping = true; 
}

const endJump = () => {
    jumping = false;
}

const isJumping = () => {
    return jumping; 
}

const jumpUpInterval = (jump_rate, timeout, epsilon, resolve) => {
    setTimeout( function(){
        console.log(jump_rate);
        if (jump_rate > epsilon){
            moveVert(jump_rate);
            jump_rate *= (7/8);
            jumpUpInterval(jump_rate, timeout, epsilon, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

const jumpUp = () => {
    let jump_promise = new Promise( (resolve) => {
        jumpUpInterval(8, 10, epsilon, resolve)
    } )
    jump_promise.then(() => {
        // apexPause();
        fallDown();
    });
}

const fallDownInterval = ( fall_rate, timeout, resolve) => {
    setTimeout( function(){
        if (!touchingFloor(hero)){
            moveVert(-1 * fall_rate);
            fall_rate = (fall_rate * 1.5 <= 8) ? fall_rate * 1.5 : 8 ;
            fallDownInterval( fall_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}


const fallDown = () => {
    let fall_promise = new Promise( (resolve) => {
        fallDownInterval(1, 10, resolve)
    } )
    fall_promise.then(() => {
        endJump();
        console.log('fall done')
    });
}

const apexPauseInterval = (frame_count, timeout, resolve) => {
    setTimeout( function(){
        console.log(frame_count);
        if (frame_count-- > 0){
            apexPauseInterval(frame_count, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}


const apexPause = () => {
    let apex_promise = new Promise( (resolve) => {
        apexPauseInterval(1, 2, resolve)
    } )
    apex_promise.then(() => {
        console.log('apex done');
        fallDown();
    });
}

//  returns 'snugged' obj if snug_obj intersects w/ floor (else, null)
//  if there is an intersection....
//  see if the intersection is with 'the floor' ie an obstacle below that
//  if so, set it directly against 'floor'
const makeSnugOnFloor = ( snug_obj, other_obj) => {
    const snug_coords = getCoords(snug_obj);
    const other_coords = getCoords(other_obj);
    const highest_other = Math.max(other_coords.y1, other_coords.y2);
    const snug_min = Math.min(snug_coords.y1, snug_coords.y2);
    const snug_max = Math.max(snug_coords.y1, snug_coords.y2);
    if (snug_min <= highest_other && highest_other <= snug_max){ // intersects floor
        snug_obj.bottom = highest_other;
        return snug_obj;
    }
    return null;
}

//  returns true/false of if fall_obj is touching a 'floor' (should be called after every move) 
const touchingFloor = (fall_obj) => {
    let one_lower = Object.assign({}, fall_obj);  
    one_lower.bottom -= 1;
    return (intersectsAny(one_lower)) ? true: false;
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
    if (!touchingFloor(hero) && !isJumping()){
        fallDown();
    }
    console.log('touching floor ' + touchingFloor(hero));
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
const intersectsAny = (hero) => {
    let hero_coords = getCoords(hero);
    for (let i = 0; i < obst_arr.length; i++){
        let obst_coords = getCoords(obst_arr[i]);
        if (intersects(hero_coords, obst_coords)){
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

//  returns two points, top right and bottom left corners
const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.bottom,
        y2 : obj.bottom + obj.height
    }
}