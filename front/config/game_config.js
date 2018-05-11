let game_config = {
    hero: {
        color: 'transparent',
        image: 'me-sideways-0.png',
        sprites: {
            right:[
                'right/standing.png',
                'right/one.png',
                'right/standing.png',
                'right/two.png'
            ],
            left:[
                'left/standing.png',
                'left/one.png',
                'left/standing.png',
                'left/two.png'
            ]
        },
        bottom: 400, // change after reference_by
        left: (CONSTANTS.WINDOW_WIDTH - CONSTANTS.SMB_BLOCK)/2, // change after reference_by
        width: 48,
        height: 100,
        has_gravity: true
    },
    playing_level: 'ready_player_one',
    frame_rate: 5,
    movement: {
        actions : { 
            left : 37,  //  left arrow
            right: 39,  //  right arrow
            jet: 32,    //  space bar
            jump : 38,  //  up arrow
            duck : 40,  //  not used yet
            shoot: 32   //  not used yet
        },
        jet : {
            start_vel : 8,
            vel_cap: 1,
            timeout: 10
        },
        jump : {
            start_vel : 8,
            delta_factor: .875,
            vel_cap: 1,
            timeout: 10
        },
        apex : {
            frame_count : 0, //  removed earlier (add back);
            timeout: 10
        }, 
        fall : {
            start_vel : 1,
            delta_factor: 1.5,
            vel_cap: 8,
            timeout: 10
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
                    }
                    // ,
                    // sun : {
                    //     color: 'yellow',
                    //     bottom: 550,
                    //     left: 650,
                    //     width: 75, 
                    //     height: 75,
                    // }
                },
                arena : {
                    left_wall: {
                        color: '',//invisible
                        bottom: 0,
                        left: 0 - CONSTANTS.WINDOW_WIDTH,
                        width: CONSTANTS.WINDOW_WIDTH,
                        height: CONSTANTS.WINDOW_HEIGHT
                    },
                    floor_1 : {
                        color: 'brown',
                        bottom: 0,
                        left: 0,
                        width: CONSTANTS.SMB_BLOCK * 70, 
                        height: CONSTANTS.SMB_BLOCK * 2
                    },
                    q_1 : {
                        color: `orange`,
                        bottom: CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 17,
                        width: CONSTANTS.SMB_BLOCK, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false,
                        on_intersect: {
                            'destroy': true,
                            'play_sound': 'eerie.mp3',
                            'win': false,
                            'lose': false
                        }
                    },
                    ledge_1 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 21,
                        width: CONSTANTS.SMB_BLOCK * 5, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    q_2 : {
                        color: `orange`,
                        bottom: CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 ledge + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 23,
                        width: CONSTANTS.SMB_BLOCK, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    pipe_1 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 29,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    pipe_2 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 39,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    pipe_3 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 47,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    pipe_4 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 58,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    q_3 : {
                        color: `orange`,
                        bottom: CONSTANTS.SMB_BLOCK * (6), //   6 sky
                        left: CONSTANTS.SMB_BLOCK * 65,
                        width: CONSTANTS.SMB_BLOCK, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    floor_2 : {
                        color: 'brown',
                        bottom: 0,
                        left: CONSTANTS.SMB_BLOCK * 72,
                        width: CONSTANTS.SMB_BLOCK * 15, 
                        height: CONSTANTS.SMB_BLOCK * 2
                    },
                    ledge_2 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 78,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    q_4 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 79,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    ledge_3 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 80,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK,
                        has_gravity: false
                    },
                    ledge_4 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 +3), //   floor + 3 sky + 1 ledge + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 81,
                        width: CONSTANTS.SMB_BLOCK * 8, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    floor_3 : {
                        color: 'brown',
                        bottom: 0,
                        left: CONSTANTS.SMB_BLOCK * 90,
                        width: CONSTANTS.SMB_BLOCK * 64, 
                        height: CONSTANTS.SMB_BLOCK * 2
                    },
                    ledge_5 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 +3), //   floor + 3 sky + 1 ledge + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 92,
                        width: CONSTANTS.SMB_BLOCK * 3, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_5 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 +3), //   floor + 3 sky + 1 ledge + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 95,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_6 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 95,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_6 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 101,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_7 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 102,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_8 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 107,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_9 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 110,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_10 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 113,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_11 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 110,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_7 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 119,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_8 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 122,
                        width: CONSTANTS.SMB_BLOCK * 3, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_9 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 129,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_12 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 130,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_13 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 131,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_10 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3 + 1 + 3), //   floor + 3 sky + 1 block + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 132,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_11 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 130,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    steps_1 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 135,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    steps_2 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 136,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_3 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 137,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    steps_4 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 138,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    steps_5 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 141,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    steps_6 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 142,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    steps_7 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 143,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_8 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 144,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    steps_9 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 149,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    steps_10 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 150,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_11 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 151,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    steps_12 : {
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 152,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    steps_13 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 153,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    floor_4 : {
                        color: 'brown',
                        bottom: 0,
                        left: CONSTANTS.SMB_BLOCK * 156,
                        width: CONSTANTS.SMB_BLOCK * 48, 
                        height: CONSTANTS.SMB_BLOCK * 2
                    },
                    steps_14 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 156,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    steps_15 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 157,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    steps_16 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 158,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_17 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 159,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    pipe_5 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 164,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    ledge_12 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 169,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    q_14 : {
                        color: `orange`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky 
                        left: CONSTANTS.SMB_BLOCK * 171,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    ledge_13 : {
                        color: `brown`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2 + 3), //   floor + 3 sky
                        left: CONSTANTS.SMB_BLOCK * 172,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    pipe_6 : {
                        color: `green`,
                        bottom:   CONSTANTS.SMB_BLOCK * 2,
                        left: CONSTANTS.SMB_BLOCK * 180,
                        width: CONSTANTS.SMB_BLOCK * 2, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_18 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 182,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false
                    },
                    steps_19 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 183,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        has_gravity: false
                    },
                    steps_20 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 184,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 3,
                        has_gravity: false
                    },
                    steps_21 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 185,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 4,
                        has_gravity: false
                    },
                    steps_22 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 186,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 5,
                        has_gravity: false
                    },
                    steps_23 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 187,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 6,
                        has_gravity: false
                    },
                    steps_24 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 188,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 7,
                        has_gravity: false
                    },
                    steps_25 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 189,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 8,
                        has_gravity: false
                    },
                    steps_26 :{
                        color: `maroon`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 190,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 8,
                        has_gravity: false
                    },
                    flag_1 :{
                        color: `lime`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 199,
                        width: CONSTANTS.SMB_BLOCK * 1, 
                        height: CONSTANTS.SMB_BLOCK * 1,
                        has_gravity: false,
                        on_intersect: {
                            'destroy': false,
                            'play_sound': false,
                            'win': true,
                            'lose': false
                        }
                    },
                    right_wall: {
                        color: '',//invisible
                        bottom: 0,
                        left: CONSTANTS.SMB_BLOCK * 200,
                        width: CONSTANTS.WINDOW_WIDTH,
                        height: CONSTANTS.WINDOW_HEIGHT
                    }
                }
            }
        }
    }
}