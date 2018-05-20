
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
        setDOMObject(area, object_name, object, 0, 0);
    }
}

//  helper that JUST sets objects (not hero). Prob make this recursive for relative objects
const setDOMObject = (area, obj_id, object, top_start, left_start) => {
    const html_type = (object.hasOwnProperty('image')) ? 'img' : 'div';
    $(`#${area}`).append(`<${html_type} id="${obj_id}"></${html_type}>`);
    $(`#${obj_id}`).css('width', object.width);
    $(`#${obj_id}`).css('height', object.height);
    $(`#${obj_id}`).css('background-color', object.color);
    if (html_type == 'img'){
        $(`#${obj_id}`).attr('src', `/media/${object.image}` );
    }
    setPosition(obj_id, object, top_start, left_start);
    // if (object.hasOwnProperty('objects')){
    //     const objects = object.objects;
    //     Object.keys(objects).forEach( (inner_obj_id) => {
    //         // what is the top and left start for inner obj? 
    //         const position = $(`#${obj_id}`).position();
    //         const left = position.left;
    //         const top = position.top;
    //         setDOMObject(area, inner_obj_id, objects[inner_obj_id], top, left);
    //     });
    // }
}

const initDOMHero = () => {
    const hero = getGC('hero');
    const html_type = (hero.hasOwnProperty('images')) ? 'img' : 'div';
    $(`#arena`).append(`<${html_type} id="hero"></${html_type}>`);
    $(`#hero`).css('background-color', getGC('hero', 'color'));
    $(`#hero`).css('width', getGC('hero', 'width'));    //  overwritten if images
    $(`#hero`).css('height', getGC('hero', 'height'));  //  overwritten if images
    if (html_type == 'img'){
        setHeroImage('still');
    }
    setPosition('hero', getGC('hero'));
}

const setHeroImage = (image_key) => {
    if (getGC('hero', 'images') && getGC('hero', 'images', image_key)){
        $(`#hero`).attr('src', `/media/${getGC('hero', 'images', image_key, 'filepath')}` );
        $(`#hero`).css('width', getGC('hero', 'images', image_key, 'width')); 
        $(`#hero`).css('height', getGC('hero', 'images', image_key, 'height')); 
    }
}

const setPosition = (obj_id, obj, top_start, left_start) => {
    $(`#${obj_id}`).css('top', CONSTANTS.WINDOW_HEIGHT - obj.bottom - obj.height - top_start);
    $(`#${obj_id}`).css('left', obj.left + left_start);
}

const removeFromDOM = (obj_id) => {
    $(`#${obj_id}`).remove();
}

const addAudioToDOM = (sound_name) => {
    const sound_file = `/media/${sound_name}`;
    $(`#media`).append(`<audio id="${sound_name}" src="${sound_file}" preload="auto" controls="none" style="display: none;"></audio>`)    
}

const getAudioFromDOM = (sound_name) => {
    return $(`audio[id='${sound_name}']`).get(0);
}