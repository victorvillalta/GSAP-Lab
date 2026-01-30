
let characters = {}; // start the object clean, Why? you need put the jason in to characters... 
let charKeys = [];
let currentIdx = 0;

const modal = document.querySelector('.modal-overlay');
const btnClose = document.querySelector('.close-btn');
const textContainer = document.querySelector('#dynamic-text'); //text modal description

// 1 invoke a data JSON, its more stability, clean, fast and safe. 
fetch('./data.json')
    .then(response => response.json()) // convert to respond in a object JS , such before.
    .then(data => {
        characters = data.characters; // Save of data in our variable
        charKeys = Object.keys(characters); // ESTO FALTABA: Sin esto, navigateModal no sabe qué personajes existen.
        console.log("Data loaded successfully:", characters);
        
        // Here is where starting to be events of the cards.
        initApp(); 
    })
    .catch(error => console.error("Error loading JSON:", error));

function initApp() {
    // ... Animación de entrada GSAP (mantenla igual)
        gsap.to(".card img", {
        autoAlpha: 1,      // use autoAlpha instead of opacirty for the best performance
        y: 0,              // reset translateY(30px) to CSS.
        duration: 0.8,
        stagger: 0.1,      // here to stagger , me have a wrong before. Now, its right.
        ease: "power2.out"
    });

    document.querySelectorAll('.card').forEach(card => {
        const id = card.getAttribute('data-char');
        const info = characters[id];

        if (info) {
            card.style.setProperty('--accent-color', info.color);
            
            // CLICK to be modal
            card.addEventListener('click', () => {
                currentIdx = charKeys.indexOf(id);
                updateModalContent(info);
                document.body.classList.add('modal-open');
                modalTl.play();
            });

            // persppective and Tilt (but need more objets for paralax)
            card.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const rect = card.getBoundingClientRect();
                
                const x = (clientX - rect.left) / rect.width - 0.5;
                const y = (clientY - rect.top) / rect.height - 0.5;

                gsap.to(card, {
                    rotationY: x * 20, // Aumentamos a 20 para que lo notes más
                    rotationX: -y * 20,
                    transformPerspective: 1500,
                    ease: "power2.out",
                    duration: 0.4
                });

                gsap.to(card.querySelector('img'), {
                    x: -x * 25, // Movimiento opuesto de la imagen
                    y: -y * 25,
                    scale: 1.15, // Zoom para evitar bordes vacíos
                    duration: 0.4
                });
            });

            // Parallax to be scroll: The cards move at diferent speed when scroll the page, (future: Lazzy Load Images and put more cards. "update the performance")
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                
                
                gsap.to(".card:nth-child(1)", { y: scrolled * 0.05, ease: "none" });
                gsap.to(".card:nth-child(2)", { y: scrolled * 0.1, ease: "none" });
                gsap.to(".card:nth-child(3)", { y: scrolled * 0.15, ease: "none" });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0, rotationY: 0,
                    ease: "power2.out", duration: 0.6
                });
                gsap.to(card.querySelector('img'), {
                    x: 0, y: 0, scale: 1,
                    duration: 0.6
                });
            }); 
        }
    });
}

// 2. Logic the update of injection , its a cure of the Stacking Context. 
        function updateModalContent(info) {
                document.querySelector('#dynamic-title').innerText = info.title;
                document.querySelector('#dynamic-subtitle').innerText = info.subtitle;
                document.querySelector('#dynamic-text').innerText = info.desc;
                document.querySelector('#dynamic-img').src = info.img;
                modal.style.setProperty('--accent-color', info.color); // asignation the color for modal the user change of card activate --accent-color 

                textContainer.scrollTop = 0; // reset scroll to top when updating content
            
        }


// 3. Circular navigation Logic
function navigateModal(step){
    if (charKeys.length === 0) return; // guard clause

    currentIdx += step;
    if (currentIdx < 0) currentIdx = charKeys.length - 1;
    if (currentIdx >= charKeys.length) currentIdx = 0;

    const info = characters[charKeys[currentIdx]];

    gsap.to(".modal-content", {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        onComplete: () => {
            updateModalContent(info);
            gsap.to(".modal-content", { 
                opacity: 1,
                scale: 1, 
                duration: 0.2 
            });
        }
    });
}

