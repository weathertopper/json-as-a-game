$(document).keydown( (event) => {
    switch(event.keyCode){
        case 37:    // left
            console.log('left');
            moveLeft();
            break;
        case 38:    // up
            console.log('up');
            moveUp();
            break;
        case 39:    // right
            console.log('right');
            moveRight();
            break;
        case 40:    // down
            console.log('down');
            moveDown();
            break;
        default: 
            console.log('what key is this? ' + event.keyCode);
    }
})

const moveLeft = () => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.left -= 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const moveRight = () => {
    let updated_hero = Object.assign({}, hero); 
    updated_hero.left += 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const moveDown = () => {
    let updated_hero = Object.assign({}, hero);  
    updated_hero.top += 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const moveUp = () => {
    let updated_hero = Object.assign({}, hero); 
    updated_hero.top -= 1; 
    if (!intersectsAny(updated_hero)){
        hero = updated_hero;
    }
    setHeroPosition();
}

const intersects = (a_coords, b_coords) => {
    if (a_coords.x1 < b_coords.x2
        &&  a_coords.x2 > b_coords.x1
        &&  a_coords.y1 < b_coords.y2
        &&  a_coords.y2 > b_coords.y1 ){
        return true; 
    }
    return false;
}

const intersectsAny = (hero) => {
    let hero_coords = getCoords(hero);
    for (let i = 0; i < obst_arr.length; i++){
        let obst_coords = getCoords(obst_arr[i]);
        if (intersects(hero_coords, obst_coords)){
            return true;
        }
    }
    return false;
}

const getCoords = (obj) => {
    return {
        x1 : obj.left,
        x2 : obj.left + obj.width,
        y1 : obj.top,
        y2 : obj.top + obj.height
    }
}

const setHeroPosition = () => {
    $('#hero').css('top', hero.top);
    $('#hero').css('left', hero.left);
}