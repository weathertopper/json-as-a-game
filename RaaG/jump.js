
const startJump = (obj_name) =>{
    full_set[obj_name].jumping = true; 
}

const endJump = (obj_name) => {
    full_set[obj_name].jumping = false;
}

const isJumping = (obj_name) => {
    return full_set[obj_name].jumping; 
}

const jump = (obj_name) => {
    if(touchingFloor(full_set[obj_name])){
        startJump(obj_name);
        jumpUp(obj_name).then( () => {
            endJump(obj_name);
            apexPause().then( () => {
                //  fall handled by move 
            })
        })
    }
}

const jumpUp = (obj_name) => {
    return new Promise( (resolve) => {
        jumpUpInterval( obj_name,
                        jump_config.jump.start_vel, 
                        jump_config.jump.delta_factor, 
                        jump_config.jump.vel_cap, 
                        jump_config.jump.timeout, 
                        resolve);
    } )
}

const jumpUpInterval = ( obj_name, jump_rate, r_o_c, min_rate, timeout, resolve) => {
    setTimeout( function(){
        if (jump_rate > min_rate){
            moveVert(obj_name, jump_rate);
            jump_rate *= r_o_c;
            jumpUpInterval(obj_name, jump_rate, r_o_c, min_rate, timeout, resolve);
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