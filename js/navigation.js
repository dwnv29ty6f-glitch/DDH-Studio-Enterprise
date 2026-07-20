document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".navButton");
    const seiten = document.querySelectorAll(".seite");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Aktiven Status der Buttons wechseln
            navButtons.forEach(b => b.classList.remove("aktiv"));
            btn.classList.add("aktiv");

            // Seiten umschalten
            seiten.forEach(s => s.classList.remove("aktiv"));
            const zielSeite = document.getElementById("seite-" + btn.dataset.seite);
            if (zielSeite) zielSeite.classList.add("aktiv");
        });
    });
});