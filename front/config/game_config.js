let game_config = {
    hero: {
        color: 'transparent',
        images: {
            still: {
                filepath: 'images-me/still.png',
                width: 56,
                height: 100
            }, 
            left: {
                filepath: 'images-me/left.png',
                width: 48,
                height: 100
            }, 
            right: {
                filepath: 'images-me/right.png',
                width: 48,
                height: 100
            }
        },
        bottom: 400, // change after reference_by
        left: (CONSTANTS.WINDOW_WIDTH - CONSTANTS.SMB_BLOCK)/2, // change after reference_by
        width: 48,
        height: 100,
        has_gravity: true
    },
    playing_level: 'a_quiet_place',
    frame_rate: 5,
    movement: {
        actions : { 
            left : {
                button: 14,
                keycode: 37 //  left arrow
            },  
            right: {
                button: 15,
                keycode: 39  //  right arrow
            },
            jet: {
                keycode: 0  //  not space bar
            },
            jump : {
                button: 12,
                keycode: 38  //  up arrow
            },
            duck : {
                keycode: 40  //  not used yet
            },
            shoot : {
                keycode: 32   //  not used yet
            }
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
        a_quiet_place : {
            objects : {
                background : {
                    sky : {
                        color: 'rgb(105, 105, 143)',
                        bottom: 0,
                        left: 0,
                        width: CONSTANTS.WINDOW_WIDTH, 
                        height: CONSTANTS.WINDOW_HEIGHT,
                        static_position: true
                    }
                    ,
                    moon : {
                        color: 'gainsboro',
                        bottom: 450,
                        left: 350,
                        width: 75, 
                        height: 75,
                        static_position: true
                    }
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
                        color: '#526F35',
                        bottom: 0,
                        left: 0 - CONSTANTS.WINDOW_WIDTH,
                        width: CONSTANTS.SMB_BLOCK * 140, 
                        height: CONSTANTS.SMB_BLOCK * 2,
                        objects: {  //  relative to floor

                        }
                    },
                    lantern: {
                        bottom: CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 24,
                        color: `transparent`, 
                        image: 'huge-lantern.png',
                        width: 42,
                        height: 56,
                        has_gravity: false,
                        on_intersect: {
                            'destroy': true,
                            'play_sound': 'eerie.mp3',
                            'win': false,
                            'lose': true
                        }
                    },
                    flag_1 :{
                        color: `lime`,
                        bottom:  CONSTANTS.SMB_BLOCK * (2), //   floor
                        left: CONSTANTS.SMB_BLOCK * 65,
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
                        left: CONSTANTS.SMB_BLOCK * 70,
                        width: CONSTANTS.WINDOW_WIDTH,
                        height: CONSTANTS.WINDOW_HEIGHT
                    },
                    demogorgon: {
                        color: '',
                        bottom: 5000,
                        left: 0,
                        width: 100,
                        height: 100,
                        has_gravity: false,
                        image: "https://res.cloudinary.com/teepublic/image/private/s--BzkDIajT--/t_Preview/b_rgb:fffffe,c_limit,f_jpg,h_630,q_90,w_630/v1505903294/production/designs/1918675_1.jpg"
                    }
                }
            },
            win:{
                "hero": {
                    // wait: ,
                    animate: {
                        opacity: "0.0"
                    },
                    speed: 2000,
                    ease: "linear"
                }
            },
            lose:{
                "demogorgon": { //follow jQuery animate function
                    animate: {
                        left: "$('#hero').position().left", 
                        top: "$('#hero').position().top",
                        "z-index": 1
                    },
                    speed: 1000,
                    ease: "linear"
                },    
                "hero": {
                    wait: 1001, //  EXPLAIN WAIT IN README
                    animate: {
                        opacity: "0.0"
                    },
                    speed: 1,
                    ease: "linear"
                }
            }
        }
    }
}