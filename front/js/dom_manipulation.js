
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
        const html_type = (object.hasOwnProperty('image')) ? 'img' : 'div';
        $(`#${area}`).append(`<${html_type} id="${object_name}"></${html_type}>`);
        $(`#${object_name}`).css('width', object.width);
        $(`#${object_name}`).css('height', object.height);
        setPosition(object_name, getObject(level_name, area, object_name));
        // $(`#${object_name}`).attr('src', `/media/${object.image}`);
        $(`#${object_name}`).css('background-color', object.color);
        if (object.hasOwnProperty('image')){
            $(`#${object_name}`).attr('src', `/media/${object.image}` );
        }
    }
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

const setPosition = (obj_id, obj) => {
    $(`#${obj_id}`).css('top', CONSTANTS.WINDOW_HEIGHT - obj.bottom - obj.height);
    $(`#${obj_id}`).css('left', obj.left);
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