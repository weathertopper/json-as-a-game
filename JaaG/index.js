
$(document).ready( () =>{
    fillOutGC();
    initGameDOM();
    start();
    console.log('document ready');
})

const initGameDOM = () => {
    for (let level_name in getGC('levels')) {
        initDOMByLocation(level_name, 'background');
        initDOMByLocation(level_name,'arena');
        //  only add hero _once_ to the correct level
        if (level_name == getGC('hero', 'start_level')){
            initDOMHero();
        }
    }
}

const start = () => {
    startHeroMovement();
    startGravity();
}