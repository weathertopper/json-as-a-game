$(document).keydown( (event) => {
    setKeyCode(event.keyCode, true);
})

$(document).keyup( (event) => {
    setKeyCode(event.keyCode, false);
})