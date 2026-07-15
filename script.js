const root = document.documentElement;
const scene = document.querySelector("[data-scene]");
const clock = document.querySelector("[data-toronto-time]");
const neighbourhood = document.querySelector("[data-neighbourhood]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const neighbourhoods = ["Ossington", "King West", "Queen West", "College"];
let neighbourhoodIndex = 0;
let pointerFrame = 0;

function updateTorontoTime() {
  const value = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

  if (clock) {
    clock.dateTime = new Date().toISOString();
    clock.textContent = value;
  }
}

function rotateNeighbourhood() {
  if (!neighbourhood || reducedMotion.matches) return;

  neighbourhood.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-0.4rem)" },
    ],
    { duration: 180, easing: "ease", fill: "forwards" },
  ).finished.then(() => {
    neighbourhoodIndex = (neighbourhoodIndex + 1) % neighbourhoods.length;
    neighbourhood.textContent = neighbourhoods[neighbourhoodIndex];
    neighbourhood.animate(
      [
        { opacity: 0, transform: "translateY(0.4rem)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
  });
}

function handlePointerMove(event) {
  if (!scene || reducedMotion.matches || pointerFrame) return;

  pointerFrame = requestAnimationFrame(() => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    root.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
    root.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
    root.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
    root.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
    pointerFrame = 0;
  });
}

requestAnimationFrame(() => root.classList.add("loaded"));
updateTorontoTime();
setInterval(updateTorontoTime, 30_000);
setInterval(rotateNeighbourhood, 2_800);
window.addEventListener("pointermove", handlePointerMove, { passive: true });
