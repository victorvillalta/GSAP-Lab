
let characters = {}; // start the object clean, Why? you need put the jason in to characters... 

// 1 invoke a data JSON, its more stability, clean, fast and safe. 
fetch('./data.json')
    .then(response => response.json()) // convert to respond in a object JS , such before.
    .then(data => {
        characters = data.characters; // Save of data in our variable
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
               // Yes, its a INYECTION for data before in the animation its a cure of the Stacking Context. 
                document.querySelector('#dynamic-title').innerText = info.title;
                document.querySelector('#dynamic-subtitle').innerText = info.subtitle;
                document.querySelector('#dynamic-text').innerText = info.desc;
                document.querySelector('#dynamic-img').src = info.img;

               // ASIGNAMOS EL COLOR AL MODAL (Para que el modal cambie)
                modal.style.setProperty('--accent-color', info.color);

                tl.play();
            });
        }
    });
}

// 3. Elements in global range (REFACTORING in Scope?)
const modal = document.querySelector('.modal-overlay');
const btnClose = document.querySelector('.close-btn');


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


// 5. button of close and cleaner the props 
btnClose.addEventListener('click', () => {
    tl.reverse().then(() => {
        // Esto limpia los estilos de GSAP para que no choquen con el CSS
        gsap.set(modal, { clearProps: "all" });
    });
});