
const startJet = (level_name, obj_name) =>{
    setObject(true, level_name, 'arena', obj_name, 'jetting');
}

const endJet = (level_name, obj_name) => {
    setObject(false, level_name, 'arena', obj_name, 'jetting');
}

// const isJetting = (level_name, obj_name) => {
//     return getObject( level_name, 'arena', obj_name, 'jetting');
// }

//  setJet and endJet are a bit redundant for this simple purpose, 
//  but keeping structures in case I want to make this more advanced
//  in the future
const jet = (level_name, obj_name) => {
    startJet(level_name, obj_name);
    jetUp(level_name, obj_name).then( () => {
        endJet(level_name, obj_name);
    })
}

const jetUp = (level_name, obj_name) => {
    return new Promise( (resolve) => {
        jetUpInterval( level_name,
                        obj_name,
                        getGC('movement', 'jet', 'start_vel'),
                        getGC('movement', 'jet', 'delta_factor'),
                        getGC('movement', 'jet', 'vel_cap'),
                        getGC('movement', 'jet', 'timeout'),
                        resolve);
    } )
}

const jetUpInterval = ( level_name, obj_name, jet_rate, r_o_c, min_rate,timeout, resolve) => {
    setTimeout( function(){
        moveVert(level_name, 'arena', obj_name, jet_rate);
        resolve();
    }.bind(this), timeout);
}