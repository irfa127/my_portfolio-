// Intersection Observer for Skill Bar Animations
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.2
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                const percent = entry.target.style.getPropertyValue('--percent');
                const offset = 377 - (377 * percent) / 100;
                progressBar.style.strokeDashoffset = offset;
            }
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    // Set initial state to 0% fill
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) progressBar.style.strokeDashoffset = '377';
    skillObserver.observe(card);
});

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    // 1. Move the cursor glow
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

    // 2. Intelligent Background Detection
    // Get the element directly under the cursor
    const element = document.elementFromPoint(e.clientX, e.clientY);

    if (element) {
        const style = window.getComputedStyle(element);
        const bgColor = style.backgroundColor;

        // Check if background is light/white
        if (isLightColor(bgColor)) {
            cursorGlow.classList.add("glow-blue");
        } else {
            // If transparent, traverse up to find a non-transparent parent
            let parent = element.parentElement;
            let foundColor = false;

            while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                const parentBg = parentStyle.backgroundColor;
                if (parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
                    if (isLightColor(parentBg)) {
                        cursorGlow.classList.add("glow-blue");
                        foundColor = true;
                    }
                    break;
                }
                parent = parent.parentElement;
            }
            if (!foundColor) cursorGlow.classList.remove("glow-blue");
        }
    }
});

// Helper to determine if a color is 'light'
function isLightColor(color) {
    // Convert rgb/rgba string to array
    const rgb = color.match(/\d+/g);
    if (!rgb) return false; // Default to dark if can't parse

    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    // Simple brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Threshold > 128 is generally 'light' but let's be strict for white/light-grey
    return brightness > 200;
}
