// ==========================================
// Zwanghafter Scroll zum Header bei Refresh
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Alternativ beim Laden erzwingen:
window.onload = () => {
    window.scrollTo(0, 0);
};


// ==========================================
// A. Globale Navigation & Smooth Scroll
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const navOverlay = document.getElementById('nav-overlay');

menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('open');
    menuBtn.classList.toggle('open');
});

const scrollLinks = document.querySelectorAll('.nav-overlay ul li a, .gsap-scroll-link');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (navOverlay && menuBtn) {
            navOverlay.classList.remove('open');
            menuBtn.classList.remove('open');
        }
        
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

    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);

    const materialWhite = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.2 });
    const cubeWhite = new THREE.Mesh(geometry, materialWhite);
    cubeGroup.add(cubeWhite);

    const materialBlue = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.5 });
    const cubeBlue = new THREE.Mesh(geometry, materialBlue);
    cubeBlue.scale.set(0.98, 0.98, 0.98); 
    cubeGroup.add(cubeBlue);

    function resizeCube() {
        let scale = window.innerWidth / 1200;
        
        if (scale < 0.5) scale = 0.5;
        if (scale > 1.2) scale = 1.2;

        cubeGroup.scale.set(scale, scale, scale);

        if (window.innerWidth > 1025) {
            cubeGroup.position.x = 2.5; 
            cubeGroup.position.y = 0;
        } else if (window.innerWidth <= 1025 && window.innerWidth > 768) {
            cubeGroup.position.x = 0; 
            cubeGroup.position.y = -1.5; 
        } else {
            cubeGroup.position.x = 0; 
            cubeGroup.position.y = -2;
        }
    }
    
    resizeCube();

    function animate() {
        requestAnimationFrame(animate);
        
        cubeGroup.rotation.x += 0.005;
        cubeGroup.rotation.y += 0.005;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        resizeCube();
    });
}

