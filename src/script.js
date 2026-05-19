// ==========================================
// A. Globale Navigation & Hamburger Menü
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-overlay ul li a');

menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        navOverlay.classList.remove('open'); 
        
        const targetId = link.getAttribute('href');
        
        gsap.to(window, {
            duration: 1.2,
            scrollTo: targetId,
            ease: "power3.inOut"
        });
    });
});

// ==========================================
// B. Three.js Hintergrund (im Header)
// ==========================================
const container = document.getElementById('canvas-container');

if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // Funktion zur dynamischen Positionierung & Skalierung
    function resizeCube() {
        let scale = window.innerWidth / 1200;
        
        // Grenzen festlegen, damit er nicht winzig oder gigantisch wird
        if (scale < 0.5) scale = 0.5;
        if (scale > 1.2) scale = 1.2;

        cube.scale.set(scale, scale, scale);

        // Position anpassen
        if (window.innerWidth > 1025) {
            cube.position.x = 2.5; // Von 2.0 auf 2.8 erhöht -> schiebt den Würfel für mehr Abstand weiter nach rechts
            cube.position.y = 0;
        } else {
            cube.position.x = 0; // Auf dem Handy bleibt er mittig
            cube.position.y = -1.5; // Und leicht nach unten versetzt unter dem Text
        }
    }
    
    // Einmalig beim Laden ausführen
    resizeCube();

    // Animations-Schleife (Dauerhafte, normale Drehung)
    function animate() {
        requestAnimationFrame(animate);
        
        // Konstante automatische Rotation auf beiden Achsen
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    animate();

    // Event-Listener für Fenstergröße
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Skalierung und Position bei Größenänderung updaten
        resizeCube();
    });
}

// ==========================================
// C. Projekt-Datenbank & Modal-Logik
// ==========================================
const projectsData = [
    {
        id: 0,
        title: "3D Portfolio",
        desc: "Dies ist eine detaillierte Beschreibung meines Portfolios. Ich habe hier Three.js für den Hintergrund verwendet und GSAP, um geschmeidige Scroll-Übergänge zwischen den Sektionen zu bauen.",
        images: [
            "https://picsum.photos/id/10/800/400",
            "https://picsum.photos/id/11/800/400",
            "https://picsum.photos/id/12/800/400"  
        ],
        tools: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-threejs-original"]
    },
    {
        id: 1,
        title: "Sneaker Shop",
        desc: "Ein voll funktionsfähiger E-Commerce Prototyp. Nutzer können Produkte in den Warenkorb legen und durch einen simulierten Checkout-Prozess gehen.",
        images: [
            "https://picsum.photos/id/20/800/400",
            "https://picsum.photos/id/21/800/400"
        ],
        tools: ["devicon-react-original", "devicon-nodejs-plain", "devicon-sass-original"]
    },
    {
        id: 2,
        title: "Wetter App",
        desc: "Eine App, die via REST API aktuelle Wetterdaten abruft. Sie zeigt Temperatur, Luftfeuchtigkeit und eine 5-Tage-Vorhersage an.",
        images: [
            "https://picsum.photos/id/30/800/400",
            "https://picsum.photos/id/31/800/400",
            "https://picsum.photos/id/32/800/400",
            "https://picsum.photos/id/33/800/400"
        ],
        tools: ["devicon-javascript-plain", "devicon-git-plain", "devicon-github-original"]
    }
];

const modal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const carouselImg = document.getElementById('carousel-img');
let currentImages = [];
let currentImgIndex = 0;
let carouselTimer = null;

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id'); 
        openModal(id);
    });
});

function openModal(id) {
    const project = projectsData[id];
    if(!project) return; 
    
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-desc').innerText = project.desc;
    
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = ''; 
    project.tools.forEach(toolClass => {
        const i = document.createElement('i');
        i.className = toolClass;
        toolsContainer.appendChild(i);
    });
    
    currentImages = project.images;
    currentImgIndex = 0;
    updateCarouselImage();
    
    modal.classList.add('show');
    startCarousel();
}

