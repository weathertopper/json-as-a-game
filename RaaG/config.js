
/*
    all config values in (x,y) coords in the 1st quadrant ( bottom, left)
    they are converted by setPosition
*/

const window_size = {
    height: $(window).height(),
    width: $(window).width()
}

/*  BACKGROUND SET  */

let sky = {
    color: 'lightblue',
    bottom: 0,
    left: 0,
    width: $(window).width(), 
    height: $(window).height()
};

let sun = {
    color: 'yellow',
    bottom: 550,
    left: 650,
    width: 75, 
    height: 75
}

let bkgd_set = {
    sky: sky
   ,     sun: sun
}

/*  OBSTACLE SET    */

let floor = {
    color: 'blue',
    bottom: 0,
    left: 0,
    width: $(window).width(), 
    height: 100
}

let floor_2 = {
    color: 'orange',
    bottom: 0,
    left: $(window).width()+100,
    width: $(window).width(), 
    height: 100
}

let left_wall = {
    color: '',  //  invisible
    bottom: 0,
    left: 0 - $(window).width(),
    width: $(window).width(), 
    height: $(window).height()
}

let obst_1 = {
    color: 'maroon',
    bottom: floor.bottom  + floor.height + 60,
    left: floor_2.left + 200,
    width: 50, 
    height: 50
}

let obst_2 = {
    color: 'grey',
    bottom: floor.bottom + floor.height,
    left: ($(window).width() - 100)/2,
    width: 100, 
    height: 100
}

let obst_set = {
    floor:  floor
    ,   floor_2:  floor_2
    ,   left_wall: left_wall
    ,   obst_1: obst_1
    ,   obst_2: obst_2
}

/*  HERO SET    */

let hero_width = 50;    // for use within hero_set

let hero_set = {
    hero: {
        color: 'green',
        bottom: 0 + obst_set.floor.bottom +  + obst_set.floor.height + 300,
        left: ($(window).width() - hero_width)/2, //   set this in the middle of the window
        width: hero_width,
        height: 50
    }
}

/*  MOVING CONFIG   */

let move_x_interval = 2;

//  magic numbers, tweek until happy
const jump_config = {
    jump : {
        start_vel : 8,
        delta_factor: .875,
        vel_cap: 1,
        timeout: 10
    },
    apex : {
        frame_count: 0,
        timeout : 0
    },
    fall : {
        start_vel : 1,
        delta_factor: 1.5,
        vel_cap: 8,
        timeout: 10
    }
}
