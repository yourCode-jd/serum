// ===========  Button hover =========== //

document.querySelectorAll("#customBtn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.1,
      duration: 0.8,
      ease: "bounce.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  });
});
// ===========  Header =========== //

gsap.to("header", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power2.out",
  onComplete: () => {
    const header = document.querySelector("header");
    header.classList.remove("opacity-0", "-translate-y-full");
    header.style.transform = ""; // Clean inline style if needed
  },
});

let header = document.querySelector("header");

ScrollTrigger.create({
  start: "top -20",
  onEnter: () => header.classList.add("py-0", "shadow-sm"),
  onLeaveBack: () => header.classList.remove("py-0", "shadow-sm"),
});

gsap.from("nav a", {
  opacity: 0,
  y: -10,
  duration: 0.5,
  stagger: 0.1,
  delay: 0.5,
  ease: "power2.out",
});

// ===========  Hero Section =========== //

gsap.registerPlugin(ScrollTrigger);

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

// gsap.from(".price", {
//   scale: 0.9,
//   opacity: 0,
//   duration: 0.8,
//   delay: 1.5,
//   ease: "back.out(1.7)",
//   scrollTrigger: {
//     trigger: ".price",
//     start: "top 85%",
//   },
// });

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
  opacity: 0.8,
  scale: 0.2,
  rotate: 360,
  opacity: 0,
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

// ✅ Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const heroImg = document.querySelector("#serumImageHero");
const aboutImg = document.querySelector("#serumImageAbout");
const image1 = document.querySelector("#serumImageAbout1");
const image2 = document.querySelector("#serumImageAbout2");

// Get delta X/Y between hero and about image
const dx = () =>
  aboutImg.getBoundingClientRect().left - heroImg.getBoundingClientRect().left;
const dy = () =>
  aboutImg.getBoundingClientRect().top - heroImg.getBoundingClientRect().top;

window.addEventListener("load", () => {
  const x = dx();
  const y = dy();

  // 1. Animate Hero Image → About Image on scroll
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

  // 2. Side product images fade-in/out on scroll
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

  // 1. Animate parent wrapper into view (remove Tailwind hiding)
  // Show #aboutContent (undo opacity-0 & translate-y-12 from Tailwind)
  gsap.to("#aboutContent", {
    opacity: 1,
    y: 0, // removes translate-y-12
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

  // 2. Animate each child element
  gsap.from("#aboutContent > *", {
    opacity: 0,
    y: 0,
    duration: 0.2,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      // trigger: "#serumImageAbout",
      start: "top center",
      end: "top center",
      scrub: true,
      markers: false,
    },
  });
});

// ===========  Features product =========== //

gsap.registerPlugin(ScrollTrigger);

// Center image animation on entry
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

// Sequential features with better spacing
const sequence = ["#feature1", "#feature2", "#feature3", "#feature4"];

sequence.forEach((id, i) => {
  const feature = document.querySelector(id);

  // Show current feature
  gsap.fromTo(
    feature,
    { opacity: 0 },
    {
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#featuresSection",
        start: `top+=${i * 1000} top`, // start at different times
        end: `top+=${i * 1000 + 400} center`, // longer hold
        scrub: 1,
        markers: false,
      },
    }
  );

  // Hide previous feature
  if (i > 0) {
    const prevFeature = document.querySelector(sequence[i - 1]);
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
gsap.registerPlugin(ScrollTrigger, Draggable);

// Animate boxes on scroll
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

  // Enable drag inside container
  Draggable.create(box, {
    bounds: "#whyDragArea",
    inertia: true,
    edgeResistance: 0.8,
    type: "x,y",
  });
});

// ===========  Testimonials Animation =========== //

// gsap.registerPlugin(ScrollTrigger);

// const items = gsap.utils.toArray(".serumStack");

// items.forEach((item, i) => {
//   const offset = i * 60;
//   how much each is shifted initially

//   Set initial position
//   gsap.set(item, {
//     xPercent: -50,
//     yPercent: -50,
//     x: `${offset * 3}px`,
//     y: `${-offset * 1.5}px`,
//     scale: 1.2,
//     opacity: 0,
//     zIndex: i,
//   });

//   Animate each one stacking to center
//   gsap.to(item, {
//     x: 0,
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: "#productScrollStack",
//       start: `top+=${i * 150 + 200} center`,
//       end: `top+=${i * 200 + 300} center`,
//       scrub: 2,
//       markers: false,
//     },
//   });
// });

gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".serum-image");
const centerX = window.innerWidth / 2;

// Hide content initially
gsap.set(".serum-content", { autoAlpha: 0 });

// Main timeline (scroll controlled)
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#serum-section",
    start: "top top",
    end: "+=3000", // longer scroll, smoother motion
    scrub: true,
    pin: true,
    markers: false,
  },
});

// Step 1: move images to center
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

// Step 2: slide images to the right
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

// Step 3: show content AFTER image animation
tl.to(
  ".serum-content",
  {
    autoAlpha: 1,
    scale: 1.05,
    ease: "power2.out",
    duration: 1.2,
  },
  "+=0.5"
); // starts after images have moved out
