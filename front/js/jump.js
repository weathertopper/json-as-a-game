
const startJump = (level_name, obj_name) =>{
    setObject(true, level_name, 'arena', obj_name, 'jumping');
}

const endJump = (level_name, obj_name) => {
    setObject(false, level_name, 'arena', obj_name, 'jumping');
}

const isJumping = (level_name, obj_name) => {
    return getObject( level_name, 'arena', obj_name, 'jumping');
}

const jump = (level_name, obj_name) => {
    if(touchingFloor(level_name, obj_name)){
        startJump(level_name, obj_name);
        jumpUp(level_name, obj_name).then( () => {
            endJump(level_name, obj_name);
            apexPause().then( () => {
                //  fall handled by move 
            })
        })
    }
}

const jumpUp = (level_name, obj_name) => {
    return new Promise( (resolve) => {
        jumpUpInterval( level_name,
                        obj_name,
                        getGC('movement', 'jump', 'start_vel'),
                        getGC('movement', 'jump', 'delta_factor'),
                        getGC('movement', 'jump', 'vel_cap'),
                        getGC('movement', 'jump', 'timeout'),
                        resolve);
    } )
}

//  broken when jump up to hit floating object
const jumpUpInterval = ( level_name, obj_name, jump_rate, r_o_c, min_rate,timeout, resolve) => {
    setTimeout( function(){
        if (jump_rate > min_rate){
            moveVert(level_name, 'arena', obj_name, jump_rate);
            jump_rate *= r_o_c;
            jumpUpInterval(level_name, obj_name, jump_rate, r_o_c, min_rate, timeout, resolve);
        }
        else{
            resolve();
        }
    }.bind(this), timeout);
}

const apexPause = () => {
    return new Promise( (resolve) => {
        apexPauseInterval(  getGC('movement', 'apex', 'frame_count'),
                            getGC('movement', 'apex', 'timeout'),
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