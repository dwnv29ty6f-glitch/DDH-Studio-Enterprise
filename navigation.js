// =====================================
// DDH Studio Enterprise
// navigation.js
// =====================================

// Navigation-Buttons holen

const navButtons =
document.querySelectorAll(".navButton");
// Alle Seiten holen

const seiten =
document.querySelectorAll(".seite");
// Seite anzeigen

function seiteAnzeigen(name){
// Alle Seiten ausblenden

seiten.forEach(seite=>{

    seite.classList.remove(
        "aktiv"
    );

});
function seiteAnzeigen(name){

    // Alle Seiten ausblenden

    seiten.forEach(seite=>{

        seite.classList.remove(
            "aktiv"
        );

    });

    // Gewünschte Seite suchen

    const ziel =
    document.getElementById(
        "seite-" + name
    );

    if(ziel){

        ziel.classList.add(
            "aktiv"
        );

    }

}
// =====================================
// Navigation aktivieren
// =====================================

navButtons.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            const name =
            button.dataset.seite;

            seiteAnzeigen(name);

        }

    );

});
// =====================================
// Startseite
// =====================================

seiteAnzeigen("dashboard");

}