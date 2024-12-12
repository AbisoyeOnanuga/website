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
        this.mouseForce = 1;
        this.ripples = [];
        this.autoRippleTimer = null;
        this.maxRipples = 5;
        this.rippleInterval = 5000;
        this.rippleSpeed = 1.5;
        this.rippleSpacing = 400;
        this.mouseForceMultiplier = 1.5;
        this.rippleDecay = 0.003;
        this.rippleLineWidth = 1;
        this.padding = 50;
        
        this.init();
    }

    init() {
        this.resize();
        this.setupEventListeners();
        this.startAutoRipples();
        this.animate();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = this.canvas.width = rect.width;
        this.height = this.canvas.height = rect.height;
        this.boundaryX = [-this.padding, this.width + this.padding];
        this.boundaryY = [-this.padding, this.height + this.padding];
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const dx = x - this.lastMouse.x;
            const dy = y - this.lastMouse.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            
            if (speed > 1) {
                const force = Math.min(speed * this.mouseForceMultiplier, 30);
                this.addRipple(x, y, force);
                
                // Add smaller trailing ripples
                if (speed > 5) {
                    for (let i = 1; i <= 2; i++) {
                        const trailX = this.lastMouse.x + (dx * (i / 3));
                        const trailY = this.lastMouse.y + (dy * (i / 3));
                        this.addRipple(trailX, trailY, force * 0.5);
                    }
                }
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
            if (this.ripples.length < this.maxRipples) {
                const x = Math.random() * this.width;
                const y = Math.random() * this.height;
                const size = 8 + Math.random() * 12;  // Larger random ripples
                this.addRipple(x, y, size);
            }
        }, this.rippleInterval);
    }

    addRipple(x, y, size) {
        // Ensure ripple is within boundaries
        x = Math.max(this.padding, Math.min(x, this.width - this.padding));
        y = Math.max(this.padding, Math.min(y, this.height - this.padding));

        const isTooClose = this.ripples.some(ripple => {
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.rippleSpacing;
        });

        if (!isTooClose && this.ripples.length < this.maxRipples) {
            const baseSize = size * 0.8;
            for (let i = 0; i < 3; i++) {
                this.ripples.push({
                    x,
                    y,
                    size: baseSize * (1 - i * 0.2),
                    opacity: 1,
                    maxRadius: baseSize * 25,
                    radius: i * 8,
                    speed: this.rippleSpeed * (1 - i * 0.15),
                    timestamp: Date.now()
                });
            }
        }
    }

    animate() {
        const now = Date.now();
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw water background with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, this.getBackgroundColor(0.98));
        gradient.addColorStop(1, this.getBackgroundColor(1));
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update and draw ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const ripple = this.ripples[i];
            const age = (now - ripple.timestamp) / 1000;
            
            ripple.radius += ripple.speed;
            ripple.opacity -= this.rippleDecay;
            
            // Remove ripples that are too old or too big
            if (ripple.opacity <= 0 || 
                ripple.radius >= ripple.maxRadius || 
                age > 5) {
                this.ripples.splice(i, 1);
                continue;
            }

            // Draw ripple with improved gradient
            const gradient = this.ctx.createRadialGradient(
                ripple.x, ripple.y, ripple.radius - this.rippleLineWidth,
                ripple.x, ripple.y, ripple.radius + this.rippleLineWidth
            );
            
            const color = this.getRippleColor();
            const opacity = ripple.opacity * Math.min(1, (ripple.maxRadius - ripple.radius) / 100);
            gradient.addColorStop(0, `rgba(${color}, 0)`);
            gradient.addColorStop(0.5, `rgba(${color}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${color}, 0)`);

            this.ctx.beginPath();
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = this.rippleLineWidth;
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }

    getBackgroundColor(alpha = 1) {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'dark' ? '10, 10, 10' : '250, 250, 250';
        return `rgba(${color}, ${alpha})`;
    }

    getRippleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '255, 255, 255' : '40, 40, 40';
    }
}

