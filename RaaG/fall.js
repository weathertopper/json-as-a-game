const startFall = (obj_name) =>{
    full_set[obj_name].falling = true; 
}

const endFall = (obj_name) => {
    full_set[obj_name].falling = false;
}

const isFalling = (obj_name) => {
    return full_set[obj_name].falling; 
}

const fallDown = (obj_name) => {
    return new Promise( (resolve) => {
        fallDownInterval(   obj_name,
                            jump_config.fall.start_vel, 
                            jump_config.fall.delta_factor, 
                            jump_config.fall.vel_cap, 
                            jump_config.fall.timeout,
                            resolve)
    } )
}

const fallDownInterval = ( obj_name, fall_rate, r_o_c, max_rate, timeout, resolve) => {
    setTimeout( function(){
        if (!touchingFloor(full_set[obj_name])){
            moveVert(obj_name, -1 * fall_rate);
            fall_rate = (fall_rate * r_o_c <= max_rate) ? fall_rate * r_o_c : max_rate ;
            fallDownInterval( obj_name, fall_rate, r_o_c, max_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

//  returns true/false of if fall_obj is touching a 'floor' (should be called after every move) 
const touchingFloor = (move_obj) => {
    let one_lower = Object.assign({}, move_obj);  
    one_lower.bottom -= 1;
    const touching_floor = (intersectsAny(one_lower)) ? true: false;
    return touching_floor
}

//  returns 'snugged' obj if snug_obj intersects w/ floor (else, null)
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

const startGravity = () => {
    setInterval( () => {
        Object.keys(full_set).forEach((obj_name) => { 
            if (    full_set[obj_name].has_gravity
                &&  !touchingFloor(full_set[obj_name]) 
                &&  !isJumping(obj_name) 
                &&  !isFalling(obj_name)){
                startFall(obj_name);
                fallDown(obj_name).then( () => {
                    endFall(obj_name);
                })
            }
        });
    }, update_timeout);
}