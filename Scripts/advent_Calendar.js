const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth(); // 11 = December

document.querySelectorAll('.day').forEach(day => {
    const num = parseInt(day.dataset.day);

    // Check if previously opened (saved)
    const wasOpened = localStorage.getItem("day" + num) === "open";

    // DECEMBER restriction
    const isLocked = !(currentMonth === 11 && num <= currentDay);

    if (isLocked && !wasOpened) {
        day.classList.add("locked");
        if (day.tagName === "A") {
            day.addEventListener("click", e => e.preventDefault());
        }
        return;
    }

    // If previously opened → restore it
    if (wasOpened) {
        day.classList.add("open");
    }

    // Click behavior
    day.addEventListener("click", () => {
        if (day.classList.contains("locked")) return;

        // Open the day
        day.classList.add("open");

        // Save it
        localStorage.setItem("day" + num, "open");

        // Play music (if exists)
        const audio = day.querySelector(".music");
        if (audio) audio.play();
    });
});