// Add this new class for the blob animation
class BlobAnimation {
    constructor() {
        this.paths = document.querySelectorAll('.blob-path, .blob-outline');
        this.numPoints = 24;  // Increased points for smoother edges
        this.centerX = 250;
        this.centerY = 250;
        this.minRadius = 180;
        this.maxRadius = 200;
        this.minSpeed = 0.0003;
        this.maxSpeed = 0.0006;
        this.points = [];
        this.time = 0;
        this.mouse = { x: this.centerX, y: this.centerY };
        this.mouseInfluence = 0.15;
        this.tension = 0.3;  // Controls curve smoothness
        this.dampening = 0.92;  // Prevents over-distortion
        this.velocities = [];  // Add velocity for fluid motion
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        for (let i = 0; i < this.numPoints; i++) {
            const angle = (i / this.numPoints) * Math.PI * 2;
            const radius = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
            const speed = this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
            
            this.points.push({
                angle,
                radius,
                speed,
                x: 0,
                y: 0,
                originalRadius: radius,
                targetRadius: radius
            });
            
            this.velocities.push({ x: 0, y: 0 });
        }

        this.animate();
    }

    setupEventListeners() {
        const container = document.querySelector('.portrait-container');
        let isMouseOver = false;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 500;
            const y = ((e.clientY - rect.top) / rect.height) * 500;
            this.mouse = { x, y };
            isMouseOver = true;
        });

        container.addEventListener('mouseleave', () => {
            isMouseOver = false;
            // Smoothly return to original shape
            this.points.forEach(point => {
                point.targetRadius = point.originalRadius;
            });
        });
    }

    updatePoints() {
        this.time += 0.001;
        
        this.points.forEach((point, i) => {
            // Base wave motion
            const wave = Math.sin(this.time * 2 + point.angle * 3) * 8;
            
            // Mouse influence with smooth transition
            const dx = this.mouse.x - this.centerX;
            const dy = this.mouse.y - this.centerY;
            const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
            const angleToMouse = Math.atan2(dy, dx);
            
            // Calculate target radius with mouse influence
            const mouseEffect = Math.max(0, 1 - distanceToMouse / 250);
            const mousePull = Math.cos(point.angle - angleToMouse) * mouseEffect * this.mouseInfluence * 60;
            point.targetRadius = point.originalRadius + wave + mousePull;

            // Smooth radius transition
            const radiusDiff = point.targetRadius - point.radius;
            point.radius += radiusDiff * 0.1;

            // Update position with velocity
            const targetX = this.centerX + Math.cos(point.angle) * point.radius;
            const targetY = this.centerY + Math.sin(point.angle) * point.radius;
            
            this.velocities[i].x = (this.velocities[i].x + (targetX - point.x) * 0.1) * this.dampening;
            this.velocities[i].y = (this.velocities[i].y + (targetY - point.y) * 0.1) * this.dampening;
            
            point.x += this.velocities[i].x;
            point.y += this.velocities[i].y;

            // Very slow rotation
            point.angle += point.speed * 0.2;
        });
    }

    createPath() {
        const points = [...this.points, this.points[0], this.points[1]]; // Add extra points for smooth closing
        let path = `M ${points[0].x} ${points[0].y}`;
        
        for (let i = 1; i < points.length - 2; i++) {
            const current = points[i];
            const next = points[i + 1];
            
            // Calculate control points with tension
            const dx = next.x - current.x;
            const dy = next.y - current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const cx1 = current.x + dx * this.tension;
            const cy1 = current.y + dy * this.tension;
            const cx2 = next.x - dx * this.tension;
            const cy2 = next.y - dy * this.tension;
            
            path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${next.x} ${next.y}`;
        }
        
        return path;
    }

    animate = () => {
        this.updatePoints();
        const path = this.createPath();
        
        this.paths.forEach(pathElement => {
            pathElement.setAttribute('d', path);
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize blob animation after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new WaterRipple();
    new BlobAnimation();
});
