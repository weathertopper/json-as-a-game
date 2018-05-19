//  returns obj name of first obst intersected, if any (else null)
const intersectsAny = (level_name, obj_name, move_obj) => {
    let move_coords = getCoords(move_obj);
    const level_obj_set = getGC('levels', level_name, 'objects', 'arena');
    for (let obst_name in level_obj_set) {
        if (obj_name == obst_name){ continue; }  //  skip itself
        let obst_obj = getObject(level_name, 'arena', obst_name);
        let obst_coords = getCoords(obst_obj);
        if (intersects(move_coords, obst_coords)){
            return obst_name;
        }
    }
    return null;
}

const intersects = (a_coords, b_coords) => {
    if (a_coords.x1 < b_coords.x2
        &&  a_coords.x2 > b_coords.x1
        &&  a_coords.y1 < b_coords.y2
        &&  a_coords.y2 > b_coords.y1 ){
        return true; 
    }
    return false;
}

const executeIntersectHandlers = (level_name, area, intersected_name) => {
    const on_intersect = getObject(level_name, area, intersected_name, "on_intersect");
    if (!on_intersect){
        return;
    }
    //  not exclusive
    if (on_intersect.play_sound){
        playSoundOnIntersect(on_intersect.play_sound);
    }
    if (on_intersect.win){
        stopHeroMovement();
        runAnimations('win');
    }
    if (on_intersect.lose){
        stopHeroMovement();
        runAnimations('lose');
    }
    if (on_intersect.destroy){  //  destroy last
        destroyOnIntersect(level_name, area, intersected_name);
    }
}

const destroyOnIntersect = (level_name, area, intersected_name) => {
    removeFromDOM(intersected_name);
    removeObject(level_name, area, intersected_name);
}

//  only adds audio obj once, but can play >1 time
const playSoundOnIntersect = (sound_name) => {
    let audio_from_dom = getAudioFromDOM(sound_name);
    if (!audio_from_dom){
        addAudioToDOM(sound_name);
        audio_from_dom = getAudioFromDOM(sound_name);
    }
    audio_from_dom.play();
}