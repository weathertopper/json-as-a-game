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
                moveVert(1);
                break;
            case '39':    // right
                moveHorz(1);
                break;
            case '40':    // down
                moveVert(-1);
                break;
            default: 
                console.log('what key is this? ' + keyCode);
        }
    }
}

//  x_delta (+) goes right, y_delta (-) goes left
const moveHorz = (x_delta) => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.left += x_delta; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setPosition('hero', hero);
}

//  y_delta (+) goes up, y_delta (-) goes down
const moveVert = (y_delta) => {
    let updated_hero = Object.assign({}, hero);
    updated_hero.bottom += y_delta; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setPosition('hero', hero);
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

const intersects = (a_coords, b_coords) => {
    if (a_coords.x1 < b_coords.x2
        &&  a_coords.x2 > b_coords.x1
        &&  a_coords.y1 < b_coords.y2
        &&  a_coords.y2 > b_coords.y1 ){
        
        return true; 
    }
    return false;
}

//  returns two points, top left and bottom right corners
const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.bottom,
        y2 : obj.bottom + obj.height
    }
}