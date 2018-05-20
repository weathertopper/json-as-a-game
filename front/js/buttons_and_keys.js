$(document).keydown( (event) => {
    // keys[event.keyCode] = true;
    setKeyCode(event.keyCode, true);
})

$(document).keyup( (event) => {
    // delete keys[event.keyCode];
    setKeyCode(event.keyCode, false);
})