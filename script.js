'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabbtn =document.querySelectorAll('.operations__tab');
const content =document.querySelectorAll('.operations__content');
const btncontainer=document.querySelector('.operations__tab-container');
const nav=document.querySelector('.nav');
const header=document.querySelector('.header')
// open and close model

const togglemodal =function(){
    modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
   btnsOpenModal.forEach(btr=> btr.addEventListener('click',togglemodal));

btnCloseModal.addEventListener('click', togglemodal);
overlay.addEventListener('click', togglemodal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    togglemodal();
  }
});

// Select the entire page
const entirePage = document.querySelector('.section');

//Manipulate the selected page
//SMOOTH scroll

//learnMOre button
const learnMoreBtn=document.querySelector('.btn--scroll-to');
const sectiontogo =document.querySelector('#section--1');
learnMoreBtn.addEventListener('click',function(){
       sectiontogo.scrollIntoView({behavior:'smooth'});
}) 
// nav button smooth scroll
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id =e.target.getAttribute('href');
    document.querySelector(`${id}`).scrollIntoView({behavior:'smooth'});
  }
})
/////////////////////////////////
////////////////////////////////
///////////////////////////////
//tabed component
///operations__content--active
btncontainer.addEventListener('click',function(e){
const clicked =e.target.closest('.operations__tab');
if(!clicked)return;

tabbtn.forEach(e=>e.classList.remove('operations__tab--active'));
content.forEach(e=>e.classList.remove('operations__content--active'));
//add active classs to the clicked opreattion

document.querySelector(`.operations__tab--${clicked.dataset.tab}`).classList.add('operations__tab--active');
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

////////////////////////
//////////////////////
///////////////////
//change the opicty


///////////////
const handerover= function(e){
  if (e.target.classList.contains('nav__link')){
    const link =e.target;
    const sibilng =link.closest('.nav__links').querySelectorAll('.nav__link');
    const logo =link.closest('.nav').querySelector('img');
    sibilng.forEach(el=>{
      if(el !==link ) el.style.opacity=this;
      logo.style.opacity=this;
    })
  }
}
/////////////
nav.addEventListener('mouseover',handerover.bind(0.5));
/////////////
nav.addEventListener('mouseout',handerover.bind(1));

//////////////
///stciky navation


let option={
  root :null,
  threshold:0.1,
   rootmargin :'90px'
}
const callback=function(entries){
  const [entry] = entries;
  

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');


}
const observer = new IntersectionObserver(callback,option)

///////////// when 10% from the header is on the viewport
observer.observe(header);


////////////////////
const hid =document.querySelectorAll('.section');
hid.forEach(el=>{el.classList.add('section--hidden');

});


/////////// using intersetion api
/// reveal element on scroll

let revealoption ={
  root:null,
  threshold:0.15,

}


const revealcallback =function(entire){
  const [entires] = entire;
  
  if(entires.isIntersecting){
    
    entires.target.classList.remove('section--hidden');
  }
 
  
  }

const revealElement =new IntersectionObserver(revealcallback,revealoption)

hid.forEach(el=>{
  
  revealElement.observe(el);
})
/////////////////////

// Lazy loading images
const targetimg=document.querySelectorAll('img[data-src]');

const lazycallback=function(entires,observer){
const [entry] =entires;

if (!entry.isIntersecting) return;
{

entry.target.src=entry.target.getAttribute('data-src');

entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img')
});

 observer.unobserver(entry.target);

}
}

let lazyopthion ={
  root:null,
  threshold:0
}

const imgobserver= new IntersectionObserver(lazycallback,lazyopthion)

targetimg.forEach(e=>imgobserver.observe(e))
//lazy loading img end
///////////////////
//events 
////////////////////

document.addEventListener('DOMContentLoaded',function(e){
  console.log('event is loaded');
 
})

window.addEventListener('beforeunload',function(e){
  e.preventDefault();
  e.returnValue='';

});
///////// slider 
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
