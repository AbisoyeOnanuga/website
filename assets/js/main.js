/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

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
        const particleCanvas = document.getElementById('particle-canvas');
        if (particleCanvas) {
            new ParticlePortrait();
        }
    };
    
    setTimeout(initParticlePortrait, 500);
});

themeToggle.addEventListener('click', toggleTheme);

class ParticlePortrait {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isHovering = false;
        this.image = new Image();
        this.image.src = 'assets/img/crypto_me.png';
        
        this.particleSize = 4;
        this.particleSpacing = 6;
        this.particleCount = 0;
        this.maxSpeed = 4;
        this.returnSpeed = 0.1;
        this.mouseRadius = 100;
        this.mouseForce = 0.3;
        
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
        this.canvas = document.getElementById('ripple-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 270;
        
        this.ripples = [];
        this.baseVelocity = 1.5;
        this.maxRipples = 25;
        this.rippleInterval = 3000;
        this.rippleGap = 20;
        this.concentricCount = 3;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseMoveThreshold = 8;
        this.lastRippleTime = 0;
        this.rippleCreationInterval = 50;
        this.lastClickTime = 0;
        this.clickCooldown = 100;
        
        this.autoRippleTimer = null;

        this.bindEvents();
        this.animate();
        this.startAutoRipples();
    }
    
    startAutoRipples() {
        // Clear any existing interval
        if (this.autoRippleTimer) {
            clearInterval(this.autoRippleTimer);
        }

        // Create initial ripple
        this.createAutoRipple();

        // Set up interval for continuous ripples
        this.autoRippleTimer = setInterval(() => {
            this.createAutoRipple();
        }, this.rippleInterval);
    }

    createAutoRipple() {
        const padding = 100; // Keep ripples away from edges
        const x = padding + Math.random() * (this.canvas.width - 2 * padding);
        const y = padding + Math.random() * (this.canvas.height - 2 * padding);
        
        // Create ripple with random size variation
        const velocityVariation = 0.5 + Math.random() * 0.5;
        this.createRipple(x, y, this.baseVelocity * velocityVariation);

        // Occasionally create a cluster of ripples
        if (Math.random() < 0.3) {  // 30% chance
            setTimeout(() => {
                const closeX = x + (Math.random() - 0.5) * 50;
                const closeY = y + (Math.random() - 0.5) * 50;
                this.createRipple(closeX, closeY, this.baseVelocity * velocityVariation);
            }, 100);
        }
    }

