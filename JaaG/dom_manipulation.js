
/**
 * Area being `arena` or `background`
 */
const initDOMByArea = (level_name, area) => {
    const object_set = getGC('levels', level_name, 'objects', area); 
    for (let object_name in object_set){
        const object =  getObject(level_name, area, object_name);
        $(`#${area}`).append(`<div id="${object_name}"></div>`);
        $(`#${object_name}`).css('background-color', object.color);
        $(`#${object_name}`).css('width', object.width);
        $(`#${object_name}`).css('height', object.height);
        setPosition(object_name, object);
    }
}

const initDOMHero = () => {
    $(`#arena`).append(`<div id="hero"></div>`);
    $(`#hero`).css('background-color', getGC('hero', 'color'));
    $(`#hero`).css('width', getGC('hero', 'width'));
    $(`#hero`).css('height', getGC('hero', 'height'));
    setPosition('hero', getGC('hero'));
}

const setPosition = (obj_id, obj) => {
    $(`#${obj_id}`).css('top', window_size.height - obj.bottom - obj.height);
    $(`#${obj_id}`).css('left', obj.left);
}