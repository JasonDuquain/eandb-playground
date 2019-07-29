/* zenscroll code */

!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():function n(){document&&document.body?t.zenscroll=e():setTimeout(n,9)}()}(this,function(){"use strict";var t=function(t){return t&&"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},u=function(){clearTimeout(i),r(0)},c=function(t){return Math.max(0,e.getTopOf(t)-o)},a=function(o,i,c){if(u(),0===i||i&&i<0||t(e.body))e.toY(o),c&&c();else{var a=e.getY(),f=Math.max(0,o)-a,s=(new Date).getTime();i=i||Math.min(Math.abs(f),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-s)/i),o=Math.max(0,Math.floor(a+f*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(o),n<1&&e.getHeight()+o<e.body.scrollHeight?t():(setTimeout(u,99),c&&c())},9))}()}},f=function(t,e,n){a(c(t),e,n)},s=function(t,n,i){var r=t.getBoundingClientRect().height,u=e.getTopOf(t)+r,s=e.getHeight(),l=e.getY(),d=l+s;c(t)<l||r+o>s?f(t,n,i):u+o>d?a(u-s+o,n,i):i&&i()},l=function(t,n,o,i){a(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(o||t.getBoundingClientRect().height/2)),n,i)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(o=e),{defaultDuration:n,edgeOffset:o}},to:f,toY:a,intoView:s,center:l,stop:u,moving:function(){return!!i},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,o=function(){return window.scrollY||n.scrollTop},i=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:o,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+o()-n.offsetTop}});if(i.createScroller=function(t,o,i){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},o,i)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="history"in window&&"pushState"in history,u=r&&"scrollRestoration"in history;u&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){u&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&i.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=i.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,i.getTopOf(e)-t),o=i.getY()-n;0<=o&&o<9&&window.scrollTo(0,n)}}},9)},!1);var c=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(u){var n=history.state&&"object"==typeof history.state?history.state:{};n.zenscrollY=i.getY();try{history.replaceState(n,"")}catch(t){}}var o=e.getAttribute("href")||"";if(0===o.indexOf("#")&&!c.test(e.className)){var a=0,f=document.getElementById(o.substring(1));if("#"!==o){if(!f)return;a=i.getTopOf(f)}t.preventDefault();var s=function(){window.location=o},l=i.setup().edgeOffset;l&&(a=Math.max(0,a-l),r&&(s=function(){history.pushState({},"",o)})),i.toY(a,null,s)}}},!1)}return i});


let heroImage = document.querySelector('.large-hero__image');
let heroImageUrl = heroImage.getAttribute('src');

/******** ONLY LOAD MAYA QUOTE ON COMPLETE img load - not always firing...is the image loading too fast?!!??!!  *******/
/*

heroImage.addEventListener('load', function(e) {
    console.log('hero img loaded');
    hero.classList.add('loaded')
});

*/

/******* FADE HERO SECT ON SCROLL *********/

/* the onScroll method has a conditional to keep it from running when the hero image is above the viewport - remove if any issues  */

let content = document.querySelector('.large-hero__main-heading');
let blur = document.querySelector('.large-hero__overlay'); // this element has the filter: blur(4px) applied
let wHeight = window.innerHeight;

window.addEventListener('resize', () => wHeight = window.innerHeight);

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        function( cb ){
            window.setTimeout(cb, 1000 / 60);
        };
})();

class Scroller {
    constructor() {
        this.latestKnownScrollY = 0;
        this.ticking = false; 
    }
    
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
        
        /* UNCOMMENT THESE IF YOU GO BACK TO HERO IMG AS A BG IMG
        let hdr = document.querySelector('.large-hero');
        let hdrStyles = window.getComputedStyle(hdr);
        let hdrBgImg = hdrStyles.getPropertyValue('background-image');
        blur.style.backgroundImage = hdrBgImg;
        */
        
        blur.style.backgroundImage = `url(${heroImageUrl})`;
        blur.style.backgroundPosition = '60% 100%';
        
    }

    onScroll() {

        if (blur.getBoundingClientRect().bottom > 150) {
            this.latestKnownScrollY = window.scrollY;
            this.requestTick();
        } else { return; }

    }

    requestTick() {
        if ( !this.ticking ) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    }

    update() {
        let currentScrollY = this.latestKnownScrollY;
        this.ticking = false;
      
        let slowScroll = currentScrollY / 2;
        let blurScroll = currentScrollY * 2;
        let opaScroll = 1.4 - currentScrollY / 400;
        
        /* needed to adjust the translate since the initial heading is xlated in css  */
        content.style.transform = `translate(-50%, ${slowScroll}px)`;
        content.style.opacity = opaScroll;
      
        blur.style.opacity = blurScroll / wHeight; 
    }
    
}

