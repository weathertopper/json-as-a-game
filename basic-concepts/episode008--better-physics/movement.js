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
    if(!jumping){
        startJump();
        let jumpInterval = setInterval( () => {
            console.log('jump interval started')
            let delta_y = calculateYDelta(jump_time);
            console.log('delta_y '+delta_y)
            let updated_hero = Object.assign({}, hero);
            updated_hero.bottom += delta_y; 
            const intersected_obj = intersectsAny(updated_hero);
            if (intersected_obj){
                console.log('intersected something');
                jumping = false;
                const snug_hero = makeSnugOnFloor('hero', updated_hero, intersected_obj);
                if (snug_hero){
                    hero = snug_hero;
                    setPosition('hero', hero);
                }
                clearInterval(jumpInterval)
            }
            else{
                console.log('no intersection');
                hero = updated_hero;
                setPosition('hero', hero);
            }
        }, 1)
    }
}

const startJump = () => {
    jumping = true;
    jump_time = Date.now();
    console.log('jump started');
}

const endJump = () => {
    jumping = false;
    console.log('jump ended');
}

//  returns 'snugged' obj if snug_obj intersects w/ floor (else, null)
const makeSnugOnFloor = (snug_name, snug_obj, other_obj) => {
    //  if there is an intersection....
    //  see if the intersection is with 'the floor' ie an obstacle below that
    //  if so, set it directly against 'floor'
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

//  x_delta (+) goes right, y_delta (-) goes left
const moveHorz = (x_delta) => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.left += x_delta; 
    const intersected_coords = intersectsAny(updated_hero)
    if (!intersected_coords){
        hero = updated_hero;
    }
    setPosition('hero', hero);
}

//  y_delta (+) goes up, y_delta (-) goes down
const moveVert = (y_delta) => {
    let updated_hero = Object.assign({}, hero);
    updated_hero.bottom += y_delta; 
    const intersected_coords = intersectsAny(updated_hero)
    if (!intersected_coords){
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