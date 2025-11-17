// mobile menu toggle

const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("-translate-x-full");
});

// Desktop-only GSAP animations (>= 1024px)
// Uses gsap.matchMedia + gsap.context for reliable init & cleanup

// make sure GSAP + plugins are loaded before this runs
gsap.registerPlugin(ScrollTrigger, Draggable);

// create matchMedia instance
const mm = gsap.matchMedia();

// media query: desktop and above (1024px)
mm.add("(min-width: 1024px)", () => {
  // keep track of plain event listeners so we can remove them on cleanup
  const plainListeners = [];

  // use gsap.context to scope selectors & let gsap revert kill animations/ScrollTriggers
  const ctx = gsap.context(() => {
    // ===========  Button hover =========== //
    // add hover animations only for desktop
    document.querySelectorAll("#customBtn").forEach((btn) => {
      const onEnter = () => {
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.8,
          ease: "bounce.out",
        });
      };

      const onLeave = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);

      plainListeners.push({ el: btn, type: "mouseenter", handler: onEnter });
      plainListeners.push({ el: btn, type: "mouseleave", handler: onLeave });
    });

    // ==========  sectionTitle =========== //
    gsap.to(".sectionTitle", {
      scrollTrigger: {
        trigger: "#serum-section",
        start: "top 70%",
        toggleActions: "play reverse play reverse",
        markers: false,
      },
      duration: 1.2,
      opacity: 1,
      scale: 1,
      ease: "power3.out",
    });

    // ===========  Header =========== //
    const headerEl = document.querySelector("header");

    if (headerEl) {
      // desktop-only animation (>=1024px)
      if (window.innerWidth >= 1024) {
        gsap.to(headerEl, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            // remove both plain and responsive Tailwind hiding classes
            headerEl.classList.remove(
              "opacity-0",
              "-translate-y-full",
              "lg:opacity-0",
              "lg:-translate-y-full"
            );
            headerEl.style.transform = ""; // clean inline transform
          },
        });

        // ScrollTrigger for header behavior (desktop)
        ScrollTrigger.create({
          start: "top -20",
          onEnter: () => headerEl.classList.add("py-0", "shadow-sm"),
          onLeaveBack: () => headerEl.classList.remove("py-0", "shadow-sm"),
        });

        // nav links entrance (desktop)
        gsap.from("nav a", {
          opacity: 0,
          y: -10,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        });
      } else {
        // mobile: make sure header is visible and remove any hiding classes
        headerEl.classList.remove(
          "opacity-0",
          "-translate-y-full",
          "lg:opacity-0",
          "lg:-translate-y-full"
        );
        headerEl.style.opacity = 1;
        headerEl.style.transform = "";
      }
    }

    // ===========  Hero Section =========== //
    gsap.from(".subtitle", {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".subtitle",
        start: "top 80%",
      },
    });

    gsap.from("h1", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "h1",
        start: "top 80%",
      },
    });

    gsap.from("h3", {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "h3",
        start: "top 85%",
      },
    });

    gsap.from("p", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "p",
        start: "top 85%",
      },
    });

    gsap.from("button", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 1.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "button",
        start: "top 85%",
      },
    });

    gsap.from(".image img", {
      opacity: 0,
      rotate: 180,
      x: 500,
      scale: 0.9,
      delay: 2,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".image img",
        start: "top 90%",
      },
    });

    gsap.from(".imageWrapper", {
      // note: earlier you had opacity defined twice; kept the final intended values
      opacity: 0,
      scale: 0.2,
      rotate: 360,
      y: -1000,
      duration: 2,
      delay: 3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".imageWrapper",
        start: "top 85%",
      },
    });

    // ===========  Product moving =========== //
    const heroImg = document.querySelector("#serumImageHero");
    const aboutImg = document.querySelector("#serumImageAbout");
    const image1 = document.querySelector("#serumImageAbout1");
    const image2 = document.querySelector("#serumImageAbout2");

    // helper deltas (guarded)
    const dx = () => {
      if (!aboutImg || !heroImg) return 0;
      return (
        aboutImg.getBoundingClientRect().left -
        heroImg.getBoundingClientRect().left
      );
    };
    const dy = () => {
      if (!aboutImg || !heroImg) return 0;
      return (
        aboutImg.getBoundingClientRect().top -
        heroImg.getBoundingClientRect().top
      );
    };

    // run the scroll-linked hero->about animation after page load
    const onLoadHandler = () => {
      // recalc deltas on load
      const x = dx();
      const y = dy();

      if (heroImg) {
        gsap.to(heroImg, {
          x: x,
          y: y,
          rotate: 360,
          scale: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#serumImageAbout",
            start: "top bottom",
            end: "top top+=220",
            scrub: 3,
            markers: false,
          },
        });
      }

      if (image1 || image2) {
        gsap.to([image1, image2], {
          opacity: 1,
          duration: 1,
          scale: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#serumImageAbout",
            start: "top center",
            end: "center center",
            scrub: 2,
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        });
      }

      gsap.to(".aboutWrapper", {
        opacity: 0.5,
        rotate: 45,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#serumImageAbout",
          start: "top center",
          end: "center center",
          scrub: 2,
          toggleActions: "play reverse play reverse",
          markers: false,
        },
      });

      gsap.to("#aboutContent", {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: "#serumImageAbout",
          start: "top center",
          end: "center-=50 center",
          scrub: 1,
          markers: false,
        },
      });

      gsap.from("#aboutContent > *", {
        opacity: 0,
        y: 0,
        duration: 0.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          start: "top center",
          end: "top center",
          scrub: true,
          markers: false,
        },
      });
    };

    // attach load listener (desktop only)
    window.addEventListener("load", onLoadHandler);
    plainListeners.push({ el: window, type: "load", handler: onLoadHandler });

    // ===========  Features product =========== //
    gsap.from("#serumImagefeatures", {
      opacity: 0,
      scale: 0.2,
      y: 100,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#featuresSection",
        start: "top center+=100",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    const sequence = ["#feature1", "#feature2", "#feature3", "#feature4"];

    sequence.forEach((id, i) => {
      const feature = document.querySelector(id);
      if (!feature) return;

      gsap.fromTo(
        feature,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#featuresSection",
            start: `top+=${i * 1000} top`,
            end: `top+=${i * 1000 + 400} center`,
            scrub: 1,
            markers: false,
          },
        }
      );

      if (i > 0) {
        const prevFeature = document.querySelector(sequence[i - 1]);
        if (!prevFeature) return;
        gsap.to(prevFeature, {
          opacity: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#featuresSection",
            start: `top+=${i * 1000 - 200} center`,
            end: `top+=${i * 1000} center`,
            scrub: 1,
            markers: false,
          },
        });
      }
    });

    // ===========  why choose Animation =========== //
    gsap.utils.toArray(".why-box").forEach((box, i) => {
      gsap.fromTo(
        box,
        {
          opacity: 0,
          scale: 0.7,
          y: 50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#whyChoose",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.2,
        }
      );

      // Draggable.create returns instances; these are created within gsap.context so revert() should handle
      Draggable.create(box, {
        bounds: "#whyDragArea",
        inertia: true,
        edgeResistance: 0.8,
        type: "x,y",
      });
    });

    // ===========  (commented testimonials block stays commented) =========== //
    // your commented-out testimonials code is left as-is

    // ===========  Serum image stack / big timeline =========== //
    const images = gsap.utils.toArray(".serum-image");
    const centerX = window.innerWidth / 2;

    gsap.set(".serum-content", { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#serum-section",
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    images.forEach((img, index) => {
      const imgRect = img.getBoundingClientRect();
      const imgX = imgRect.left + imgRect.width / 2;
      const distanceToCenter = centerX - imgX;

      tl.to(
        img,
        {
          x: distanceToCenter * 0.7,
          scale: 1.1 + index * 0.05,
          duration: 2,
          ease: "power2.out",
        },
        0
      );
    });

    tl.to(
      images,
      {
        x: "+=400",
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      "+=1"
    );

    tl.to(
      ".serum-content",
      {
        autoAlpha: 1,
        scale: 1.05,
        ease: "power2.out",
        duration: 1.2,
      },
      "+=0.5"
    );

    // ==========  Testimonials Slider Animation =========== //
    gsap.from("#testimonialSection h2", {
      scrollTrigger: {
        trigger: "#testimonialSection",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from("#testimonialSlider", {
      scrollTrigger: {
        trigger: "#testimonialSection",
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.2,
    });

    // Slider Logic (kept but safeguarded)
    let currentIndex = 0;
    const slider = document.getElementById("testimonialSlider");
    const testimonialItems = document.querySelectorAll(".testimonial-item");
    const totalItems = testimonialItems.length;
    const dots = document.querySelectorAll(".testimonial-dot"); // optional

    function updateSlider() {
      const xOffset = -currentIndex * 100;
      if (slider) {
        gsap.to(slider, {
          xPercent: xOffset,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Optional: active dot styling
      if (dots && dots.length) {
        dots.forEach((dot) => dot.classList.remove("opacity-50"));
        dots[currentIndex]?.classList.add("opacity-50");
      }
    }

    // attach next/prev only if buttons exist
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (nextBtn) {
      const nextHandler = () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
      };
      nextBtn.addEventListener("click", nextHandler);
      plainListeners.push({ el: nextBtn, type: "click", handler: nextHandler });
    }

    if (prevBtn) {
      const prevHandler = () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlider();
      };
      prevBtn.addEventListener("click", prevHandler);
      plainListeners.push({ el: prevBtn, type: "click", handler: prevHandler });
    }

    // ========== Dot Image Animation with ScrollTrigger ========== //
    gsap.utils.toArray(".dot").forEach((dot, i) => {
      gsap.fromTo(
        dot,
        {
          autoAlpha: 0,
          scale: 0.5,
        },
        {
          scrollTrigger: {
            trigger: "#testimonialSection",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          autoAlpha: 0.8,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: i * 0.15,
          onComplete: () => {
            gsap.to(dot, {
              y: 30,
              duration: 2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        }
      );
    });

    // ===========  Newsletter =========== //
    gsap.from(".newsletter-box", {
      scrollTrigger: {
        trigger: ".newsletter-box",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".newsletter-box img", {
      scrollTrigger: {
        trigger: ".newsletter-box",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      x: -60,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(".newsletter-box h2, .newsletter-box p", {
      scrollTrigger: {
        trigger: ".newsletter-box",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.3,
      stagger: 0.2,
      ease: "power2.out",
    });

    gsap.from(".newsletter-box form input", {
      scrollTrigger: {
        trigger: ".newsletter-box",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, document); // end gsap.context

  // return cleanup function called by gsap.matchMedia when the MQ no longer matches
  return () => {
    // revert GSAP context (kills timelines, ScrollTriggers created within)
    try {
      ctx.revert();
    } catch (e) {
      // ignore revert errors
    }

    // remove plain JS event listeners we added
    plainListeners.forEach(({ el, type, handler }) => {
      try {
        el.removeEventListener(type, handler);
      } catch (e) {
        /* ignore */
      }
    });

    // extra: kill any remaining ScrollTriggers (defensive)
    try {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    } catch (e) {
      /* ignore */
    }
  };
}); // end matchMedia add