document.querySelector('.modal__btn--prev').addEventListener('click', () => navigateModal(-1));
document.querySelector('.modal__btn--next').addEventListener('click', () => navigateModal(1));

// 4. SCROLL POR HOVER LOGIC
let scrollInterval;
function startScroll(speed) {
    scrollInterval = setInterval(() => { 
        textContainer.scrollTop += speed; 
    }, 10);
}

// 4.1 Events buttons
document.querySelector('.modal__btn--up').addEventListener('mouseenter', () => startScroll(-2));
document.querySelector('.modal__btn--up').addEventListener('mouseleave', () => clearInterval(scrollInterval));
document.querySelector('.modal__btn--down').addEventListener('mouseenter', () => startScroll(2));
document.querySelector('.modal__btn--down').addEventListener('mouseleave', () => clearInterval(scrollInterval));

//5. LOGIC: button of close, click out for exit and cleaner the props 
document.querySelector('.close-btn')?.addEventListener('click', () => {
        modalTl.reverse().then(() => {
            document.body.classList.remove('modal-open');
            gsap.set(modal, { clearProps: "all" });
        });
    });


modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        document.querySelector('.close-btn').click(); 
    }
});


// 6. Animation GSAP Entry cards
gsap.to(".card img", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: { // core to effect bettwen the cards , but... y create 1 function for the stagger into the cards
        ease: "power4.out",
        delay: 0.2, // waith before start
    }
});

// 7. Animation modal object - Paused control play
const modalTl = gsap.timeline({ paused: true });

modalTl.set(modal, { display: 'flex' })
  .to(modal, { opacity: 1, duration: 0.4 })
  
  // animation: 35% photo of left
  .from(".modal-photo", { 
      xPercent: -150, 
      duration: 0.5, 
      ease: "power4.out" 
  }, "-=0.2")
  // animation: 65% info description right
  .from(".modal-info", { 
      xPercent: 100, 
      duration: 0.4, 
      ease: "power3.out" 
  }, "-=0.6") 
  // stagger text animation
  .from("#dynamic-title, #dynamic-text, .close-btn", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4
  }, "-=0.2");



// 8. Animation hero ARCANE

//ALL CORRECT

// -- FORM A --
/*
GOOD PERFORMANCE BUT NOT WORK STAGGER WITH LETTERS NOT HAVE ALL CONTROL

const heroTl = gsap.timeline(); // Nombre único: heroTl

heroTl.to(".hero__title", { opacity: 1, duration: 0.1 }) 
  .from(".letter", {
    y: -100,
    opacity: 0,
    stagger: 0.1,
    duration: 1.2, 
    ease: "bounce.out"
  });
*/

// -- FORM B --
/*SIMPLISTIC ANIMATION (STAGGER BUT NOT WORK PROPERLY)

let logoArcane = document.querySelector(".hero__title ")

gsap.from(logoArcane, {
    y: -200,
    opacity:0,
    delay: 0.5,
    stagger: 5,
});
*/


// -- FORM C --/* BEST PERFORMANCE AND CONTROL MANUAL OF THE STAGGER
const letters = document.querySelectorAll('.hero__title .letter');

// Main animation 
letters.forEach((letter, index) => {
    const tl = gsap.timeline({ delay: index * 0.15 }); // manual stagger

    tl.from(letter, {
        y: -150,
        opacity: 0,
        duration: 1,
        ease: "bounce.out" // more weight in the animation
    })
    .to(letter, {
        filter: "drop-shadow(0 0 15px rgba(0, 183, 255, 0.8))", // El "Glow" azul hextech
        duration: 0.3,
        yoyo: true, // El brillo va y vuelve
        repeat: 1
    }, "-=0.2"); // Empieza un poco antes de que termine el rebote
});
