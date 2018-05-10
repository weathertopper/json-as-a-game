
$(document).ready( () =>{
    heroLevelUp(null, getGC('playing_level'));
    fillOutGC();
    initGameDOM();
    
    start();
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