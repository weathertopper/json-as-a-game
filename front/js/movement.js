let keys = {};

let hero_movement_interval;

const startHeroMovement = () => {
    hero_movement_interval = setInterval( () => {
        moveHero(getGC('playing_level'));
    }, getGC('frame_rate'));
}

const stopHeroMovement = () => {
    if (hero_movement_interval){
        clearInterval(hero_movement_interval);
    }
}

$(document).keydown( (event) => {
    keys[event.keyCode] = true;
})

$(document).keyup( (event) => {
    delete keys[event.keyCode];
})

//  only for hero in arena (make this multi-purpose again if >1 player wanted)
const moveHero = (level_name, obj_name) => {
    const obj_name = 'hero';
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
            case 'jet':  //  because usually same key as jump, check before jumping
                jet(level_name, obj_name);
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
    const intersected_name = intersectsAny(level_name, obj_name, updated_obj);
    if (intersected_name){
        const intersected_object = getObject(level_name, area, intersected_name);
        if (intersected_object.movable){
            console.log('move the movable!');
            const moved_movables = moveMovable(level_name, area, intersected_name, x_delta, 0);
            if (moved_movables) {
                setObject(updated_obj, level_name, area, obj_name);
                setPosition(obj_name, getObject(level_name, area, obj_name));
                setScreenScroll(level_name, x_delta);
            }
        }
        //  else don't move!
        executeIntersectHandlers(level_name, area, intersected_name);   //  for any other intersection action
    }
    else {
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
    const intersected_name = intersectsAny(level_name, obj_name, updated_obj);
    if (intersected_name){
        //  checking for moveability
        if (getObject(level_name, area, intersected_name, 'movable')){
            console.log('move the moveable!');
            moveMovable(level_name, area, intersected_name, 0, y_delta);    //regardless of this, snuggle up
        }
        const intersected_obj = getObject(level_name, area, intersected_name);
        let snug_obj = makeSnugOnFloor( updated_obj, intersected_obj);
        let obj_to_set = (snug_obj) ? snug_obj : getObject(level_name, area, obj_name)
        setObject(obj_to_set, level_name, area, obj_name);
        executeIntersectHandlers(level_name, area, intersected_name);   //  for any other intersection action
    }
    else{
        setObject(updated_obj, level_name, area, obj_name);
    }
    setPosition(obj_name, getObject(level_name, area, obj_name));
}

//  could upgrade for 2-d later
//  recursive: checks any other intersected movables
//  if all intersected movables can move, then set position (and return so prev movable can move)
//  what if intersect >1 movable? drat-- array freturned from intersectsAny :/
//  return bool? 

//  BROKEN
const moveMovable = (level_name, area, movable_name, x_delta, y_delta) => {
    let updated_obj = Object.assign({}, getObject(level_name, area, movable_name));
    updated_obj.left += x_delta;
    updated_obj.bottom += y_delta; 
    const intersected_name = intersectsAny(level_name, movable_name, updated_obj);
    let moved_others = false
    let obj_to_set = getObject(level_name, area, movable_name);  //  default is not to move
    if (intersected_name){
        //  floor not movable, so not snuggling
        if (getObject(level_name, area, intersected_name, 'movable')){
            moved_others = moveMovable(level_name, area, intersected_name, x_delta, y_delta)
        }
        if (moved_others){
            obj_to_set = updated_obj; // if intersected but to movable, move anyways
        }
        //  else, hit something and didn't move (so don't move)
        if (y_delta != 0){  // if up or down, snuggle up, regardless of intersection w/ movable or not
            const intersected_obj = getObject(level_name, area, intersected_name);
            let snug_obj = makeSnugOnFloor( updated_obj, intersected_obj);
            obj_to_set = (snug_obj) ? snug_obj : obj_to_set;
        }
    }
    else {
        obj_to_set = updated_obj; //  no intersection, just move (and return true, this is end 'movable)
        moved_others = true;
    }
    setObject(obj_to_set, level_name, area, movable_name);
    setPosition(movable_name, getObject(level_name, area, movable_name));
    return moved_others;
}

//  keeps obj on screen if it falls off edge
//  this may be removed later
const modBottom = (obj) => {
    if (obj.bottom + obj.height < 0){
        return CONSTANTS.WINDOW_HEIGHT;
    }
    return obj.bottom;
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
