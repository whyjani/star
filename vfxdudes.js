gsap.registerPlugin(ScrollTrigger);



const lenis = new Lenis({
  // Valeur entre 0 et 1
  // Valeur par défaut : 0,1
  // Plus la valeur est faible, plus le scroll sera fluide
  lerp: 0.05, 
  // Valeur par défaut : 1
  // Plus la valeur est haute, plus le défilement sera rapide 
  wheelMultiplier: 1, 
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);




let homeHero = gsap.timeline();

homeHero.from(
  ".home-hero-heading-1-wrap h1",
  {
    y: "100%",
    duration: 2,
    ease: "expo.inOut",
  },
  "homeHero"
),
  homeHero.from(
    ".home-hero-heading-2-wrap h1",
    {
      y: "100%",
      duration: 2.1,
      ease: "expo.inOut",
    },
    "homeHero"
  ),
  homeHero.from(
    ".home-hero-heading-3-wrap h1",
    {
      y: "100%",
      duration: 2.2,
      ease: "expo.inOut",
    },
    "homeHero"
  );
  
  homeHero.to(
    ".home-hero-heading-2-img",
    {
      width:"clamp(19rem,60vw,38.5rem)",
      duration: 5,
      ease: "expo.inOut",
    },
    "homeHero"
  );
  
  homeHero.to(
    ".home-hero-heading-1-img",
    {
    width:"clamp(19rem,60vw,50rem)",
    duration: 5,
    ease: "expo.inOut",
  },
  "homeHero"
);

homeHero.to(
  ".home-hero-heading-3-img",
  {
    width:"clamp(19rem,60vw,34rem)",
    duration: 5,
    ease: "expo.inOut",
  },
  "homeHero"
);

gsap.to(".home-ab-svg img", {
  rotate: 800,
  duration: 4,
  scrollTrigger: {
    trigger: ".home-ab-svg img",
    start: "-200% center",
    end: "7000% bottom",
    scrub: true,
    // markers:true
  },
});

gsap.set(".home-wwd-txt p", {
  x: "-200%",
});

gsap.to(".home-wwd-txt p", {
  x: "200%",
  scrollTrigger: {
    trigger: ".home-wwd-wrap",
    start: "top top",
    end: "500% bottom",
    scrub: true,
    // markers:true,
    pin: true,
  },
});

gsap.registerPlugin(ScrollTrigger);

let wheel = document.querySelector('.wheel__wrapper'),
    numLines = 11,
    radius = numLines * 30,
    angle = -180 / numLines,
    origin = `50% 50% -${radius}px`;

gsap.set(wheel, {
    transformOrigin: "50% 50%",
});
gsap.set(wheel.querySelectorAll('.wheel__text-item'), {
    z: radius,
    rotationX: index => angle * index,
    transformOrigin: origin,
});
gsap.to(wheel, {
    rotationX: 160,
    ease: "none",
    transformOrigin: "50% 50%",
    scrollTrigger: {
        trigger: '.wheel__container',
        start: "top top",
        end: `top+=${window.innerHeight * 3} bottom`,
        // markers: true,
        scrub: true,
        pin: true,
        snap: {
            snapTo: 1 / 11,
            duration: 0.5
        }
    }
});

const soundEffect = new Audio('Assets/SOUND/SCROLL SOUND.mp3');
const isSoundPlayingMap = new Map();

document.addEventListener("scroll", () => {
    let items = document.querySelectorAll('.wheel__text-item');
    let wheel = document.querySelector('.wheel__wrapper');

    items.forEach(item => {
        let rect = item.getBoundingClientRect();
        let centerX = wheel.offsetWidth / 2;
        let centerY = wheel.offsetHeight / 2;

        if (rect.left <= centerX && rect.right >= centerX && rect.top <= centerY && rect.bottom >= centerY) {
            item.classList.add('green');
            if (!isSoundPlayingMap.has(item)) {
                isSoundPlayingMap.set(item, true);
                playSoundEffect();
            }
        } else {
            item.classList.remove('green');
            isSoundPlayingMap.delete(item);
        }
    });
});

function playSoundEffect() {
    soundEffect.currentTime = 0;
    soundEffect.play();
}
