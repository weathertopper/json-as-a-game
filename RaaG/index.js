// for easier access post-init
let obst_arr;
let scroll_set;

$(document).ready( () =>{
    objSetInit('bkgd', bkgd_set);
    objSetInit('arena', obst_set);
    objSetInit('arena', move_set);
    buildObstArr();
    buildScrollSet();
    startMovement();
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

//  this builds a shallow copy
const buildObstArr = () => {
    obst_arr = [];
    Object.keys(obst_set).forEach((name) => { obst_arr.push(obst_set[name]);});
}

//  this must build a shallow copy of all objects involved
//  (except floor and sky)
const buildScrollSet = () => {
    scroll_set = move_set;  //  technically all objects are also added to move_set. that should be fixed... sometime
    addToScrollSet(bkgd_set);
    addToScrollSet(obst_set);
    delete scroll_set.sky;
}

const addToScrollSet = (obj_set) => {
    obj_keys = Object.keys(obj_set);
    for (let key_ind in obj_keys){
        const key = obj_keys[key_ind];
        scroll_set[key] = obj_set[key];
    }
}

const setPosition = (obj_id, obj) => {
    $(`#${obj_id}`).css('top', window_size.height - obj.bottom - obj.height);
    $(`#${obj_id}`).css('left', obj.left);
}

//  returns two points, top right and bottom left corners
const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.bottom,
        y2 : obj.bottom + obj.height
    }
}