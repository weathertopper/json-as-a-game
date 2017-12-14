let keys = {};

const startHeroMovement = () => {
    setInterval( () => {
        move(getGC('playing_level'), 'hero');
    }, getGC('frame_rate'));
}

$(document).keydown( (event) => {
    keys[event.keyCode] = true;
})

$(document).keyup( (event) => {
    delete keys[event.keyCode];
})

//  only for objects in arena
const move = (level_name, obj_name) => {
    const x_interval = getGC('movement', 'x_interval');
    const move_set = getGC('movement', 'actions');
    const assigned_actions = Object.keys(move_set);
    const assigned_keycodes = Object.values(move_set);
    for (var keycode in keys){
        const keycode_index = assigned_keycodes.indexOf(parseInt(keycode));
        if (keycode_index < 0){
            continue;
        }
        const action = assigned_actions[keycode_index]; 
        switch(action){
            case 'left':
                moveHorz(level_name, 'arena', obj_name, -1 * x_interval);
                break;
            case 'jump':
                jump(level_name, obj_name);
                break;
            case 'right':
                moveHorz(level_name, 'arena', obj_name, x_interval);
                break;
            case 'duck':    //  does nothing now
                break;
            case 'shoot':   //  does nothing now
                break;
            default: 
                console.log('what key is this? ' + keycode);
        }
    }
}

//  x_delta (+) goes right, y_delta (-) goes left
const moveHorz = (level_name, area, obj_name, x_delta) => {
    let updated_obj = Object.assign({}, getObject(level_name, area, obj_name)); // deep copy
    updated_obj.left += x_delta; 
    const intersected_obj = intersectsAny(level_name, obj_name, updated_obj);
    if (!intersected_obj){
        setObject(updated_obj, level_name, area, obj_name);
        setPosition(obj_name, getObject(level_name, area, obj_name));
        setScreenScroll(level_name, x_delta);
    }
}

//  y_delta (+) goes up, y_delta (-) goes down
const moveVert = (level_name, area, obj_name, y_delta) => {
    let updated_obj = Object.assign({}, getObject(level_name, area, obj_name)); // deep copy
    updated_obj.bottom += y_delta; 
    updated_obj.bottom = modBottom(updated_obj);
    const intersected_obj = intersectsAny(level_name, obj_name, updated_obj);
    if (intersected_obj){
        let snug_obj = makeSnugOnFloor( updated_obj, intersected_obj);
        const obj_to_set = (snug_obj)? snug_obj : full_set[obj_name]; 
        setObject(obj_to_set, level_name, area, obj_name);
    }
    else{
        setObject(updated_obj, level_name, area, obj_name);
    }
    setPosition(obj_name, getObject(level_name, area, obj_name));
}

//  keeps obj on screen if it falls off edge
//  this may be removed later
const modBottom = (obj) => {
    if (obj.bottom + obj.height < 0){
        return CONSTANTS.WINDOW_HEIGHT;
    }
    return obj.bottom;
}

//  returns first obst intersected, if any (else null)
const intersectsAny = (level_name, obj_name, move_obj) => {
    let move_coords = getCoords(move_obj);
    const level_obj_set = getGC('levels', level_name, 'objects', 'arena');
    for (let obst_name in level_obj_set) {
        if (obj_name == obst_name){ continue; }  //  skip itself
        let obst_obj = getObject(level_name, 'arena', obst_name);
        let obst_coords = getCoords(obst_obj);
        if (intersects(move_coords, obst_coords)){
            return obst_obj;
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
//  FOR >1 LEVEL, WOULD NEED TO SHIFT ENTIRE GAME (ALL LEVELS);
//  after moving hero, shift entire screen so hero stays in the middle of the window
const setScreenScroll = (level_name, x_delta) => {
    setScreenScrollByArea(level_name, 'background', x_delta);
    setScreenScrollByArea(level_name, 'arena', x_delta);
}

const setScreenScrollByArea = (level_name, area, x_delta) => {
    const level_set = getGC('levels', level_name, 'objects', area);
    for (let obj_name in level_set) {
        const obj = getObject(level_name, area, obj_name);
        if (!obj.static_position){
            const new_x = obj.left - x_delta
            setObject(new_x, level_name, area, obj_name, 'left');
            setPosition(obj_name, getObject(level_name, area, obj_name));
        }
    }
}
