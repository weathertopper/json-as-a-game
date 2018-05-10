
/**
 * Area being `arena` or `background`
 */
const initDOMByArea = (level_name, area) => {
    const object_set = getGC('levels', level_name, 'objects', area); 
    for (let object_name in object_set){
        if (object_name == "hero"){ // quick and dirty skip
            continue;
        }
        const object =  getObject(level_name, area, object_name);
        $(`#${area}`).append(`<div id="${object_name}"></div>`);
        $(`#${object_name}`).css('background-color', object.color);
        $(`#${object_name}`).css('width', object.width);
        $(`#${object_name}`).css('height', object.height);
        setPosition(object_name, getObject(level_name, area, object_name));
    }
}

const initDOMHero = () => {
    const hero = getGC('hero');
    const html_type = (hero.hasOwnProperty('image')) ? 'img' : 'div';
    $(`#arena`).append(`<${html_type} id="hero"></${html_type}>`);
    $(`#hero`).css('background-color', getGC('hero', 'color'));
    if (html_type == 'img'){
        $(`#hero`).attr('src', `/media/${hero.image}` )
    }
    $(`#hero`).css('width', getGC('hero', 'width'));
    $(`#hero`).css('height', getGC('hero', 'height'));
    setPosition('hero', getGC('hero'));
}

const setPosition = (obj_id, obj) => {
    $(`#${obj_id}`).css('top', CONSTANTS.WINDOW_HEIGHT - obj.bottom - obj.height);
    $(`#${obj_id}`).css('left', obj.left);
}

const removeFromDOM = (obj_id) => {
    $(`#${obj_id}`).remove();
}