const startFall = (obj_name) =>{
    move_set[obj_name].falling = true; 
}

const startJump = (obj_name) =>{
    move_set[obj_name].jumping = true; 
}

const endFall = (obj_name) => {
    move_set[obj_name].falling = false;
}

const endJump = (obj_name) => {
    move_set[obj_name].jumping = false;
}

const isFalling = (obj_name) => {
    return move_set[obj_name].falling; 
}

const isJumping = (obj_name) => {
    return move_set[obj_name].jumping; 
}

const jump = () => {
    if(touchingFloor(move_set.hero)){
        startJump('hero');
        jumpUp().then( () => {
            endJump('hero');
            apexPause().then( () => {
                //  fall handled by move 
            })
        })
    }
}

const jumpUp = () => {
    return new Promise( (resolve) => {
        jumpUpInterval( jump_config.jump.start_vel, 
                        jump_config.jump.delta_factor, 
                        jump_config.jump.vel_cap, 
                        jump_config.jump.timeout, 
                        resolve);
    } )
}

const jumpUpInterval = (jump_rate, r_o_c, min_rate, timeout, resolve) => {
    setTimeout( function(){
        if (jump_rate > min_rate){
            moveVert('hero', jump_rate);
            jump_rate *= r_o_c;
            jumpUpInterval(jump_rate, r_o_c, min_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

const apexPause = () => {
    return new Promise( (resolve) => {
        apexPauseInterval(  jump_config.apex.frame_count,
                            jump_config.apex.timeout,
                            resolve);
    })
}

const apexPauseInterval = ( frame_count, timeout, resolve) => {
    setTimeout( function(){
        if (frame_count--){
            apexPauseInterval( frame_count, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

const fallDown = () => {
    return new Promise( (resolve) => {
        fallDownInterval(   jump_config.fall.start_vel, 
                            jump_config.fall.delta_factor, 
                            jump_config.fall.vel_cap, 
                            jump_config.fall.timeout,
                            resolve)
    } )
}

const fallDownInterval = ( fall_rate, r_o_c, max_rate, timeout, resolve) => {
    setTimeout( function(){
        if (!touchingFloor(move_set.hero)){
            moveVert('hero', -1 * fall_rate);
            console.log()
            fall_rate = (fall_rate * r_o_c <= max_rate) ? fall_rate * r_o_c : max_rate ;
            fallDownInterval( fall_rate, r_o_c, max_rate, timeout, resolve);
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