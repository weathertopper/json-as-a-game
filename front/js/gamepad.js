let has_gamepad = false;
let report_gamepad;
	
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