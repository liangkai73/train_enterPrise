"use strict";

window.onload = function () {
    // 移动端init
    isMobile() && mobileMenueInit()
    imgLazyLoadFu();
}



// pc|mobile判断
function isMobile() {
    // debugger
    if (navigator.userAgent.match(/Mobi/i) ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone/i)) {
        console.log(navigator.userAgent)
        return true
    }
    return false
}
// pc初始化
function pcInit() {
    window.removeEventListener('scroll', scollEvent);
    document.body.setAttribute('page-init', 'pc')
}

//  移动端menue初始化
function mobileMenueInit() {

    document.getElementById('navbar-more').addEventListener('click', () => {
        _drawerSwitch(true);
    })
    document.getElementById('close-btn').addEventListener('click', () => {
        _drawerSwitch(false);
    })
    document.getElementById('drawer-inner-left').addEventListener('click', () => {
        _drawerSwitch(false);
    })

    window.addEventListener('scroll', scollEvent);

    document.body.setAttribute('page-init', 'mobile');


    // 抽屉开关
    function _drawerSwitch(isShow) {
        isShow && (document.getElementById('drawer').style.transform = `translateX(-100%)`);
        !isShow && (document.getElementById('drawer').style.transform = `translateX(0)`);
    }
}

// mobile - scoll事件
let timer;
function scollEvent() {
    document.getElementsByClassName('head-navBar')[0].style.opacity = 0;
    clearTimeout(timer);
    timer = setTimeout(function () {
        document.getElementsByClassName('head-navBar')[0].style.opacity = 1;
    }, 300); // 设置延迟时间，单位为毫秒
}