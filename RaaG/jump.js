let jumping = false; 

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

const jumpUpInterval = (jump_rate, r_o_c, min_rate, timeout, resolve) => {
    setTimeout( function(){
        if (jump_rate > min_rate){
            moveVert(jump_rate);
            jump_rate *= r_o_c;
            jumpUpInterval(jump_rate, r_o_c, min_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

const jumpUp = () => {
    let jump_promise = new Promise( (resolve) => {
        jumpUpInterval( jump_config.jump.start_vel, 
                        jump_config.jump.delta_factor, 
                        jump_config.jump.vel_cap, 
                        jump_config.jump.timeout, 
                        resolve);
    } )
    jump_promise.then(() => {
        fallDown();
    });
}

const fallDownInterval = ( fall_rate, r_o_c, max_rate, timeout, resolve) => {
    setTimeout( function(){
        if (!touchingFloor(hero)){
            moveVert(-1 * fall_rate);
            fall_rate = (fall_rate * r_o_c <= max_rate) ? fall_rate * r_o_c : max_rate ;
            fallDownInterval( fall_rate, r_o_c, max_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}


const fallDown = () => {
    let fall_promise = new Promise( (resolve) => {
        fallDownInterval(   jump_config.fall.start_vel, 
                            jump_config.fall.delta_factor, 
                            jump_config.fall.vel_cap, 
                            jump_config.fall.timeout,
                            resolve)
    } )
    fall_promise.then(() => {
        endJump();
    });
}

//  returns true/false of if fall_obj is touching a 'floor' (should be called after every move) 
const touchingFloor = (move_obj) => {
    let one_lower = Object.assign({}, move_obj);  
    one_lower.bottom -= 1;
    return (intersectsAny(one_lower)) ? true: false;
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