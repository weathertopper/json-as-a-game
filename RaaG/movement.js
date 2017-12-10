let keys = {};

const startHeroMovement = () => {
    setInterval( () => {
        move('hero');
    }, update_timeout);
}

$(document).keydown( (event) => {
    keys[event.keyCode] = true;
})

$(document).keyup( (event) => {
    delete keys[event.keyCode];
})

const move = (obj_name) => {
    for (var keyCode in keys){
        switch(keyCode){
            case '37':    // left
                moveHorz(obj_name, -1 * move_x_interval);
                break;
            case '38':    // up
                jump('hero');
                break;
            case '39':    // right
                moveHorz(obj_name, move_x_interval);
                break;
            case '40':    // down
                // moveVert(-1);
                break;
            default: 
                console.log('what key is this? ' + keyCode);
        }
    }
}

//  x_delta (+) goes right, y_delta (-) goes left
const moveHorz = (obj_name, x_delta) => {
    let updated_obj = Object.assign({}, move_set[obj_name]);  
    updated_obj.left += x_delta; 
    const intersected_obj = intersectsAny(updated_obj)
    if (!intersected_obj){
        move_set[obj_name] = updated_obj;
        setPosition(obj_name, updated_obj);
        setScreenScroll(x_delta);
    }
}

//  y_delta (+) goes up, y_delta (-) goes down
const moveVert = (obj_name, y_delta) => {
    let updated_obj = Object.assign({}, move_set[obj_name]);
    updated_obj.bottom += y_delta; 
    updated_obj.bottom = modBottom(updated_obj);
    const intersected_obj = intersectsAny(updated_obj)
    if (intersected_obj){
        let snug_obj = makeSnugOnFloor( updated_obj, intersected_obj);
        move_set[obj_name] = (snug_obj)? snug_obj : move_set[obj_name]; 
    }
    else{
        move_set[obj_name] = updated_obj;
    }
    setPosition(obj_name, move_set[obj_name]);
}

//  keeps obj on screen if it falls off edge
const modBottom = (obj) => {

    if (obj.bottom + obj.height < 0){
        return window_size.height 
    }
    return obj.bottom;
}

//  returns first obst intersected, if any (else null)
const intersectsAny = (obj) => {
    let obj_coords = getCoords(obj);
    for (let i = 0; i < obst_arr.length; i++){
        if (obj.id == obst_arr[i].id){ continue; }  //  skip itself
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

//  after moving hero, shift entire screen so hero stays in the middle of the window
//  (except floor && sky)
const setScreenScroll = (x_delta) => {
    for (let obj_name in scroll_set) {
        scroll_set[obj_name].left -= x_delta;
        setPosition(obj_name, scroll_set[obj_name]);
    }
}
