"use strict";

// ==========================================
// Mitarbeiter anzeigen
// ==========================================

function mitarbeiterAnzeigen(){

    dom.mitarbeiterListe.innerHTML = "";

    if(mitarbeiter.length===0){

        dom.mitarbeiterListe.innerHTML =
        "<p>Noch keine Mitarbeiter vorhanden.</p>";

        return;

    }

    mitarbeiter.forEach(person=>{

        const karte =
        document.createElement("div");

        karte.className = "mitarbeiter";

        const name =
        document.createElement("strong");

        name.textContent =
        person.name;

        karte.appendChild(name);

        const buttons =
        document.createElement("div");

        buttons.className =
        "mitarbeiterButtons";
                const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            dom.mitarbeiterName.value =
            person.name;

            mitarbeiter =
            mitarbeiter.filter(m=>m!==person);

            speichern();

            mitarbeiterAnzeigen();

            schichtplanZeichnen();

        };

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            if(!confirm(
                person.name +
                " wirklich löschen?"
            )){
                return;
            }

            mitarbeiter =
            mitarbeiter.filter(m=>m!==person);

            schichten =
            schichten.filter(s=>
                s.name!==person.name
            );

            speichern();

            mitarbeiterAnzeigen();

            schichtplanZeichnen();

            dashboardAktualisieren();

        };

        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        karte.appendChild(buttons);

        dom.mitarbeiterListe.appendChild(karte);

    });
}
// ==========================================
// Mitarbeiter speichern
// ==========================================

dom.mitarbeiterSpeichern.onclick = ()=>{

    const name =
    dom.mitarbeiterName.value.trim();

    if(name===""){
        return;
    }

    if(
        mitarbeiter.some(m=>m.name===name)
    ){

        alert(
            "Mitarbeiter existiert bereits."
        );

        return;

    }

    mitarbeiter.push({

        name:name

    });

    speichern();

    dom.mitarbeiterName.value = "";

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

};
// ==========================================
// Enter = Mitarbeiter speichern
// ==========================================

dom.mitarbeiterName.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Enter"){

            dom.mitarbeiterSpeichern.click();

        }

    }

);
// ==========================================
// Mitarbeiter suchen
// ==========================================

function mitarbeiterSuchen(name){

    return mitarbeiter.find(m=>m.name===name);

}