// ==========================================
// C. Projekt-Datenbank & Modal-Logik
// ==========================================
const projectsData = [
    {
        id: 0,
        title: "THM-Universum",
        desc: "Das „Medieninformatik Universum“ ist eine interaktive Web-Anwendung, die entwickelt wurde, um Studieninteressierten die vielfältigen Fachbereiche der Medieninformatik spielerisch und immersiv näherzubringen. Anstatt klassischer Informationsbroschüren tauchen die Nutzer in ein Weltall-Setting ein, in dem jeder Planet für einen spezifischen Kernbereich des Studiengangs steht – von Webentwicklung über 3D-Grafik bis hin zum Game Development.",
        images: [
            "assets/thm_universum_1.png",
            "assets/thm_universum_2.png",
            "assets/thm_universum_3.png"
        ],
        tools: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-threejs-original"]
    },
    {
        id: 1,
        title: "PizzaLab",
        desc: "Das „PizzaLab“ ist ein Full-Stack-Projekt, das als direkter technischer Vergleich zwischen Vue.js und React konzipiert wurde. Anstatt einer einfachen Webseite wurde ein funktionaler Pizza-Konfigurator entwickelt, bei dem beide Frameworks auf dasselbe, mit Nest.js realisierte Backend sowie eine Firebase-Datenbank zugreifen. Dieses Set-up ermöglichte eine präzise Gegenüberstellung von Syntax, Performance und Entwickler-Workflow. Das Projekt deckt den gesamten Bestellprozess ab – von der Benutzer-Authentifizierung (JWT, Bcrypt) über die Konfigurationslogik bis hin zur Bestellverwaltung. Zusätzlich wurde das System durch einen interaktiven Botpress-Chatbot ergänzt, der Nutzer bei der Pizzakreation unterstützt .",
        images: [
            "assets/PizzaLab_1.png",
            "assets/PizzaLab_2.png",
            "assets/PizzaLab_3.png",
            "assets/PizzaLab_4.png"
        ],
        tools: ["devicon-react-original", "fa-brands fa-vuejs", "devicon-nestjs-original"]
    },
    {
        id: 2,
        title: "Bobrmon",
        desc: "„Bobermon“ ist ein browserbasiertes Lernspiel, das die Grundlagen der JavaScript-Programmierung auf unterhaltsame Weise vermittelt. Das Spielkonzept kombiniert das Einsammeln von Items auf einem Spielfeld mit einem rundenbasierten Kampfsystem nach dem Vorbild von Pokémon. Die gesammelten Items repräsentieren dabei JavaScript-Code-Schnipsel wie Funktionen, Schleifen oder Bedingungen, die der Spieler aktiv verknüpfen muss, um die Kämpfe gegen Gegner zu bestehen. Von einfachen Funktionsaufrufen in Level 1 bis hin zu komplexen for-Schleifen in höheren Stufen deckt das Projekt ein breites Spektrum an Programmierlogik ab. Die Entwicklung wurde durch eine iterative Feedback-Methode begleitet, bei der Nutzer-Feedback direkt in die Optimierung der Interaktionen und Hitboxen einfloss . Das Projekt demonstriert eindrucksvoll, wie Gamification genutzt werden kann, um abstrakte Informatik-Konzepte greifbar und motivierend zu gestalten.",
        images: [
            "assets/bobrmon_1.png",
            "assets/bobrmon_2.png",
            "assets/bobrmon_3.png",
        ],
        tools: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-threejs-original"]
    },
    {
        id: 3,
        title: "Wetterauer Störche DV",
        desc: "Das Vereinsportal für die „Wetterauer Störche“ ist eine moderne, interaktive Web-Plattform, die alle wesentlichen Aspekte des Dart-Vereinslebens digital bündelt. Die Webseite bietet den Mitgliedern und Fans eine zentrale Anlaufstelle für aktuelle News, detaillierte Team-Informationen, Spielerprofile und den aktuellen Spielplan. Ein besonderes Augenmerk lag auf der Nutzererfahrung und der einfachen Verwaltbarkeit: Um den Vereinsmitgliedern die Pflege der Inhalte ohne Programmierkenntnisse zu ermöglichen, wurde ein „Lightweight CMS“ auf Basis von Google Sheets integriert. Über dieses können Texte und Termine eigenständig aktualisiert werden, die sofort live auf der Webseite erscheinen.",
        images: [
            "assets/wetterauer_störche_1.png",
            "assets/wetterauer_störche_2.png",
            "assets/wetterauer_störche_3.png",
        ],
        tools: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-threejs-original"]
    },
    {
        id: 4,
        title: "Portfolio",
        desc: "Dieses Portfolio-Projekt ist eine maßgeschneiderte Web-Präsentation, die als digitale Visitenkarte meine Leidenschaft für modernes Webdesign und interaktive User-Experiences widerspiegelt. Die Plattform kombiniert eine minimalistische Ästhetik mit technischer Komplexität, um sowohl meine Fähigkeiten als Entwickler zu demonstrieren als auch eine intuitive Navigation für Besucher zu gewährleisten.",
        images: [
            "assets/portfolio_1.png"
        ],
        tools: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-threejs-original"]
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
    gsap.to(carouselImg, {
        duration: 0.4, 
        opacity: 0, 
        ease: "power2.inOut",
        onComplete: () => {
            carouselImg.src = currentImages[currentImgIndex];
            gsap.to(carouselImg, { duration: 0.4, opacity: 1, ease: "power2.inOut" });
        }
    });
}

// Karussell Steuerung
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
function resetCarouselTimer() { startCarousel(); }

document.getElementById('carousel-next').addEventListener('click', () => { nextImage(); resetCarouselTimer(); });
document.getElementById('carousel-prev').addEventListener('click', () => { prevImage(); resetCarouselTimer(); });

function closeModal() {
    modal.classList.remove('show');
    clearInterval(carouselTimer); 
}
closeModalBtn.addEventListener('click', closeModal);


// ==========================================
// D. Rechtliche Modals Logik (DSGVO & Impressum) mit GSAP Animation
// ==========================================
const dsgvoModal = document.getElementById('dsgvo-modal');
const closeDsgvo = document.getElementById('close-dsgvo');
const openDsgvoForm = document.getElementById('open-dsgvo-form');
const openDsgvoFooter = document.getElementById('open-dsgvo-footer');

const impressumModal = document.getElementById('impressum-modal');
const closeImpressum = document.getElementById('close-impressum');
const openImpressumFooter = document.getElementById('open-impressum-footer');

// Edle GSAP-Öffnungs-Animation
function playModalOpenAnimation(modalElement) {
    const contentBox = modalElement.querySelector('.modal-content');
    
    // 1. Hintergrund faden und sichtbar machen
    gsap.to(modalElement, { duration: 0.3, autoAlpha: 1, display: 'flex' });
    
    // 2. Textbox mit Federungs-Effekt von unten reinfliegen lassen
    gsap.fromTo(contentBox, 
        { scale: 0.85, y: 40, autoAlpha: 0 },
        { duration: 0.55, scale: 1, y: 0, autoAlpha: 1, ease: "back.out(1.4)", clearProps: "transform" }
    );
}

// Weiche GSAP-Schließ-Animation
function playModalCloseAnimation(modalElement) {
    const contentBox = modalElement.querySelector('.modal-content');
    
    gsap.to(contentBox, { duration: 0.25, scale: 0.9, y: -20, autoAlpha: 0, ease: "power2.in" });
    gsap.to(modalElement, { duration: 0.3, autoAlpha: 0, delay: 0.05, onComplete: () => {
        modalElement.style.display = 'none';
    }});
}

// Event Listener - DSGVO
if (openDsgvoForm) openDsgvoForm.addEventListener('click', (e) => { e.preventDefault(); playModalOpenAnimation(dsgvoModal); });
if (openDsgvoFooter) openDsgvoFooter.addEventListener('click', (e) => { e.preventDefault(); playModalOpenAnimation(dsgvoModal); });
if (closeDsgvo) closeDsgvo.addEventListener('click', () => playModalCloseAnimation(dsgvoModal));

// Event Listener - Impressum
if (openImpressumFooter) openImpressumFooter.addEventListener('click', (e) => { e.preventDefault(); playModalOpenAnimation(impressumModal); });
if (closeImpressum) closeImpressum.addEventListener('click', () => playModalCloseAnimation(impressumModal));

// Globaler Klick außerhalb schließt die Modals
window.addEventListener('click', (e) => {
    if (e.target === modal) { closeModal(); }
    if (e.target === dsgvoModal) { playModalCloseAnimation(dsgvoModal); }
    if (e.target === impressumModal) { playModalCloseAnimation(impressumModal); }
});


// ==========================================
// E. Sanfte Scroll-Animationen (GSAP)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Timeline Sektion
gsap.utils.toArray('.gsap-fade-left').forEach((box) => {
    gsap.fromTo(box, 
        { autoAlpha: 0, x: -50 }, 
        { 
            scrollTrigger: { trigger: box, start: "top 85%", toggleActions: "play none none reverse" },
            autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
        }
    );
});

/*
window.addEventListener('resize', () => {
    const container = document.getElementById('stars-container');
    if (window.innerWidth <= 768) {
        if (container && container.children.length === 0) {
            createStars(); // Nur erstellen, wenn noch keine Sterne da sind
        }
    } else {
        if (container) {
            container.innerHTML = ''; // Sterne löschen, wenn wir auf Desktop wechseln
        }
    }
});*/


// Profil Sektion
gsap.fromTo('.gsap-fade-up', 
    { autoAlpha: 0, y: 50 }, 
    {
        scrollTrigger: { trigger: ".about-right", start: "top 75%", toggleActions: "play none none reverse" },
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    }
);

// Projekte Sektion H2
gsap.fromTo('.project-section h2',
    { autoAlpha: 0, y: -30 },
    {
        scrollTrigger: { trigger: ".project-section", start: "top 85%", toggleActions: "play none none reverse" },
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out"
    }
);

// Projekt Karten Stagger
gsap.fromTo('.project-card',
    { autoAlpha: 0, y: 50 },
    {
        scrollTrigger: { trigger: ".project-grid", start: "top 80%", toggleActions: "play none none reverse" },
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
    }
);

// Kontakt Sektion H2
gsap.fromTo('.contact-section h2',
    { autoAlpha: 0, y: -30 },
    {
        scrollTrigger: { trigger: ".contact-section", start: "top 85%", toggleActions: "play none none reverse" },
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out"
    }
);

// Kontakt Links
gsap.fromTo('.contact-left',
    { autoAlpha: 0, x: -50 },
    {
        scrollTrigger: { trigger: ".contact-container", start: "top 80%", toggleActions: "play none none reverse" },
        autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
    }
);

// Kontakt Formular
gsap.fromTo('.contact-right',
    { autoAlpha: 0, x: 50 },
    {
        scrollTrigger: { trigger: ".contact-container", start: "top 80%", toggleActions: "play none none reverse" },
        autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out"
    }
);


// ==========================================
// F. Kontaktformular mit EmailJS
// ==========================================
emailjs.init("cm8isK5lhVnIGFEUZ");

const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Wird gesendet...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        emailjs.sendForm('service_cdofwv5', 'template_ldom9dp', this)
            .then(function() {
                alert('Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.');
                contactForm.reset(); 
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, function(error) {
                alert('Hoppla, da ist etwas schiefgelaufen: ' + JSON.stringify(error));
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            });
    });
}

