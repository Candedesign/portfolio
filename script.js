// -------------------------------------
// STICKY HEADER
// -------------------------------------

const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        siteHeader.classList.add("is-scrolled");
    } else {
        siteHeader.classList.remove("is-scrolled");
    }

});


// -------------------------------------
// ELEMENTOS DEL DOM
// -------------------------------------

const modal = document.getElementById("contactModal");
const openButton = document.getElementById("openContactModal");
const closeButton = document.getElementById("closeContactModal");
const contactForm = document.getElementById("contactForm");
const contactHeader = document.querySelector(".contact-header");
const contactSuccess = document.getElementById("contactSuccess");

const portfolioButton = document.getElementById("portfolioButton");
const navDropdown = document.querySelector(".nav-dropdown");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");


// -------------------------------------
// MENU PORTFOLIO
// -------------------------------------

portfolioButton.addEventListener("click", () => {

    const isOpen = navDropdown.classList.toggle("is-open");

    portfolioButton.setAttribute("aria-expanded", isOpen);

});


// Cierra el menú al hacer click fuera

document.addEventListener("click", (event) => {

    if (!navDropdown.contains(event.target)) {

        navDropdown.classList.remove("is-open");

        portfolioButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


// -------------------------------------
// PARALLAX
// -------------------------------------

const shape1 = document.querySelector(".shape-1");
const shape2 = document.querySelector(".shape-2");
const shape3 = document.querySelector(".shape-3");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    // Detectamos si la pantalla es mobile
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {

        // Movimiento más suave en mobile

        shape1.style.transform =
            `translateY(${scroll * -0.15}px)`;

        shape2.style.transform =
            `translateY(${scroll * -0.10}px)`;

        shape3.style.transform =
            `translateY(${scroll * -0.08}px)`;

    } else {

        // Movimiento más fuerte en desktop

        shape1.style.transform =
            `translateY(${scroll * -0.8}px)`;

        shape2.style.transform =
            `translateY(${scroll * -0.6}px)`;

        shape3.style.transform =
            `translateY(${scroll * -0.4}px)`;

    }

});


// -------------------------------------
// CONTACT MODAL
// -------------------------------------

// OPEN MODAL

function openModal() {

    contactHeader.style.display = "";
    contactForm.style.display = "";
    closeButton.style.display = "";

    contactSuccess.classList.remove("is-visible");

    modal.classList.add("is-open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    closeButton.focus();

}


// CLOSE MODAL

function closeModal() {

    modal.classList.remove("is-open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Elimina los estados de error

    contactForm
        .querySelectorAll(".has-error")
        .forEach((field) => {

            field.classList.remove("has-error");

        });


    openButton.focus();

}


// OPEN BUTTON

if (openButton) {
    openButton.addEventListener("click", openModal);
}

// CLOSE BUTTON

closeButton.addEventListener(
    "click",
    closeModal
);


// CLOSE WHEN CLICKING OUTSIDE

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


// CLOSE WITH ESCAPE

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        // Cierra modal

        if (modal.classList.contains("is-open")) {
            closeModal();
        }


        // Cierra dropdown

        navDropdown.classList.remove("is-open");

        portfolioButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


// -------------------------------------
// FORM VALIDATION + FORMSPREE
// -------------------------------------

contactForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const requiredFields =
            contactForm.querySelectorAll("[required]");

        let formIsValid = true;


        // Validamos recién cuando
        // el usuario presiona Send message

        requiredFields.forEach((field) => {

            const formField =
                field.closest(".form-field");


            if (!field.validity.valid) {

                formField.classList.add(
                    "has-error"
                );

                formIsValid = false;

            } else {

                formField.classList.remove(
                    "has-error"
                );

            }

        });


        // Si hay algún error,
        // detenemos el envío

        if (!formIsValid) {
            return;
        }


        // -------------------------------------
        // FORMSPREE
        // -------------------------------------

        const formData =
            new FormData(contactForm);


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: contactForm.method,

                    body: formData,

                    headers: {
                        Accept: "application/json"
                    }
                }
            );


            if (response.ok) {

                contactForm.reset();


                // Limpia posibles errores

                contactForm
                    .querySelectorAll(".has-error")
                    .forEach((field) => {

                        field.classList.remove(
                            "has-error"
                        );

                    });


                // Ocultamos formulario

                contactHeader.style.display = "none";

                contactForm.style.display = "none";

                closeButton.style.display = "none";


                // Mostramos mensaje de éxito

                contactSuccess.classList.add(
                    "is-visible"
                );


                // Cerramos automáticamente
                // después de 2 segundos

                setTimeout(() => {

                    closeModal();

                }, 2000);


            } else {

                alert(
                    "Sorry, there was a problem sending your message. Please try again."
                );

            }


        } catch (error) {

            alert(
                "Sorry, there was a problem sending your message. Please try again."
            );

        }

    }
);


