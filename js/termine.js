"use strict";

// ==========================================
// Termine anzeigen
// ==========================================

function termineAnzeigen(){

    dom.terminListe.innerHTML = "";

    const liste = termine

        .filter(t=>

            t.tag===ausgewaehlterTag &&
            t.monat===aktuellerMonat &&
            t.jahr===aktuellesJahr

        )

        .sort((a,b)=>

            (a.uhrzeit || "").localeCompare(
                b.uhrzeit || ""
            )

        );

    if(liste.length===0){

        dom.terminListe.innerHTML =
        "<p>Keine Termine vorhanden.</p>";

        return;

    }
        liste.forEach(eintrag=>{

        const box =
        document.createElement("div");

        box.className = "termin";

        const info =
        document.createElement("div");

        info.className = "terminInfo";

        info.innerHTML =

            "<strong>" +

            (eintrag.uhrzeit || "--:--") +

            "</strong><br>" +

            "[" +

            eintrag.kategorie +

            "] " +

            eintrag.text;

        box.appendChild(info);

        const buttons =
        document.createElement("div");

        buttons.className = "terminButtons";
                const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            dom.uhrzeit.value =
            eintrag.uhrzeit;

            dom.kategorie.value =
            eintrag.kategorie;

            dom.termin.value =
            eintrag.text;

            termine =
            termine.filter(t=>t!==eintrag);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            if(!confirm(
                "Termin wirklich löschen?"
            )){
                return;
            }

            termine =
            termine.filter(t=>t!==eintrag);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        dom.terminListe.appendChild(box);

    });
    }

// ==========================================
// Termin speichern
// ==========================================

dom.speichernTermin.onclick = ()=>{

    const text =
    dom.termin.value.trim();

    if(text===""){
        return;
    }

    termine.push({

        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: ausgewaehlterTag,
        uhrzeit: dom.uhrzeit.value,
        kategorie: dom.kategorie.value,
        text: text

    });

    speichern();

    dom.termin.value = "";

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// ==========================================
// Enter = Speichern
// ==========================================

dom.termin.addEventListener("keydown",event=>{

    if(event.key==="Enter"){

        dom.speichernTermin.click();

    }

});