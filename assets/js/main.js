/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== TYPING EFFECT ====================*/
const words = ['Designer','mentor','Artist'];
const typingContainer = document.querySelector('.typing-container');
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;

function type() {
  if (isDeleting) {
    currentWord = words[wordIndex].substring(0, currentWord.length - 1);
  } else {
    currentWord = words[wordIndex].substring(0, letterIndex + 1);
  }
  typingContainer.textContent = currentWord;
  letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

  if (!isDeleting && currentWord === words[wordIndex]) {
    // Word is complete, pause before starting to delete
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && currentWord === '') {
    // Word is deleted, move to the next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  let typingSpeed = 200 - Math.random() * 100; // Speed up typing
  if (isDeleting) typingSpeed /= 2; // Speed up deleting

  setTimeout(type, typingSpeed);
}

// Start typing effect
type();
/*==================== WORK SLIDESHOW ====================*/
// Array of image sources
const images = [
    'assets/img/workf.png',
    'assets/img/worke.png',
    'assets/img/workd.png',
    // Add more image paths as needed
  ];
  
  // The index of the current image
  let currentIndex = 0;
  
  // Function to cycle to the next image
  function nextImage() {
    const imgElement = document.querySelector('.skills__img');
    
    // Fade out the current image
    imgElement.style.opacity = 0;
  
    // Wait for the fade-out transition to finish before changing the image source
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
  
      // Fade in the new image
      imgElement.style.opacity = 1;
    }, 1500); // This timeout duration should match the CSS transition duration
  }
  
  // Set the interval for changing images (e.g., 3000ms = 3 seconds)
  setInterval(nextImage, 5000);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

// Update theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation class
    themeToggle.classList.add('theme-toggle--active');
    setTimeout(() => {
        themeToggle.classList.remove('theme-toggle--active');
    }, 300);
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
});

themeToggle.addEventListener('click', toggleTheme);

// Wave Animation
class WaterRipple {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.lastMouse = { x: 0, y: 0 };
        this.mouseForce = 0;
        this.ripples = [];
        this.autoRippleTimer = null;
        this.maxRipples = 3;  // Limit maximum ripples
        this.rippleInterval = 5000;  // Slower interval (5 seconds)
        this.rippleSpeed = 2;  // Slower ripple speed
        
        this.init();
    }

    init() {
        this.resize();
        this.setupEventListeners();
        this.startAutoRipples();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = this.canvas.offsetWidth;
        this.height = this.canvas.height = this.canvas.offsetHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const force = Math.sqrt(
                Math.pow(x - this.lastMouse.x, 2) +
                Math.pow(y - this.lastMouse.y, 2)
            ) * 0.1;
            
            if (force > 1) {
                this.addRipple(x, y, force * 2);
            }
            
            this.lastMouse = { x, y };
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.addRipple(x, y, 25);
        });
    }

    startAutoRipples() {
        this.autoRippleTimer = setInterval(() => {
            // Only add new ripple if we're under the limit
            if (this.ripples.length < this.maxRipples) {
                const x = Math.random() * this.width;
                const y = Math.random() * this.height;
                const size = 5 + Math.random() * 10;
                this.addRipple(x, y, size);
            }
        }, this.rippleInterval);
    }

    addRipple(x, y, size) {
        // Only add if we're under the limit
        if (this.ripples.length < this.maxRipples) {
            this.ripples.push({
                x,
                y,
                size,
                opacity: 1,
                maxRadius: size * 15,  // Larger max radius
                radius: 0,
                speed: this.rippleSpeed
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw water background
        this.ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-color');
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update and draw ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const ripple = this.ripples[i];
            
            ripple.radius += ripple.speed;
            ripple.opacity -= 0.005;  // Slower fade out
            
            if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
                this.ripples.splice(i, 1);
                continue;
            }

            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${this.getRippleColor()}, ${ripple.opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }

    getRippleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '255, 255, 255' : '26, 26, 26';
    }
}

// Remove the old WaveAnimation initialization and only use WaterRipple
document.addEventListener('DOMContentLoaded', () => {
    new WaterRipple();
});