var scroller = new Scroller();  
scroller.init();


/***********  SERVICES ANIMATE IN ON SCROLL  ***********/
const servicesSects = document.querySelectorAll('.services__wrap');

document.addEventListener('scroll', (e) => {
    
    servicesSects.forEach((el, idx) => {
        if (el.getBoundingClientRect().top < (window.innerHeight / 1.2)) {
            el.classList.add('animate-in');
        }  
    });
});


/***********  TESTIMONIAL SLIDER  ***********/

var slider = tns({
    container: '.testimonial__flex',
    controlsContainer: document.querySelector('.customize-controls'),
    
    
    // added this to fix errs: 'Unable to preventDefault inside passive event listener invocation.'..now the new err is: [Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted. 
    preventScrollOnTouch: 'auto',
    
    autoHeight: true,
    items: 1,
    slideBy: 'page',
    center: true,
    mouseDrag: true,
    arrowKeys: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayButton: false,
    autoplayButtonOutput: false
    /*autoplayText: [
        "▶",
        "❚❚"
    ]*/
});


/**** REMOVE HERO TEXT ANIMATION AFTER ONE TIME*****/
let tests = document.querySelectorAll('[class*=quote]');

tests.forEach((el) => {
    el.addEventListener('animationend', function(e) {
        window.sessionStorage.setItem('quote', 'complete');
    });
});

tests.forEach((el) => {
    if (window.sessionStorage.getItem('quote')) {
        el.style.animation = 'none';
        el.style.opacity = '1';
    }
});

/********   BACK TO TOP BTN  *********/
let docElement = document.documentElement;
let docBody = document.body;
let bttBtn = document.querySelector('.js-btt-btn');

/*let heights = [docElement.scrollHeight, docBody.scrollHeight, docElement.offsetHeight, docBody.offsetHeight];
let highestHeight = Math.max(...heights);*/


let highestHeight = docElement.scrollHeight;

//changed from document to window - still not working on mobile
window.addEventListener('scroll', (e) => {
    //console.log(window.pageYOffset, docElement.scrollTop);
    
    //changed from docElement.scrollTop - trying to get it working on mobile
    (window.pageYOffset > (highestHeight / 8)) ? bttBtn.classList.add('active') : bttBtn.classList.remove('active');

});
/*

removed this: 

bttBtn.addEventListener('click', (e) => {
    //e.preventDefault();
    docElement.scrollTop = 0;
});

since it is now in the html:

<button class="js-btt-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">

*/


/*****  SUBSCRIBE INPUTS CHANGE ICON COLOR ON FOCUS  ******/
let inputs = document.querySelectorAll('form input, .subscribe__comment');

inputs.forEach((el) => el.addEventListener('focus', changeFocus));
inputs.forEach((el) => el.addEventListener('blur', changeBlur));

function changeFocus(e) {
    let prevSib = e.target.previousElementSibling;
    prevSib.classList.add('input-color');
}

function changeBlur(e) {
    let prevSib = e.target.previousElementSibling;
    prevSib.classList.remove('input-color');
}

/****************  STICKY HEADER   ****************/
let header = document.querySelector('.site-header');
let nav = document.querySelector('.navigation');
let hero = document.querySelector('.large-hero');

document.addEventListener('scroll', (e) => {
    if (hero.getBoundingClientRect().bottom <= 0) {
        document.body.style.paddingTop = nav.getBoundingClientRect().height + 'px';
        nav.classList.add('fixed');
    } else {
        document.body.style.paddingTop = 0;
        nav.classList.remove('fixed');
    }
});


/*********** HAMBURGER MENU  ***********/

let hamburgerMenu = document.querySelector('.hamburger-icon');

hamburgerMenu.addEventListener('click', function(e) {
    this.classList.toggle('interact');
    nav.classList.toggle('hamburger-on');
});


/****************  HIGHTLIGHT NAV ITEMS ON SCROLL   ****************/
let navs = document.querySelectorAll('.navigation__link:not(.navigation__link-home)');
let sects = document.querySelectorAll('section:not(:first-of-type):not(:last-of-type)');


document.addEventListener('scroll', (e) => {
    
    navs.forEach((el, idx) => {
        let sect = sects[idx].getBoundingClientRect();
        if (sect.top <= 150 && sect.bottom >= 150) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    })
});


/********  COPYRIGHT DATE *******/
let year = document.querySelector('.year');
year.textContent = new Date().getFullYear();


/**** code to keep svcs tables from visibly fading out on page load ***  */

window.addEventListener('load', (e) => {
    let svcsTable = document.querySelectorAll('.services__table-wrap');
            
    svcsTable.forEach((el, idx) => {
        el.classList.add('enabled');
    })
});


