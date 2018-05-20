
$(document).ready( () =>{
    heroLevelUp(null, getGC('playing_level'));
    fillOutGC();
    initGameDOM();
    
    start();

    if(gamepadConnected()) {
        $(window).on("gamepadconnected", function() {
            has_gamepad = true;
            report_gamepad = window.setInterval(reportOnGamepad,100);
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