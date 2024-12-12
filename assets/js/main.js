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
    
    // Initialize water ripple
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        new WaterRipple();
    }
});

themeToggle.addEventListener('click', toggleTheme);

// Wave Animation
class WaterRipple {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Force initial size with requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.width = this.canvas.offsetWidth || this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight || 270; // Default height if not set
            
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });
        
        this.lastMouse = { x: 0, y: 0 };
        this.mouseForce = 1;
        this.ripples = [];
        this.autoRippleTimer = null;
        this.maxRipples = 4;
        this.rippleInterval = 3000;
        this.rippleSpeed = 2.5;
        this.mouseForceMultiplier = 2;
        this.rippleDecay = 0.0015;
        this.rippleLineWidth = 2;
        
        this.init();
        
        // Handle window resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight || 270;
                this.width = this.canvas.width;
                this.height = this.canvas.height;
            }, 250);
        });
    }

    getRippleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    }

    addRipple(x, y, size = 25) {
        if (this.ripples.length < this.maxRipples) {
            this.ripples.push({
                x,
                y,
                size,
                opacity: 0.8,  // Start with higher opacity
                radius: 0,
                maxRadius: size * 30,
                speed: this.rippleSpeed,
                timestamp: Date.now()
            });
        }
    }

    startAutoRipples() {
        if (this.autoRippleTimer) clearInterval(this.autoRippleTimer);
        
        this.autoRippleTimer = setInterval(() => {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            this.addRipple(x, y, 15 + Math.random() * 15);
        }, this.rippleInterval);
    }

    animate = () => {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const ripple = this.ripples[i];
            
            ripple.radius += ripple.speed;
            ripple.opacity -= this.rippleDecay;
            
            if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
                this.ripples.splice(i, 1);
                continue;
            }
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${this.getRippleColor()}, ${ripple.opacity})`;
            this.ctx.lineWidth = this.rippleLineWidth;
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize ripple effect after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure canvas is properly sized
    setTimeout(() => {
        const canvas = document.getElementById('waveCanvas');
        if (canvas) {
            new WaterRipple();
        }
    }, 100);
});

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

// Initialize particle portrait after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        new WaterRipple();
    }
    
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        new ParticlePortrait();
    }
});
