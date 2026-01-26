
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
    // 1. Animation to entrance of card images.
    gsap.to(".card img", {
        autoAlpha: 1,      // use autoAlpha instead of opacirty for the best performance
        y: 0,              // reset translateY(30px) to CSS.
        duration: 0.8,
        stagger: 0.1,      // here to stagger , me have a wrong before. Now, its right.
        ease: "power2.out"
    });

    // 2. Logic of clicks for activate to modal to be card.
    document.querySelectorAll('.card').forEach(card => {
            const id = card.getAttribute('data-char');
            const info = characters[id];

            if (info) {
                card.style.setProperty('--accent-color', info.color);
                card.addEventListener('click', () => {
                    currentIdx = charKeys.indexOf(id);
                    updateModalContent(info);
                    document.body.classList.add('modal-open'); // Add class to body to block scroll
                    tl.play();
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


// 3. Navegation (Circular Bonus)
function navigateModal(step){
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

// 4. SCROLL POR HOVER (Marquesina)
let scrollInterval;
function startScroll(speed) {
    scrollInterval = setInterval(() => { textContainer.scrollTop += speed; }, 10);
}

// Aquí asignamos a tus botones de navegación o a botones extra
document.querySelector('.modal__btn--up').addEventListener('mouseenter', () => startScroll(-2));
document.querySelector('.modal__btn--up').addEventListener('mouseleave', () => clearInterval(scrollInterval));
document.querySelector('.modal__btn--down').addEventListener('mouseenter', () => startScroll(2));
document.querySelector('.modal__btn--down').addEventListener('mouseleave', () => clearInterval(scrollInterval));

// 3. Elements in global range (REFACTORING in Scope?)


gsap.to(".card img", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: { // core to effect bettwen the cards , but... y create 1 function for the stagger into the cards
        ease: "power4.out",
        delay: 0.2, // waith before start
    }
});

// 4. Animation modal object with inyect the 
const tl = gsap.timeline({ paused: true });

tl.set(modal, { display: 'flex' })
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

  
// 5. LOGIC: button of close, click out for exit and cleaner the props 
    
modal.addEventListener('click', (e) => {
    // Si el target es el overlay (el fondo oscuro) y no el contenido blanco
    if (e.target === modal) {
        tl.reverse().then(() => {
            document.body.classList.remove('modal-open');
            gsap.set(modal, { clearProps: "all" }); // Esto limpia los estilos de GSAP para que no choquen con el CSS
        });
    }
});