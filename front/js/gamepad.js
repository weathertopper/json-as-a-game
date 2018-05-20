

let has_gamepad = false;
let report_gamepad;

const startGamePadListening = () => {
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
}

gamepadConnected = () => {
	return "getGamepads" in navigator;
}

buttons = {};

reportOnGamepad = (button_keycode_map) => {
	const gamepad = navigator.getGamepads()[0];    
    gamepad.buttons.forEach( (button, index) => {
        if (button_keycode_map.hasOwnProperty(index)){
            if (button.pressed){
                setKeyCode(button_keycode_map[index], true);
            }
            else{
                setKeyCode(button_keycode_map[index], false);
            }
        }
    })

    //  axes not currently supported
    // gamepad.axes.forEach( (axis, index) => {
    //     if(Math.abs(axis) >.3) console.log('axis', index, axis);
    // })
}