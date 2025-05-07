
document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);
  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 80 },
      { layer: "2", yPercent: 80 },
      { layer: "3", yPercent: 70 },
      { layer: "4", yPercent: 40 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});
/* Lenis */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {lenis.raf(time * 1000);});
gsap.ticker.lagSmoothing(0);







// Particals 
particlesJS("particles-js", {
    particles: {
        number: { value: 100 },
        size: { value: 3 },
        move: { speed: 2 },
        color: { value: "#ffffff" },
        line_linked: { enable: true, color: "#ffffff" }
    }
});


// New Partical Effect
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        size: Math.random() * 2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();




// Pg-3 Particales Effect
function createParticles() {
  for (let i = 0; i < 20; i++) {
      let particle = document.createElement("div");
      particle.classList.add("particle");
      document.body.appendChild(particle);
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.top = Math.random() * 100 + "vh";
      particle.style.animationDuration = (Math.random() * 5 + 3) + "s";
  }
}

createParticles();