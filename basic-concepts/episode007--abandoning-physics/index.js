// for easier access post-init

let hero;
let obst_arr;

$(document).ready( () =>{
    objSetInit('bkgd', bkgd_set);
    objSetInit('arena', obst_set);
    objSetInit('arena', hero_set);
    hero = hero_set.hero;
    obst_arr = [];
    Object.keys(obst_set).forEach((name) => { obst_arr.push(obst_set[name]);});
    console.log('document ready');
})

const objSetInit = (container_id, obj_set) => {
    const obj_keys = Object.keys(obj_set);
    obj_keys.forEach( (obj_name) => {
        const obj = obj_set[obj_name];
        $(`#${container_id}`).append(`<div id="${obj_name}"></div>`);
        $(`#${obj_name}`).css('background-color', obj.color);
        $(`#${obj_name}`).css('width', obj.width);
        $(`#${obj_name}`).css('height', obj.height);
        setPosition(obj_name, obj);
    })
}


const setPosition = (obj_id, obj) => {
    $(`#${obj_id}`).css('top', window_size.height - obj.bottom - obj.height);
    $(`#${obj_id}`).css('left', obj.left);
}