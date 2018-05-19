//  win_or_lose is either 'win' or 'lose'

const runAnimations = (win_or_lose) => {
    const level_name = getGC('playing_level');
    const obj_names = Object.keys(getGC('levels', level_name, win_or_lose));
    obj_names.forEach( (obj_name) => {
        const win_anims = getGC('levels', level_name, win_or_lose, obj_name);
        const wait = win_anims["wait"];
        const ease_anim = win_anims["ease"];
        const speed = win_anims["speed"];
        let anim_style = win_anims["animate"];
        let animations = {};
        const anim_keys = Object.keys(anim_style);
        anim_keys.forEach( (anim) => {
            if (anim_style[anim].toString().includes('$')){    //  expression, evaluate
                console.log('got here');
                console.log(anim_style[anim]);
                const evaluated = eval(anim_style[anim]);
                console.log('evaluated');
                console.log(evaluated);
                anim_style[anim] = evaluated;
            }
        })
        console.log('anim style')
        console.log(anim_style);
        if(wait){
            setTimeout(() => {$(`#${obj_name}`).animate(anim_style, speed,ease_anim);}, wait)
        }   
        else{
            $(`#${obj_name}`).animate(anim_style, speed,ease_anim);   
        }
    })
}

