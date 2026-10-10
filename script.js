document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       NAVBAR
    ========================================= */

    const navbar = document.querySelector(".main-navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    /* =========================================
       MOBILE NAVBAR
    ========================================= */

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {
                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarCollapse);

                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId === "#!"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const navbarHeight = navbar
                    ? navbar.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }

        });

    });


    /* =========================================
       AVAILABILITY CHECKER
    ========================================= */

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const guests = document.getElementById("guests");
    const roomType = document.getElementById("roomType");
    const availabilityBtn = document.getElementById("availabilityBtn");
    const availabilityMessage =
        document.getElementById("availabilityMessage");

    function formatDate(date) {

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    }


    if (availabilityBtn) {

        availabilityBtn.addEventListener("click", function () {

            if (!checkIn || !checkOut) return;

            const arrival = new Date(checkIn.value);
            const departure = new Date(checkOut.value);

            if (!checkIn.value || !checkOut.value) {

                availabilityMessage.textContent =
                    "Please select your arrival and departure dates.";

                availabilityMessage.classList.add("show");

                return;
            }

            if (departure <= arrival) {

                availabilityMessage.textContent =
                    "Your departure date must be after your arrival date.";

                availabilityMessage.classList.add("show");

                return;
            }

            const difference =
                departure.getTime() - arrival.getTime();

            const nights =
                Math.ceil(difference / (1000 * 60 * 60 * 24));

            const selectedGuests =
                guests ? guests.value : "2";

            const selectedRoom =
                roomType ? roomType.value : "your selected room";


            availabilityMessage.innerHTML =
                `<strong>${nights} night${nights > 1 ? "s" : ""}</strong>
                · ${selectedGuests} guest${selectedGuests > 1 ? "s" : ""}
                · ${selectedRoom}
                <br>
                <span>Wonderful. Your dates are available to enquire about.</span>`;

            availabilityMessage.classList.add("show");

        });

    }


    /* =========================================
       SET MINIMUM DATE TO TODAY
    ========================================= */

    const today = new Date();

    const todayString =
        today.toISOString().split("T")[0];

    if (checkIn) {
        checkIn.min = todayString;
    }

    if (checkOut) {
        checkOut.min = todayString;
    }


    if (checkIn) {

        checkIn.addEventListener("change", function () {

            if (checkOut) {

                checkOut.min = checkIn.value;

                if (
                    checkOut.value &&
                    checkOut.value <= checkIn.value
                ) {
                    checkOut.value = "";
                }

            }

        });

    }


    /* =========================================
       ROOM DETAILS
    ========================================= */

    const rooms = {

        garden: {
            number: "01",
            title: "The Garden Suite",
            image: "images/room-1.jpg",
            description:
                "A quiet suite opening towards the Mediterranean garden, with linen textures, soft morning light and a private terrace surrounded by greenery.",
            price: "From ₹18,500 / night"
        },

        ocean: {
            number: "02",
            title: "The Ocean Suite",
            image: "images/room-2.jpg",
            description:
                "Our signature sea-facing suite. Designed around expansive views, natural stone, warm timber and long afternoons spent listening to the waves.",
            price: "From ₹24,000 / night"
        },

        sunset: {
            number: "03",
            title: "The Sunset Residence",
            image: "images/room-3.jpg",
            description:
                "A generous private residence created for slow evenings, golden-hour dinners and uninterrupted views across the coast.",
            price: "From ₹31,500 / night"
        }

    };


    const roomLinks =
        document.querySelectorAll(".room-link");

    roomLinks.forEach(function (button) {

        button.addEventListener("click", function () {

            const roomName =
                this.getAttribute("data-room");

            const room = rooms[roomName];

            if (!room) return;

            const modalImage =
                document.getElementById("modalRoomImage");

            const modalNumber =
                document.getElementById("modalRoomNumber");

            const modalTitle =
                document.getElementById("modalRoomTitle");

            const modalDescription =
                document.getElementById("modalRoomDescription");

            const modalPrice =
                document.getElementById("modalRoomPrice");


            if (modalImage) {
                modalImage.src = room.image;
                modalImage.alt = room.title;
            }

            if (modalNumber) {
                modalNumber.textContent = room.number;
            }

            if (modalTitle) {
                modalTitle.textContent = room.title;
            }

            if (modalDescription) {
                modalDescription.textContent =
                    room.description;
            }

            if (modalPrice) {
                modalPrice.textContent =
                    room.price;
            }

        });

    });


    /* =========================================
       GALLERY FILTER
    ========================================= */

    const galleryFilters =
        document.querySelectorAll(".gallery-filter");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    galleryFilters.forEach(function (filter) {

        filter.addEventListener("click", function () {

            const selectedCategory =
                this.getAttribute("data-filter");


            galleryFilters.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");


            galleryItems.forEach(function (item) {

                const itemCategory =
                    item.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory
                ) {

                    item.style.display = "block";

                    setTimeout(function () {
                        item.classList.add("visible");
                    }, 20);

                } else {

                    item.classList.remove("visible");
                    item.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       GALLERY LIGHTBOX
    ========================================= */

    const galleryImages =
        document.querySelectorAll(".gallery-item img");

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    let currentGalleryIndex = 0;


    function visibleGalleryImages() {

        return Array.from(galleryImages).filter(function (image) {

            const item =
                image.closest(".gallery-item");

            return (
                item &&
                window.getComputedStyle(item).display !== "none"
            );

        });

    }


    function openLightbox(image) {

        if (!lightbox || !lightboxImage) return;

        const visibleImages =
            visibleGalleryImages();

        currentGalleryIndex =
            visibleImages.indexOf(image);

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "The Olive House";

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    function showGalleryImage(direction) {

        const visibleImages =
            visibleGalleryImages();

        if (!visibleImages.length) return;

        currentGalleryIndex += direction;


        if (currentGalleryIndex < 0) {
            currentGalleryIndex =
                visibleImages.length - 1;
        }


        if (
            currentGalleryIndex >=
            visibleImages.length
        ) {
            currentGalleryIndex = 0;
        }


        const nextImage =
            visibleImages[currentGalleryIndex];

        if (lightboxImage) {

            lightboxImage.style.opacity = "0";

            setTimeout(function () {

                lightboxImage.src =
                    nextImage.src;

                lightboxImage.alt =
                    nextImage.alt ||
                    "The Olive House";

                lightboxImage.style.opacity = "1";

            }, 150);

        }

    }


    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {
            openLightbox(this);
        });

    });


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            function () {
                showGalleryImage(-1);
            }
        );
    }


    if (lightboxNext) {
        lightboxNext.addEventListener(
            "click",
            function () {
                showGalleryImage(1);
            }
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeLightbox();
            }


            if (event.key === "ArrowLeft") {
                showGalleryImage(-1);
            }


            if (event.key === "ArrowRight") {
                showGalleryImage(1);
            }

        }
    );


    /* =========================================
       TESTIMONIAL SLIDER
    ========================================= */

    const testimonials =
        document.querySelectorAll(".testimonial");

    const testimonialDots =
        document.querySelectorAll(".testimonial-dot");

    const testimonialPrev =
        document.getElementById("testimonialPrev");

    const testimonialNext =
        document.getElementById("testimonialNext");


    let testimonialIndex = 0;


    function showTestimonial(index) {

        if (!testimonials.length) return;


        if (index < 0) {
            testimonialIndex =
                testimonials.length - 1;
        } else if (
            index >= testimonials.length
        ) {
            testimonialIndex = 0;
        } else {
            testimonialIndex = index;
        }


        testimonials.forEach(function (item, i) {

            item.classList.toggle(
                "active",
                i === testimonialIndex
            );

        });


        testimonialDots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === testimonialIndex
            );

        });

    }


    if (testimonialPrev) {

        testimonialPrev.addEventListener(
            "click",
            function () {
                showTestimonial(
                    testimonialIndex - 1
                );
            }
        );

    }


    if (testimonialNext) {

        testimonialNext.addEventListener(
            "click",
            function () {
                showTestimonial(
                    testimonialIndex + 1
                );
            }
        );

    }


    testimonialDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showTestimonial(index);

        });

    });


    showTestimonial(0);


    /* =========================================
       SUMMER ESCAPE MODAL
    ========================================= */

    const offerButton =
        document.getElementById("offerBtn");

    const offerModal =
        document.getElementById("offerModal");


    if (offerButton && offerModal) {

        offerButton.addEventListener(
            "click",
            function () {

                offerModal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    /* =========================================
       CUSTOM MODALS
    ========================================= */

    const closeButtons =
        document.querySelectorAll(
            '[data-close]'
        );


    closeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modalId =
                this.getAttribute("data-close");

            const modal =
                document.getElementById(modalId);

            if (modal) {

                modal.classList.remove("active");

                document.body.style.overflow = "";

            }

        });

    });


    document.querySelectorAll(
        ".custom-modal"
    ).forEach(function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                    document.body.style.overflow =
                        "";

                }

            }
        );

    });


    /* =========================================
       DINING MENU MODAL
    ========================================= */

    const diningButtons =
        document.querySelectorAll(
            ".dining-menu-btn"
        );

    const diningModal =
        document.getElementById("diningModal");


    diningButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (diningModal) {

                diningModal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            }

        });

    });


    /* =========================================
       FAQ ACCORDION
    ========================================= */

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    faqQuestions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                const faqItem =
                    this.closest(".faq-item");

                if (!faqItem) return;


                const alreadyOpen =
                    faqItem.classList.contains("active");


                document.querySelectorAll(
                    ".faq-item"
                ).forEach(function (item) {

                    item.classList.remove("active");

                });


                if (!alreadyOpen) {
                    faqItem.classList.add("active");
                }

            }
        );

    });


    /* =========================================
       BOOKING FORM
    ========================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingCheckIn =
        document.getElementById("bookingCheckIn");

    const bookingCheckOut =
        document.getElementById("bookingCheckOut");

    const formSuccess =
        document.getElementById("formSuccess");


    if (bookingCheckIn) {

        bookingCheckIn.min =
            todayString;

        bookingCheckIn.addEventListener(
            "change",
            function () {

                if (bookingCheckOut) {

                    bookingCheckOut.min =
                        bookingCheckIn.value;

                }

            }
        );

    }


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (
                    bookingCheckIn &&
                    bookingCheckOut &&
                    bookingCheckIn.value &&
                    bookingCheckOut.value
                ) {

                    const arrival =
                        new Date(
                            bookingCheckIn.value
                        );

                    const departure =
                        new Date(
                            bookingCheckOut.value
                        );


                    if (departure <= arrival) {

                        alert(
                            "Please select a departure date after your arrival date."
                        );

                        return;

                    }

                }


                if (formSuccess) {

                    formSuccess.classList.add(
                        "show"
                    );

                    formSuccess.innerHTML =
                        `<strong>Thank you.</strong><br>
                        Your reservation enquiry has been received.
                        We will be in touch shortly.`;

                }


                bookingForm.reset();


                setTimeout(function () {

                    if (formSuccess) {
                        formSuccess.classList.remove(
                            "show"
                        );
                    }

                }, 7000);

            }
        );

    }


    /* =========================================
       NEWSLETTER
    ========================================= */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const newsletterMessage =
        document.getElementById(
            "newsletterMessage"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (
                    !newsletterEmail ||
                    !newsletterEmail.value
                ) {
                    return;
                }


                if (!newsletterEmail.checkValidity()) {

                    newsletterEmail.reportValidity();

                    return;

                }


                if (newsletterMessage) {

                    newsletterMessage.textContent =
                        "You're on the list. Thank you.";

                    newsletterMessage.classList.add(
                        "show"
                    );

                }


                newsletterEmail.value = "";


                setTimeout(function () {

                    if (newsletterMessage) {

                        newsletterMessage.classList.remove(
                            "show"
                        );

                    }

                }, 5000);

            }
        );

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .section-heading, .room-card, .experience-card, .journal-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =========================================
       BACK TO PORTFOLIO
    ========================================= */

    const portfolioButton =
        document.querySelector(
            ".back-to-portfolio"
        );


    if (portfolioButton) {

        portfolioButton.addEventListener(
            "click",
            function () {

                /*
                 The actual portfolio URL is set
                 in the HTML href.

                 We intentionally do not use
                 window.location here so the
                 browser Back button continues
                 to work naturally.
                */

            }
        );

    }


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    document.querySelectorAll("img").forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* =========================================
       PREVENT FORM SUBMISSION ON ENTER
       FOR NON-SUBMIT INPUTS
    ========================================= */

    document.querySelectorAll(
        "input[type='date']"
    ).forEach(function (input) {

        input.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    event.preventDefault();
                }

            }
        );

    });


    /* =========================================
       PAGE READY
    ========================================= */

    document.body.classList.add(
        "page-ready"
    );

});