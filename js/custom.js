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
  onEnter: () => header.classList.add("py-0", "shadow-md"),
  onLeaveBack: () => header.classList.remove("py-0", "shadow-md"),
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

gsap.from(".price", {
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  delay: 1.5,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".price",
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

  // 1. Animate parent wrapper into view (remove Tailwind hiding)
  // Show #aboutContent (undo opacity-0 & translate-y-12 from Tailwind)
  gsap.to("#aboutContent", {
    opacity: 1,
    y: 0, // removes translate-y-12
    ease: "none",
    duration: 2,
    scrollTrigger: {
      trigger: "#serumImageAbout",
      start: "top center",
      end: "center-=50 center",
      scrub: 3,
      markers: false,
    },
  });

  // 2. Animate each child element
  gsap.from("#aboutContent > *", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    stagger: 1,
    scrollTrigger: {
      // trigger: "#serumImageAbout",
      start: "top center",
      end: "center center",
      scrub: true,
      markers: false,
    },
  });
});

// ===========  Features product =========== //

gsap.registerPlugin(ScrollTrigger);

// Center image fade-in once at section entry
gsap.to("#centerImage", {
  opacity: 1,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#featuresSection",
    start: "top center",
    end: "center bottom-=500",
    toggleActions: "play reverse play reverse",
    markers: false,
  },
});

// Sequential feature fade in/out
const sequence = ["#feature1", "#feature2", "#feature3", "#feature4"];

sequence.forEach((id, i) => {
  const feature = document.querySelector(id);

  gsap.fromTo(
    feature,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#featuresSection",
        start: `top+=${i * 500 + 500} center`,
        end: `top+=${i * 500 + 560} center`,
        toggleActions: "play reverse play reverse",
        scrub: true,
        markers: true,
      },
    }
  );

  // Hide previous feature (if exists)
  if (i > 0) {
    const prevFeature = document.querySelector(sequence[i - 1]);
    gsap.to(prevFeature, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#featuresSection",
        start: `top+=${i * 500 + 60} center`,
        end: `top+=${i * 300 + 100} center`,
        scrub: true,
      },
    });
  }
});
