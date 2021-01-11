function carousel() {
  var clickArea = document.querySelectorAll('.carousel');
  var dots = document.querySelectorAll('.dots');
  for(i=0; i< clickArea.length; i++) {
    var messages = clickArea[i].querySelectorAll('img');
    var arr = [];
    for(j=0; j<messages.length; j++) {
      arr.push('<div class="dot"></div>');
    }
    dots[i].innerHTML = arr.join('');
    messages[0].classList.add('display');
    var firstdot = dots[i].querySelectorAll('.dot');
    firstdot[0].classList.add('display');
    clickArea[i].addEventListener('click', function(){
        console.log('click', i);
        var onDisplay = this.querySelector('img.display');
        var next = this.querySelector('.display + img')
        var dotsWrapper = this.nextElementSibling;
        console.log(dotsWrapper);
        var dotDisplay = dotsWrapper.querySelector('.dot.display');
        var nextDot =  dotsWrapper.querySelector('.display + .dot');
        if(next && next != null) {
          onDisplay.classList.remove('display');
          next.classList.add('display');
          dotDisplay.classList.remove('display');
          nextDot.classList.add('display');
        }else {
          onDisplay.classList.remove('display');
          dotDisplay.classList.remove('display');
          var firstImage = this.querySelectorAll('img');
          firstImage[0].classList.add('display');
          var firstDotty = dotsWrapper.querySelectorAll('.dot');
          firstDotty[0].classList.add('display');
        }
    });
  }
}carousel();

function lazy(){
  console.log('running');
  var lazy = document.querySelectorAll('.lazy');
  var screenHeight = window.innerHeight / 1.5;
  console.log(lazy);
  document.addEventListener('scroll', function(){
    for(i=0; i<lazy.length; i++){
      if(lazy[i].classList.contains('image')){
        var position = lazy[i].getBoundingClientRect();
        var src = lazy[i].dataset.src;
        if(position.top <= screenHeight && position.top >= -screenHeight) {
          if(!lazy[i].classList.contains('inview')){
            lazy[i].setAttribute('src', src);
          }
          lazy[i].classList.add('inview');
        }
      } else if(lazy[i].classList.contains('video')) {
        var position = lazy[i].getBoundingClientRect();
        var source = lazy[i].querySelector('source');
        var src = source.dataset.src;
        if(position.top <= screenHeight && position.top >= -screenHeight) {
          if(!lazy[i].classList.contains('inview')){
            source.setAttribute('src', src);
            lazy[i].load();
          }
          lazy[i].play();
          lazy[i].classList.add('inview');
        } else {
          console.log('else');
          lazy[i].pause();
        }
      }
    }
  })
}lazy();

function about() {
  var about = document.querySelector('.about-menu');
  var me = document.querySelector('.about-me');
  about.addEventListener('click', function(){
    me.classList.toggle('clicked');
  })
}about();

anime({
  targets: '.name path',
  translateY: -60,
  rotate: '0deg',
  delay: anime.stagger(100), // increase delay by 100ms for each elements.
});


function letters(){
  var name = document.querySelector('.name');
  var letters = name.querySelectorAll('path');

  function animation(i){
    console.log('running');
    anime.remove(letters[i]);
    console.log(i);
    console.log(letters[i]);
    anime({
        targets: letters[i],
        keyframes: [
          {translateY: -90},
          {translateY: -60}
        ],
        duration: 1000,
        loop: false
    });
    console.log('running2');
  }

  function bounce(i) {
    console.log('bounce');
    animation(i);
  }

  console.log(letters);
  for(i=0; i<letters.length; i++) {
    letters[i].addEventListener('mouseover',  bounce.bind(null, i), false)
  }
}letters();

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100
}
const
	// parent = document.querySelector('.outerHeight'),
	els = document.querySelectorAll('.scrollme'),
	tl = anime.timeline({ autoplay: false })

_.map(els, el => {
	anime.set(el, {
		top: anime.random(0, 150) + 'vh',
		left: anime.random(0, 100) + 'vw'
	})
	tl.add({
		targets: el,
		translateY: -500,
		duration: anime.random(500, 5000), easing: 'easeInOutCirc',
	}, 0)
})

// new AnimePlayer({ add: tl })

window.addEventListener('scroll', () => {
	const persentage = getScrollPercent()
	tl.seek(tl.duration * (persentage * 0.1))
})
