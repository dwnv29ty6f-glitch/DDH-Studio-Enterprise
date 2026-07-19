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

    // Alle Buttons zurücksetzen

    navButtons.forEach(button=>{

        button.classList.remove(
            "aktiv"
        );

    });

    // Gewünschte Seite anzeigen

    const ziel =
    document.getElementById(
        "seite-" + name
    );

    if(ziel){

        ziel.classList.add(
            "aktiv"
        );

    }

    // Passenden Button markieren

    const button =
    document.querySelector(

        '.navButton[data-seite="' +
        name +
        '"]'

    );

    if(button){

        button.classList.add(
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
localStorage.setItem(
    "ddhSeite",
    name
);
        }

    );

});
// =====================================
// Startseite
// =====================================

const letzteSeite =
localStorage.getItem(
    "ddhSeite"
);

if(letzteSeite){

    seiteAnzeigen(
        letzteSeite
    );

}else{

    seiteAnzeigen(
        "dashboard"
    );

}

