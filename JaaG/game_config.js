let game_config = {
    hero: {
        color: 'green',
        bottom: 200, // change after reference_by
        left: 200, // change after reference_by
        width: 50,
        height: 50,
        has_gravity: true,
        start_level: 'ready_player_one' //  not used yet
    },
    frame_rate: 10,
    movement: {
        actions : { 
            left : 37,
            right: 38,
            jump : 39,
            duck : 40,  //  not used yet
            shoot: 32   //  not used yet
        },
        jump : {
            start_vel : 8,
            delta_factor: .875,
            vel_cap: 1,
        },
        apex : {
            frame_count : 0
        }, 
        fall : {
            start_vel : 1,
            delta_factor: 1.5,
            vel_cap: 8,
        },
        x_interval : 2
    },
    levels : {
        ready_player_one : {
            objects : {
                background : {
                    sky : {
                        color: 'lightblue',
                        bottom: 0,
                        left: 0,
                        width: CONSTANTS.WINDOW_WIDTH, 
                        height: CONSTANTS.WINDOW_HEIGHT,
                        static_position: true
                    },
                    sun : {
                        color: 'yellow',
                        bottom: 550,
                        left: 650,
                        width: 75, 
                        height: 75,
                    }
                },
                arena : {
                    left_wall: {
                        color: '',//invisible
                        bottom: 0,
                        left: 0 -CONSTANTS.WINDOW_WIDTH,
                        width: CONSTANTS.WINDOW_WIDTH,
                        height: CONSTANTS.WINDOW_HEIGHT
                    },
                    floor : {
                        color: 'blue',
                        bottom: 0,
                        left: 0,
                        width: CONSTANTS.WINDOW_WIDTH, 
                        height: 100
                    },
                    obst_1 : {
                        color: `grey`,
                        bottom: 200,//change when reference_by implemented
                        left: 100,//change when reference_by implemented 
                        width: 100, 
                        height: 100,
                        has_gravity: true
                    }
                }
            }
        }
    }
}