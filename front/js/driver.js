
$(document).ready( () =>{
    heroLevelUp(null, getGC('playing_level'));
    fillOutGC();
    initGameDOM();
    start();
    startGamePadListening();

    console.log('document ready');
})

const initGameDOM = () => {
    for (let level_name in getGC('levels')) {
        initDOMByArea(level_name, 'background');
        initDOMByArea(level_name,'arena');
        initDOMHero();
    }
}

const start = () => {
    startHeroMovement();
    startGravity(getGC('playing_level'));
}

const getButtonKeyCodeMap = () => {
    const move_set = getGC('movement', 'actions');
    button_to_keycode = {};
    Object.values(move_set).forEach( (object) => {
        if (object.hasOwnProperty('button')){
            button_to_keycode[object['button']] = object['keycode']
        }
    })
    return button_to_keycode;
}