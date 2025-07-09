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
  start: "top -10",
  onEnter: () => header.classList.add("py-4", "shadow-md"),
  onLeaveBack: () => header.classList.remove("py-4", "shadow-md"),
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
  y: 40,
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
  delay: 0.3,
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
  delay: 0.5,
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
  delay: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "button",
    start: "top 85%",
  },
});

gsap.from(".image img", {
  opacity: 0,
  y: 100,
  scale: 0.9,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".image img",
    start: "top 90%",
  },
});
