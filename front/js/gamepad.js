let has_gamepad = false;
let report_gamepad;
	
gamepadConnected = () => {
	return "getGamepads" in navigator;
}

buttons = {};

reportOnGamepad = () => {
	const gamepad = navigator.getGamepads()[0];    
    gamepad.buttons.forEach( (button, index) => {
        if(button.pressed) console.log('button', index, 'pressed')
        if (button.pressed && index == 15){
            setKeyCode(39, true);
            buttons[39] = true;
        }
        if (buttons[39] && index == 15 && !button.pressed){
            delete buttons[39];
            setKeyCode(39, false);
        }
    })
    gamepad.axes.forEach( (axis, index) => {
        if(Math.abs(axis) >.3) console.log('axis', index, axis);
    })
}