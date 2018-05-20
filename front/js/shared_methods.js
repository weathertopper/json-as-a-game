//  returns two points, top right and bottom left corners
const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.bottom,
        y2 : obj.bottom + obj.height
    }
}

// let keys = {};

const setKeyCode = (keyCode, bool) => {
    if (bool){
        keys[keyCode] = bool;
    }
    else{
        delete keys[keyCode];
    }
    
}