$(document).ready( () =>{
    bkgdInit();
    heroInit();
    obstInit();
    console.log('document ready');
})

const bkgdInit = () => {
    bkgd_arr.forEach( (bkgd) => {
        $('#bkgd').append(`<div id="${bkgd.name}"></div>`);
        $(`#${bkgd.name}`).css('background-color', bkgd.color);
        $(`#${bkgd.name}`).css('top', bkgd.top);
        $(`#${bkgd.name}`).css('left', bkgd.left);
        $(`#${bkgd.name}`).css('width', bkgd.width);
        $(`#${bkgd.name}`).css('height', bkgd.height);
    })
}

const obstInit = () => {
    obst_arr.forEach( (obst) => {
        $('#arena').append(`<div id="${obst.name}"></div>`);
        $(`#${obst.name}`).css('background-color', obst.color);
        $(`#${obst.name}`).css('top', obst.top);
        $(`#${obst.name}`).css('left', obst.left);
        $(`#${obst.name}`).css('width', obst.width);
        $(`#${obst.name}`).css('height', obst.height);
    })
}

const heroInit = () => {
    $('#arena').append('<div id="hero"></div>');
    $('#hero').css('background-color', hero.color);
    $('#hero').css('top', hero.top);
    $('#hero').css('left', hero.left);
    $('#hero').css('width', hero.width);
    $('#hero').css('height', hero.height);
}