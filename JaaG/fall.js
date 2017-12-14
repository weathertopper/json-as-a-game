const startFall = (level_name, obj_name) =>{
    setObject(true, level_name, 'arena', obj_name, 'falling');
}

const endFall = (level_name, obj_name) => {
    setObject(false, level_name, 'arena', obj_name, 'falling');
}

const isFalling = (level_name, obj_name) => {
    return getObject( level_name, 'arena', obj_name, 'falling');
}

const hasGravity = (level_name, obj_name) => {
    return getObject( level_name, 'arena', obj_name, 'has_gravity');
}

//redo this still
const fallDown = (level_name, obj_name) => {
    return new Promise( (resolve) => {
        fallDownInterval(   level_name,
                            obj_name,
                            getGC('movement', 'fall', 'start_vel'),
                            getGC('movement', 'fall', 'delta_factor'),
                            getGC('movement', 'fall', 'vel_cap'),
                            resolve)
    } )
}

const fallDownInterval = (level_name, obj_name, fall_rate, r_o_c, max_rate, resolve) => {
    setTimeout( function(){
        if (!touchingFloor(level_name, obj_name)){
            moveVert(level_name, 'arena', obj_name, -1 * fall_rate);
            fall_rate = (fall_rate * r_o_c <= max_rate) ? fall_rate * r_o_c : max_rate ;
            fallDownInterval( level_name, obj_name, fall_rate, r_o_c, max_rate, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), getGC('frame_rate'));
}

//  returns true/false of if fall_obj is touching a 'floor' (should be called after every move) 
const touchingFloor = (level_name, obj_name) => {
    let one_lower = Object.assign({}, getObject(level_name, 'arena', obj_name)); // deep copy
    one_lower.bottom -= 1;
    const touching_floor = (intersectsAny(level_name, obj_name, one_lower)) ? true: false;
    return touching_floor;
}

//  returns 'snugged' obj if snug_obj intersects w/ other_obj (else, null)
const makeSnugOnFloor = ( snug_obj, other_obj) => {
    const snug_coords = getCoords(snug_obj);
    const other_coords = getCoords(other_obj);
    const other_top = Math.max(other_coords.y1, other_coords.y2);
    const snug_bot = Math.min(snug_coords.y1, snug_coords.y2);
    const snug_top = Math.max(snug_coords.y1, snug_coords.y2);
    if (snug_bot <= other_top && other_top <= snug_top){ // intersects floor
        snug_obj.bottom = other_top;
        return snug_obj;
    }
    return null;
}

//  call at the beginning of each level, i guess? 
const startGravity = (level_name) => {
    setInterval( () => {
        const level_set = getGC('levels', level_name, 'objects', 'arena')
        for (let obj_name in level_set) {
            if (    hasGravity(level_name, obj_name)
                &&  !touchingFloor(level_name, obj_name)
                &&  !isJumping(level_name, obj_name)
                &&  !isFalling(level_name, obj_name)){
                    startFall(level_name, obj_name);
                    fallDown(level_name, obj_name).then(() => {
                        endFall(level_name, obj_name);
                    })
                }
        }
    }, getGC('frame_rate'));
}