function updateCarouselImage() {
    carouselImg.style.opacity = 0;
    setTimeout(() => {
        carouselImg.src = currentImages[currentImgIndex];
        carouselImg.style.opacity = 1;
    }, 150); 
}

function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % currentImages.length;
    updateCarouselImage();
}

function prevImage() {
    currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length;
    updateCarouselImage();
}

function startCarousel() {
    clearInterval(carouselTimer); 
    carouselTimer = setInterval(nextImage, 5000);
}

function resetCarouselTimer() {
    startCarousel();
}

document.getElementById('carousel-next').addEventListener('click', () => {
    nextImage();
    resetCarouselTimer();
});

document.getElementById('carousel-prev').addEventListener('click', () => {
    prevImage();
    resetCarouselTimer();
});

function closeModal() {
    modal.classList.remove('show');
    clearInterval(carouselTimer); 
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ==========================================
// E. Sanfte Scroll-Animationen (GSAP)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// --- 1. ABOUT ME SEKTION ---
// Timeline-Boxen von links
gsap.utils.toArray('.gsap-fade-left').forEach((box, i) => {
    gsap.fromTo(box, 
        { autoAlpha: 0, x: -50 }, 
        { 
            scrollTrigger: {
                trigger: box,
                start: "top 85%", 
                toggleActions: "play none none reverse" 
            },
            autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
        }
    );
});

// Profil-Elemente von unten
gsap.fromTo('.gsap-fade-up', 
    { autoAlpha: 0, y: 50 }, 
    {
        scrollTrigger: {
            trigger: ".about-right",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    }
);

// --- 2. PROJECTS SEKTION ---
// Überschrift kommt sanft von oben
gsap.fromTo('.project-section h2',
    { autoAlpha: 0, y: -30 },
    {
        scrollTrigger: {
            trigger: ".project-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out"
    }
);

// Projekt-Karten kommen nacheinander von unten (Stagger-Effekt)
gsap.fromTo('.project-card',
    { autoAlpha: 0, y: 50 },
    {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, y: 0, duration: 0.8, 
        stagger: 0.15, // Abstand zwischen den Animationen der einzelnen Karten
        ease: "power3.out"
    }
);

// --- 3. CONTACT SEKTION ---
// Überschrift kommt sanft von oben
gsap.fromTo('.contact-section h2',
    { autoAlpha: 0, y: -30 },
    {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out"
    }
);

// Linke Info-Seite schiebt sich von links rein
gsap.fromTo('.contact-left',
    { autoAlpha: 0, x: -50 },
    {
        scrollTrigger: {
            trigger: ".contact-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
    }
);

// Rechtes Formular schiebt sich von rechts rein
gsap.fromTo('.contact-right',
    { autoAlpha: 0, x: 50 },
    {
        scrollTrigger: {
            trigger: ".contact-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
    }
);

// ==========================================
// F. Kontaktformular mit EmailJS
// ==========================================

// 1. EmailJS initialisieren (Füge hier deinen Public Key ein)
emailjs.init("cm8isK5lhVnIGFEUZ");

const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        
        // Button-Text ändern, damit der Nutzer weiß, dass etwas passiert
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Wird gesendet...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // 2. E-Mail senden (Service ID und Template ID eintragen)
        // Das 'this' am Ende übergibt automatisch alle Formularfelder
        emailjs.sendForm('service_cdofwv5', 'template_ldom9dp', this)
            .then(function() {
                // Erfolgsfall
                alert('Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.');
                contactForm.reset(); // Formular leeren
                
                // Button wiederherstellen
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, function(error) {
                // Fehlerfall
                alert('Hoppla, da ist etwas schiefgelaufen: ' + JSON.stringify(error));
                
                // Button wiederherstellen
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            });
    });
}