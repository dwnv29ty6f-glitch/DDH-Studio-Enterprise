"use strict";

function kalenderZeichnen(){

    dom.tage.innerHTML = "";

    dom.monatTitel.textContent =
        MONATE[aktuellerMonat] +
        " " +
        aktuellesJahr;

    dom.datumTitel.textContent =
        datumText(
            ausgewaehlterTag,
            aktuellerMonat,
            aktuellesJahr
        );

    const ersterTag =
        ersterWochentag(
            aktuellerMonat,
            aktuellesJahr
        );

    const anzahlTage =
        tageImMonat(
            aktuellerMonat,
            aktuellesJahr
        );

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        leer.className = "tag leer";

        dom.tage.appendChild(leer);

    }
        for(let tag=1;tag<=anzahlTage;tag++){

        const feld =
        document.createElement("div");

        feld.className = "tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add("aktiv");

        }

        const nummer =
        document.createElement("div");

        nummer.className = "tagNummer";
        nummer.textContent = tag;

        feld.appendChild(nummer);

        const anzahlTermine =
        termine.filter(t=>

            t.tag===tag &&
            t.monat===aktuellerMonat &&
            t.jahr===aktuellesJahr

        ).length;

        if(anzahlTermine>0){

            const badge =
            document.createElement("div");

            badge.className = "tagBadge";
            badge.textContent = anzahlTermine;

            feld.appendChild(badge);

        }
                feld.addEventListener("click",()=>{

            ausgewaehlterTag = tag;

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        });

        dom.tage.appendChild(feld);

    }

}

// ===============================
// Monat zurück
// ===============================

dom.btnVorher.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat < 0){

        aktuellerMonat = 11;
        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// ===============================
// Monat weiter
// ===============================

dom.btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat > 11){

        aktuellerMonat = 0;
        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};