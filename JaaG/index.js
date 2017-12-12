
$(document).ready( () =>{
    collapseGameConfig();
    initGame();
    start();
    console.log('document ready');
})

const start = () => {
    startHeroMovement();
    startGravity();
}

const initGame = () => {
    for (let obj_name in full_set) {
        let obj = full_set[obj_name];
        if (!obj.can_intersect){
            $(`#bkgd`).append(`<div id="${obj.id}"></div>`);
        }
        else{
            $(`#arena`).append(`<div id="${obj.id}"></div>`);
        }
        $(`#${obj.id}`).css('background-color', obj.color);
        $(`#${obj.id}`).css('width', obj.width);
        $(`#${obj.id}`).css('height', obj.height);
        setPosition(obj.id, obj);       
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