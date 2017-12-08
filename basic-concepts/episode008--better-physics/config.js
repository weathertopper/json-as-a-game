
/*
    all config values in (x,y) coords in the 1st quadrant ( bottom, left)
    they are converted by setPosition
*/

const window_size = {
    height: $(window).height(),
    width: $(window).width()
}

let bkgd_set = {
    sun: {
        color: 'yellow',
        bottom: 550,
        left: 650,
        width: 75, 
        height: 75
    }
}

//  init separate for other objects to reference
let floor = {
    color: 'blue',
    bottom: 0,
    left: 0,
    width: $(window).width(), 
    height: 100
}

let obst_set = {
    floor:  floor, 
    obst_1: {
        color: 'maroon',
        bottom: 0 + floor.bottom  + floor.height,
        left: 300,
        width: 50, 
        height: 50
    }, 
    obst_2: {
        color: 'grey',
        bottom: 0 + floor.bottom + floor.height,
        left: 500,
        width: 100, 
        height: 100
    }
}

let hero_set = {
    hero: {
        color: 'green',
        bottom: 0 + obst_set.floor.bottom +  + obst_set.floor.height,
        left: 100,
        width: 50,
        height: 50
    }

}

const epsilon = 1;
