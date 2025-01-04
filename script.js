// Matrix Effect Animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Character sets for matrix effect
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const binary = '01';

// Choose which character set to use
const alphabet = binary;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

// Initialize raindrops
for( let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1;
}

// Draw the matrix effect
const draw = () => {
    // Create fade effect
    ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set the text style
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';

    // Draw characters
    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        
        // Reset raindrop when it reaches bottom
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// Run matrix animation
setInterval(draw, 30);

// Custom Cursor Animation
const cursor = document.querySelector('.cursor');
let cursorVisible = true;
let cursorEnlarged = false;

// Hide cursor when leaving window
document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
    cursorVisible = false;
});

// Show cursor when entering window
document.addEventListener('mouseover', () => {
    cursor.style.display = 'block';
    cursorVisible = true;
});

// Update cursor position with smooth movement
const updateCursorPosition = (e) => {
    if (cursorVisible) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
};

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateCursorPosition(e));
});

// Click animation
document.addEventListener('mousedown', () => {
    cursor.classList.add('expand');
    cursorEnlarged = true;
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('expand');
    cursorEnlarged = false;
});

// Hover effect for interactive elements
const addCursorHoverEffect = () => {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('expand');
        });
        
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('expand');
        });
    });
};

// Initialize hover effects
addCursorHoverEffect();

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal Animation on Scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Add scroll event listener
window.addEventListener("scroll", reveal);
reveal(); // Initial check

// Typewriter Effect Animation
const typewriterText = document.querySelector('.typewriter');
const text = typewriterText.textContent;
typewriterText.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typewriter effect after a delay
setTimeout(typeWriter, 1000);

// Typewriter Effect with Multiple Texts
const roleText = document.getElementById('role-text');
const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Software Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    const shouldType = !isDeleting && charIndex <= currentRole.length;
    const shouldDelete = isDeleting && charIndex >= 0;

    if (shouldType) {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    } else if (shouldDelete) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Wait at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        roleIndex = (roleIndex + 1) % roles.length;
        isDeleting = false;
        typeSpeed = 500; // Wait before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect
typeEffect();

// Skill Progress Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Intersection Observer for Skills Animation
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Initialize EmailJS
(function() {
    emailjs.init("e42NlTI9FBqYpAm57"); // Replace with your EmailJS public key
})();

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');
const formStatus = document.querySelector('.form-status');

const showStatus = (type, message) => {
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    formStatus.textContent = message;
    
    // Hide status after 5 seconds
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
};

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('service_1ean17y', 'template_p53n39r', formData)
        .then(() => {
            // Success
            showStatus('success', 'Message sent successfully!');
            contactForm.reset();
        })
        .catch((error) => {
            // Error
            console.error('Error:', error);
            showStatus('error', 'Failed to send message. Please try again.');
        })
        .finally(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
        });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    // Update matrix canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate matrix columns
    const columns = canvas.width/fontSize;
    rainDrops.length = 0;
    for(let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
});

// Project hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.opacity = '1';
        card.querySelector('.project-details').style.transform = 'translateY(0)';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.opacity = '0';
        card.querySelector('.project-details').style.transform = 'translateY(20px)';
    });
});
