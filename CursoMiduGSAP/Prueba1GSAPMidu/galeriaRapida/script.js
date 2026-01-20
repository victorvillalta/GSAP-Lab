

//Animate introduction  "Title"
    gsap.from(".title img", {
        duration: 1.2,
        y: -100,            
        opacity: 0,        
        filter: "blur(10px)", 
        stagger: 0.15,       // delay if letter between letter
        ease: "expo.out",    // use for a fluid movement or fluid animation
        onComplete: () => {
            gsap.set(".title img", { clearProps: "filter" });
        }
    });

//Animation to interaction of user, this interaction use JS , mouseenter and mouseleave. 
    const letras = document.querySelectorAll(".title img");

    letras.forEach(letra => {
        letra.addEventListener("mouseenter", () => {
            gsap.to(letra, {
                filter: "drop-shadow(0 0 20px #00f2ff)",
                scale: 1.2,
                duration: 0.3,
                ease: "power1.in"
            });
        });

        letra.addEventListener("mouseleave", () => {
            gsap.to(letra, {
                filter: "drop-shadow(0 0 0px #00f2ff)",
                scale: 1,
                duration: 0.3,
                ease: "back.out(4)"
            });
        });
    });


    // Animation "GalleryCharaacters"
    const items = gsap.utils.toArray(".gallery__item");

    items.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,      // El trigger es el propio elemento
                start: "top 90%",   // Se activa cuando el elemento asoma un 10% por abajo
                toggleActions: "play none none none"
            },
            opacity: 0.3,
            y: 30,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.out"
        });
    });

        // gsap.to('.grid__gallery-characters img', {
        //     duration: 2,
           
        //     opacity: 0,
        //     stagger: {
        //         amount: 1.5,
        //         scale: 0.5,
        //         opacity: 0,
        //         // each:0.2,
        //         y: 5,
        //         repeat: -1,
        //         yoyo: true,
        //         grid: 'auto',
        //         from: 'start' // have more types , 'center', 'edges', 'end'
        //     },
        //     ease: "expo.out" // Un final suave y elegante
        // })

