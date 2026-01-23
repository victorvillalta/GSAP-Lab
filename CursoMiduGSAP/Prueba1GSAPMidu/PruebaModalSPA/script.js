
// 1. DATA (Lo que verás en el modal)
const characters = {
    jinx: { title: "JINX", desc: "La bala perdida de Zaun.", img: "img/jinx-modal01.jpg" },
    vi: { title: "VI", desc: "La defensora de Piltover.", img: "img/vi-modal01.jpg" },
    mel: { title: "MEL", desc: "La consejera Medarda.", img: "img/mel-modal01.jpg" }
};

// 2. elements
const modal = document.querySelector('#modal-container');
const btnClose = document.querySelector('.close-btn');


gsap.to(".card img", {
    opacity: 1,
    y: 0,
    duration: 1,
    staggered: { // core to effect bettwen the cards , but... y create 1 function for the stagger into the cards
        ease: "power4.out",
        delay: 0.2, // waith before start
    }
});

// 3. Animation modal object with inyect the 
const tl = gsap.timeline({ paused: true });

tl.set(modal, { display: 'flex' })
  .to(modal, { opacity: 1, duration: 0.4 })
  
  // Animamos el 35% (foto) desde la izquierda
  .from(".modal-photo", { 
      xPercent: -150, 
      duration: 0.5, 
      ease: "power4.out" 
  }, "-=0.2")
  // Animamos el 65% (info) desde la derecha
  .from(".modal-info", { 
      xPercent: 100, 
      duration: 0.4, 
      ease: "power3.out" 
  }, "-=0.6") // Sucede casi a la vez que la foto
  // Stagger interno para el texto
  .from("#dynamic-title, #dynamic-text, .close-btn", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4
  }, "-=0.2");


// 4. logic of clicks
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-char');
        const info = characters[id];

        // inyect before of take the assambles.
        document.querySelector('#dynamic-title').innerText = info.title;
        document.querySelector('#dynamic-text').innerText = info.desc;
        document.querySelector('#dynamic-img').src = info.img;

        tl.play(); // shooter
    });
});

// 5. button of close and cleaner the props 
btnClose.addEventListener('click', () => {
    tl.reverse().then(() => {
        // Esto limpia los estilos de GSAP para que no choquen con el CSS
        gsap.set(modal, { clearProps: "all" });
    });
});