// ==========================================
// H. Animierter Sternenhintergrund (Desktop & Mobile)
// ==========================================

// 1. WICHTIG: GSAP mitteilen, dass wir das ScrollTrigger Plugin nutzen
gsap.registerPlugin(ScrollTrigger);

function createStars() {
    const container = document.getElementById('stars-container');
    
    if (!container) return;

    const numberOfStars = 222;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 2; 
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        
        container.appendChild(star);

        // Animation 1: Das Blinken (Pulsieren)
        gsap.to(star, {
            duration: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.5,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 5,
            ease: "sine.inOut"
        });
        
        // Animation 2: Der Parallax-Effekt beim Scrollen
        gsap.to(star, {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
            y: `-${Math.random() * 2000 + 300}`, // Bestimmt die Stärke des Scroll-Effekts
            ease: "none"
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createStars();
});

// ==========================================
// Scroll-To-Top Button Logik
// ==========================================
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// 1. Button einblenden/ausblenden beim Scrollen
window.addEventListener("scroll", () => {
    // Wenn mehr als 300 Pixel gescrollt wurde
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
        // GSAP Fade-In (falls du es weich einblenden willst)
        gsap.to(scrollToTopBtn, { opacity: 1, duration: 0.3 });
    } else {
        // GSAP Fade-Out und dann display: none
        gsap.to(scrollToTopBtn, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => scrollToTopBtn.style.display = "none" 
        });
    }
});

scrollToTopBtn.addEventListener("click", () => {
    // Scrollt in 1 Sekunde butterweich nach ganz oben
    gsap.to(window, { 
        duration: 1, 
        scrollTo: 0, 
        ease: "power2.inOut" // Sanftes Anfahren und Abbremsen
    });
});