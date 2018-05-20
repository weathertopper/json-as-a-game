
$(document).ready( () =>{
    heroLevelUp(null, getGC('playing_level'));
    fillOutGC();
    initGameDOM();
    
    start();

    if(gamepadConnected()) {
        const button_to_keycode = getButtonKeyCodeMap();
        $(window).on("gamepadconnected", function() {
            has_gamepad = true;
            report_gamepad = window.setInterval(function(){reportOnGamepad(button_to_keycode)},100);
        });
        $(window).on("gamepaddisconnected", function() {
            window.clearInterval(report_gamepad);
        });
        //setup an interval for Chrome
        const checkGamepad = window.setInterval(function() {
            if(navigator.getGamepads()[0]) {
                if(!has_gamepad) $(window).trigger("gamepadconnected");
                window.clearInterval(checkGamepad);
            }
        }, 500);
    }

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