    bindEvents() {
        let lastRippleX = 0;
        let lastRippleY = 0;
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            const dx = currentX - this.lastMouseX;
            const dy = currentY - this.lastMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const currentTime = Date.now();
            
            // Create ripples along the mouse path
            if (distance > this.mouseMoveThreshold && 
                currentTime - this.lastRippleTime > this.rippleCreationInterval) {
                
                // Calculate position between last and current position
                const rippleX = this.lastMouseX + (dx * 0.5);
                const rippleY = this.lastMouseY + (dy * 0.5);
                
                // Calculate distance from last ripple
                const rippleDx = rippleX - lastRippleX;
                const rippleDy = rippleY - lastRippleY;
                const rippleDistance = Math.sqrt(rippleDx * rippleDx + rippleDy * rippleDy);
                
                // Only create new ripple if far enough from last ripple
                if (rippleDistance > this.mouseMoveThreshold * 2) {
                    const speed = Math.min(distance / 30, 1.5);  // Reduced speed scaling
                    this.createRipple(rippleX, rippleY, this.baseVelocity + speed * 0.3);
                    
                    lastRippleX = rippleX;
                    lastRippleY = rippleY;
                    this.lastRippleTime = currentTime;
                }
            }
            
            this.lastMouseX = currentX;
            this.lastMouseY = currentY;
        });
        
        this.canvas.addEventListener('click', (e) => {
            const currentTime = Date.now();
            if (currentTime - this.lastClickTime < this.clickCooldown) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.createRipple(x, y, this.baseVelocity * 1.5);  // Gentler click ripples
            this.lastClickTime = currentTime;
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
        });
    }
    
    createRipple(x, y, velocity = 1.5) {
        if (this.ripples.length >= this.maxRipples) {
            this.ripples.splice(0, this.concentricCount);
        }
        
        for (let i = 0; i < this.concentricCount; i++) {
            const randomGap = this.rippleGap * (0.95 + Math.random() * 0.1);
            this.ripples.push({
                x,
                y,
                radius: i * randomGap,
                maxRadius: this.canvas.width * 0.25,
                velocity: velocity * (1 - i * 0.2),
                opacity: 0.85 - (i * 0.15),
                color: this.getRippleColor()
            });
        }
    }
    
    getRippleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    }
    
    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const rippleGroups = {};
        this.ripples.forEach((ripple, index) => {
            const key = `${ripple.x},${ripple.y}`;
            if (!rippleGroups[key]) rippleGroups[key] = [];
            rippleGroups[key].push(ripple);
        });
        
        Object.values(rippleGroups).forEach(group => {
            group.forEach((ripple, index) => {
                ripple.radius += ripple.velocity;
                ripple.opacity -= 0.0008;  // Slower fade out
                
                if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
                    this.ripples = this.ripples.filter(r => r !== ripple);
                    return;
                }
                
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(${ripple.color}, ${ripple.opacity})`;
                this.ctx.lineWidth = 1.5;  // Thinner lines for more delicate look
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.stroke();
            });
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize only once when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const rippleCanvas = document.getElementById('ripple-canvas');
    if (rippleCanvas) {
        const rippleEffect = new RippleEffect();
    }
});

// Remove the FlowingGradient class and its initialization

class AWaves extends HTMLElement {
    connectedCallback() {
        this.svg = this.querySelector('.js-svg');
        
        this.mouse = {
            x: -10,
            y: 0,
            lx: 0,
            ly: 0,
            sx: 0,
            sy: 0,
            v: 0,
            vs: 0,
            a: 0,
            set: false,
        };

        this.lines = [];
        this.paths = [];
        this.noise = new Noise(Math.random());

        this.setSize();
        this.setLines();
        this.bindEvents();
        
        requestAnimationFrame(this.tick.bind(this));
    }

    bindEvents() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.addEventListener('touchmove', this.onTouchMove.bind(this));
    }

    onResize() {
        this.setSize();
        this.setLines();
    }

    onMouseMove(e) {
        this.updateMousePosition(e.pageX, e.pageY);
    }

    onTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.updateMousePosition(touch.clientX, touch.clientY);
    }

    updateMousePosition(x, y) {
        this.mouse.x = x - this.bounding.left;
        this.mouse.y = y - this.bounding.top + window.scrollY;

        if (!this.mouse.set) {
            this.mouse.sx = this.mouse.x;
            this.mouse.sy = this.mouse.y;
            this.mouse.lx = this.mouse.x;
            this.mouse.ly = this.mouse.y;
            this.mouse.set = true;
        }
    }

    setSize() {
        this.bounding = this.getBoundingClientRect();
        this.svg.style.width = `${this.bounding.width}px`;
        this.svg.style.height = `${this.bounding.height}px`;
    }

    setLines() {
        this.lines = [];
        this.paths.forEach(path => path.remove());
        this.paths = [];

        // Changed to create horizontal lines
        const yGap = 15;  // Reduced gap between lines
        const xGap = 10;  // Point spacing along each line
        const oHeight = this.bounding.height + 30;
        const oWidth = this.bounding.width + 200;
        
        const totalLines = Math.ceil(oHeight / yGap);  // Number of horizontal lines
        const totalPoints = Math.ceil(oWidth / xGap);  // Points per line
        
        const yStart = (this.bounding.height - yGap * totalLines) / 2;
        const xStart = -100;  // Start off-screen for smooth entry/exit

        for (let i = 0; i <= totalLines; i++) {
            const points = [];
            const y = yStart + yGap * i;
            
            for (let j = 0; j <= totalPoints; j++) {
                points.push({
                    x: xStart + xGap * j,
                    y: y,
                    baseY: y,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                });
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.classList.add('a__line');
            this.svg.appendChild(path);
            this.paths.push(path);
            this.lines.push(points);
        }
    }

    movePoints(time) {
        const scrollY = window.scrollY;
        const scrollSpeed = (scrollY - (this.lastScrollY || scrollY)) * 0.1;
        this.lastScrollY = scrollY;

        this.lines.forEach(points => {
            points.forEach(p => {
                // Increased frequency and amplitude of waves
                const move = this.noise.perlin2(
                    (p.x + time * 0.02) * 0.006,  // Increased frequency
                    (p.y + time * 0.01) * 0.003
                ) * 15;  // Increased amplitude
                
                p.wave.y = Math.sin(move) * 20;  // Increased wave height
                
                // Add scroll influence
                p.wave.y += scrollSpeed * 5;

                const dx = p.x - this.mouse.sx;
                const dy = p.y - this.mouse.sy;
                const d = Math.hypot(dx, dy);
                const l = Math.max(175, this.mouse.vs);

                if (d < l) {
                    const s = 1 - d / l;
                    const f = Math.cos(d * 0.001) * s;
                    p.cursor.vx += Math.cos(this.mouse.a) * f * l * this.mouse.vs * 0.00065;
                    p.cursor.vy += Math.sin(this.mouse.a) * f * l * this.mouse.vs * 0.001;  // Increased vertical response
                }

                // Stronger spring effect
                p.cursor.vx += (0 - p.cursor.x) * 0.01;
                p.cursor.vy += (0 - p.cursor.y) * 0.01;
                
                // Less damping for more movement
                p.cursor.vx *= 0.95;
                p.cursor.vy *= 0.95;
                
                // Increased movement range
                p.cursor.x += p.cursor.vx * 2.5;
                p.cursor.y += p.cursor.vy * 2.5;
                
                // Increased movement limits
                p.cursor.x = Math.min(150, Math.max(-150, p.cursor.x));
                p.cursor.y = Math.min(150, Math.max(-150, p.cursor.y));
            });
        });
    }

    moved(point, withCursorForce = true) {
        return {
            x: Math.round((point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0)) * 10) / 10,
            y: Math.round((point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)) * 10) / 10,
        };
    }

    drawLines() {
        this.lines.forEach((points, i) => {
            let p1 = this.moved(points[0], false);
            let d = `M ${p1.x} ${p1.y}`;

            points.forEach((p1, j) => {
                const isLast = j === points.length - 1;
                p1 = this.moved(p1, !isLast);
                d += `L ${p1.x} ${p1.y}`;
            });

            this.paths[i].setAttribute('d', d);
        });
    }

    tick(time) {
        const { mouse } = this;
        mouse.sx += (mouse.x - mouse.sx) * 0.1;
        mouse.sy += (mouse.y - mouse.sy) * 0.1;

        const dx = mouse.x - mouse.lx;
        const dy = mouse.y - mouse.ly;
        const d = Math.hypot(dx, dy);

        mouse.v = d;
        mouse.vs += (d - mouse.vs) * 0.1;
        mouse.vs = Math.min(100, mouse.vs);

        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.a = Math.atan2(dy, dx);

        this.movePoints(time);
        this.drawLines();
        
        requestAnimationFrame(this.tick.bind(this));
    }
}

// Simple Perlin noise implementation
class Noise {
    constructor(seed) {
        this.seed = seed;
    }

    perlin2(x, y) {
        // More complex noise pattern for more interesting waves
        return (Math.sin(x * this.seed + Math.cos(y * 0.5)) * 
                Math.cos(y * this.seed + Math.sin(x * 0.5))) * 0.5;
    }
}

customElements.define('a-waves', AWaves);

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Create or get mask element
    let themeMask = document.querySelector('.theme-mask');
    if (!themeMask) {
        themeMask = document.createElement('div');
        themeMask.className = 'theme-mask';
        document.body.appendChild(themeMask);
    }

    // Set initial position
    const startPos = currentTheme === 'light' ? '0' : '-100%';
    const endPos = currentTheme === 'light' ? '-100%' : '0';
    
    // Reset mask position
    themeMask.style.transform = `translateY(${startPos})`;
    
    // Animate mask
    themeMask.style.transition = 'transform 1s cubic-bezier(0.7, 0, 0.3, 1)';
    themeMask.style.transform = `translateY(${endPos})`;

    // Change theme when animation completes
    setTimeout(() => {
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Reset mask
        themeMask.style.transition = 'none';
        themeMask.style.transform = '';
    }, 1000);
}

// Make sure the theme toggle button is connected
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Menu toggle functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const overlay = document.querySelector('.nav-overlay');

function toggleMenu() {
    navMenu.classList.toggle('show');
    document.body.classList.toggle('nav-open');
    
    // Toggle menu icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('show')) {
        icon.classList.replace('bx-menu', 'bx-x');
    } else {
        icon.classList.replace('bx-x', 'bx-menu');
    }
}

// Initialize menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu on button click
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.classList.remove('nav-open');
            navToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });
});