// -------------------------------------
// REMOVE ERROR AFTER CORRECTION
// -------------------------------------

contactForm
    .querySelectorAll("input, textarea")
    .forEach((field) => {

        field.addEventListener(
            "input",
            () => {

                const formField =
                    field.closest(".form-field");


                // Solo elimina un error existente.
                // Nunca genera uno antes del submit.

                if (
                    formField.classList.contains(
                        "has-error"
                    ) &&
                    field.validity.valid
                ) {

                    formField.classList.remove(
                        "has-error"
                    );

                }

            }
        );

    });


// -------------------------------------
// SCROLL ANIMATIONS
// -------------------------------------

// Elementos con reveal normal

const revealElements =
    document.querySelectorAll(".reveal");


// Featured cards

const revealFullElements =
    document.querySelectorAll(".reveal-full");


// Cards comunes, excluyendo featured

const regularCards =
    document.querySelectorAll(
        ".project-card:not(.project-card--featured)"
    );


// -------------------------------------
// STAGGER CARDS COMUNES
// -------------------------------------

// Desktop:
// repite 0ms, 120ms y 240ms
// en cada fila de tres cards

regularCards.forEach((card, index) => {

    const positionInRow = index % 3;

    card.style.transitionDelay =
        `${positionInRow * 120}ms`;

});


// -------------------------------------
// OBSERVER NORMAL
// -------------------------------------

// Activa el reveal cuando aproximadamente
// el 20% del elemento es visible

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                }

            });

        },
        {
            threshold: 0.2
        }
    );


// -------------------------------------
// OBSERVER FEATURED
// -------------------------------------

const featuredHeading =
    document.querySelector(
        ".featured-heading"
    );


const firstFeaturedCard =
    document.querySelector(
        ".project-card--featured.reveal-full"
    );


// Detectamos el breakpoint
// cuando se carga la página

const isMobileScreen =
    window.innerWidth <= 600;


// Mobile = aparece antes
// Desktop = espera un poco más

const featuredThreshold =
    isMobileScreen ? 0.15 : 0.30;


const fullObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Revela la featured card

                    entry.target.classList.add(
                        "is-visible"
                    );


                    // Cuando aparece la primera
                    // featured card, también
                    // mostramos el heading

                    if (
                        entry.target ===
                        firstFeaturedCard
                    ) {

                        featuredHeading.classList.add(
                            "is-visible"
                        );

                    }

                }

            });

        },
        {
            threshold: featuredThreshold
        }
    );


// -------------------------------------
// ACTIVAR OBSERVERS
// -------------------------------------

// Reveal normal

revealElements.forEach((element) => {

    observer.observe(element);

});


// Featured reveal

revealFullElements.forEach((element) => {

    fullObserver.observe(element);

});

// -------------------------------------
// MOBILE MENU
// -------------------------------------

function openMobileMenu() {

    mainNav.classList.add("is-open");
    menuOverlay.classList.add("is-visible");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}

function closeMobileMenu() {

    mainNav.classList.remove("is-open");
    menuOverlay.classList.remove("is-visible");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


// ABRIR

menuToggle.addEventListener(
    "click",
    openMobileMenu
);


// CERRAR CON X

menuClose.addEventListener(
    "click",
    closeMobileMenu
);


// CERRAR TOCANDO EL OVERLAY

menuOverlay.addEventListener(
    "click",
    closeMobileMenu
);

// =====================================
// PROJECT SIDEBAR — ACTIVE SECTION
// =====================================

const caseSections = document.querySelectorAll(".case-section");
const caseNavLinks = document.querySelectorAll(".case-nav-link");

function updateActiveSection() {

    let currentSection = "";

    caseSections.forEach((section) => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 250) {
            currentSection = section.getAttribute("id");
        }

    });

    caseNavLinks.forEach((link) => {

        link.classList.remove("is-active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("is-active");
        }

    });
}

window.addEventListener("scroll", updateActiveSection);

updateActiveSection();