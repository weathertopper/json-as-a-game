
//  jump_time is time since last jump
const calculateYDelta= function(jump_start){
    const v_naught= 6;    //  variable for me
    // const y_naught = hero.top;
    const gravity= 9.8;
    const jump_time = (Date.now() - jump_start)/1000;
    const y_delta = /*y_naught*/ 0 + (v_naught*jump_time) - (.5*gravity*jump_time*jump_time);
    return y_delta;
};