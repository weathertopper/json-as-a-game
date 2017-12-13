
$(document).ready( () =>{
    heroLevelUp(getGC('hero', 'start_level'));
    initGameDOM();
    fillOutGC();
    
    start();
    console.log('document ready');
})

const initGameDOM = () => {
    for (let level_name in getGC('levels')) {
        initDOMByArea(level_name, 'background');
        initDOMByArea(level_name,'arena');
        //  only add hero _once_ to the correct level
        if (level_name == getGC('hero', 'start_level')){
            //  REMOVE THIS CHECK AND  METHOD 
            initDOMHero();
        }
    }
}

const start = () => {
    startHeroMovement();
    startGravity();
}