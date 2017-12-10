
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
    id: 'sky',
    color: 'lightblue',
    bottom: 0,
    left: 0,
    width: $(window).width(), 
    height: $(window).height(),
    can_intersect: false
};

let sun = {
    id: 'sun',
    color: 'yellow',
    bottom: 550,
    left: 650,
    width: 75, 
    height: 75,
    can_intersect: false
}

let bkgd_set = {
    sky: sky
   ,     sun: sun
}

/*  ARENA SET    */

let floor = {
    id: 'floor',
    color: 'blue',
    bottom: 0,
    left: 0,
    width: $(window).width(), 
    height: 100,
    can_intersect: true
}

let floor_2 = {
    id: 'floor_2',
    color: 'orange',
    bottom: 0,
    left: $(window).width()+100,
    width: $(window).width(), 
    height: 100,
    can_intersect: true
}

let left_wall = {
    id: 'left_wall',
    color: '',  //  invisible
    bottom: 0,
    left: 0 - $(window).width(),
    width: $(window).width(), 
    height: $(window).height(),
    can_intersect: true
}

let obst_1 = {
    id: 'obst_1',
    color: 'maroon',
    bottom: floor.bottom  + floor.height + 60,
    left: floor_2.left + 200,
    width: 50, 
    height: 50,
    can_intersect: true
}

let obst_2 = {
    id: 'obst_2',
    color: 'grey',
    bottom: floor.bottom + floor.height,
    left: ($(window).width() - 100)/2,
    width: 100, 
    height: 100,
    can_intersect: true
}

let obst_set = {
    floor:  floor
    ,   floor_2:  floor_2
    ,   left_wall: left_wall
    ,   obst_1: obst_1
    ,   obst_2: obst_2
}

/*  MOVE SET    */

let hero_width = 50;    // for use within hero
let hero = {
    id: 'hero',
    color: 'green',
    bottom: obst_set.floor.bottom +  + obst_set.floor.height + 300,
    left: ($(window).width() - hero_width)/2, //   set this in the middle of the window
    width: hero_width,
    height: 50,
    has_gravity: true,
    can_intersect: true,
    jumping: false,
    falling: false
}

let fall_obj = {
    id: 'fall_obj',
    color: 'magenta',
    bottom: obst_set.floor.bottom +  + obst_set.floor.height + 75,
    left: obst_set.floor.left + 100, //   set this in the middle of the window
    width: hero_width,
    height: 50,
    has_gravity: true,
    can_intersect: true,
    jumping: false,
    falling: false
}

let move_set = {
    hero: hero
    ,   fall_obj: fall_obj
}

/*  MOVING CONFIG   */

let move_x_interval = 2;

/*  USED FOR MOVE, GRAVITY, AND OTHER UNIVERSAL PROCESSES */
let update_timeout = 1;

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
