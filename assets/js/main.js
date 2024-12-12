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
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initialize particle portrait
    const initParticlePortrait = () => {
        const particleCanvas = document.getElementById('particleCanvas');
        if (particleCanvas) {
            new ParticlePortrait();
        }
    };
    
    setTimeout(initParticlePortrait, 500);
});

themeToggle.addEventListener('click', toggleTheme);

class ParticlePortrait {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isHovering = false;
        this.image = new Image();
        this.image.src = 'assets/img/crypto_me.png';
        
        this.particleSize = 3;
        this.particleSpacing = 4;
        this.particleCount = 0;
        this.maxSpeed = 4;
        this.returnSpeed = 0.1;
        this.mouseRadius = 100;
        this.mouseForce = 0.2;
        
        this.setupCanvas();
        this.setupEventListeners();
        this.image.onload = () => this.init();
    }

    setupCanvas() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx.imageSmoothingEnabled = true;
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.isHovering = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isHovering = false;
        });
    }

    init() {
        // Draw image to get pixel data
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        // Create particles
        for (let y = 0; y < this.canvas.height; y += this.particleSpacing) {
            for (let x = 0; x < this.canvas.width; x += this.particleSpacing) {
                const i = (y * this.canvas.width + x) * 4;
                const alpha = data[i + 3];
                
                if (alpha > 128) {  // Only create particles for non-transparent pixels
                    this.particles.push({
                        x: x,
                        y: y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        color: `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${alpha / 255})`
                    });
                }
            }
        }
        
        this.animate();
    }

    update() {
        this.particles.forEach(p => {
            if (this.isHovering) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouseRadius) {
                    const force = (this.mouseRadius - distance) / this.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    const repelX = Math.cos(angle) * force * this.mouseForce;
                    const repelY = Math.sin(angle) * force * this.mouseForce;
                    p.vx -= repelX * this.maxSpeed;
                    p.vy -= repelY * this.maxSpeed;
                }
            }
            
            // Return to original position
            const dx = p.originX - p.x;
            const dy = p.originY - p.y;
            p.vx += dx * this.returnSpeed;
            p.vy += dy * this.returnSpeed;
            
            // Apply velocity with damping
            p.vx *= 0.95;
            p.vy *= 0.95;
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, this.particleSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }
}

class RippleEffect {
    constructor() {
        this.canvas = document.getElementById('rippleCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 270;
        
        this.ripples = [];
        this.maxRipples = 5;  // Keep at 3 ripples
        this.lastRippleTime = 0;
        this.rippleInterval = 2000;  // Faster auto ripples (2 seconds)
        this.mouseRadius = 150;  // Larger area of mouse influence
        this.mouseForce = 5;  // Stronger mouse force
        
        this.bindEvents();
        this.animate();
        this.createAutoRipple();
    }
    
    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create larger ripples on mouse move
            if (Math.random() < 1) {  // 40% chance to create ripple on movement
                this.createRipple(x, y, 4 + Math.random() * 2);  // Larger, faster ripples
            }
        });
        
        // Add click handler for big ripples
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create multiple ripples on click
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    this.createRipple(x, y, 6 - i);  // Decreasing size for each subsequent ripple
                }, i * 100);  // Stagger the ripples
            }
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
        });
    }
    
    createRipple(x, y, velocity = 2) {
        if (this.ripples.length >= this.maxRipples) return;
        
        this.ripples.push({
            x,
            y,
            radius: 0,
            maxRadius: this.canvas.width * 0.5,  // Larger maximum radius
            velocity,
            opacity: 0.8,  // Higher starting opacity
            color: this.getRippleColor()
        });
    }
    
    createAutoRipple() {
        setInterval(() => {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.createRipple(x, y, 2);  // Faster auto ripples
        }, this.rippleInterval);
    }
    
    getRippleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    }
    
    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ripples.forEach((ripple, index) => {
            ripple.radius += ripple.velocity;
            ripple.opacity -= 0.0005;  // Much slower fade out
            
            if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
                this.ripples.splice(index, 1);
                return;
            }
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${ripple.color}, ${ripple.opacity})`;
            this.ctx.lineWidth = 2.5;  // Slightly thicker lines
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize only once when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const rippleCanvas = document.getElementById('rippleCanvas');
    if (rippleCanvas) {
        new RippleEffect();
    }
});
