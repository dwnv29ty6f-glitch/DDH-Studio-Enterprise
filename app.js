// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 1
// Grundsystem
// ==========================================

"use strict";

// ==========================================
// Konstanten
// ==========================================

const MONATE = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

const SCHICHTEN = {
    frueh: {
        kurz: "F",
        name: "Früh"
    },

    spaet: {
        kurz: "S",
        name: "Spät"
    },

    nacht: {
        kurz: "N",
        name: "Nacht"
    },

    frei: {
        kurz: "-",
        name: "Frei"
    },

    urlaub: {
        kurz: "U",
        name: "Urlaub"
    },

    krank: {
        kurz: "K",
        name: "Krank"
    }
};
// ==========================================
// Sollstunden pro Monat
// ==========================================

const SOLLSTUNDEN = 160;
// ==========================================
// Datum
// ==========================================

const heute = new Date();

let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();
let ausgewaehlterTag = heute.getDate();
// ==========================================
// Mehrfachauswahl Schichtplan
// ==========================================

let markierteTage = [];

let markierterMitarbeiter = "";
// ==========================================
// DOM Elemente
// ==========================================

const dom = {

    // Navigation

    navButtons:
    document.querySelectorAll(".navButton"),

    seiten:
    document.querySelectorAll(".seite"),

    // Kalender

    tage:
    document.getElementById("tage"),

    monatTitel:
    document.getElementById("monatTitel"),

    datumTitel:
    document.getElementById("ausgewaehltesDatum"),

    btnVorher:
    document.getElementById("vorherigerMonat"),

    btnWeiter:
    document.getElementById("naechsterMonat"),

    // Termine

    uhrzeit:
    document.getElementById("uhrzeit"),

    kategorie:
    document.getElementById("kategorie"),

    termin:
    document.getElementById("termin"),

    speichernTermin:
    document.getElementById("speichernTermin"),

    terminListe:
    document.getElementById("terminListe"),

    // Aufgaben

    todoProjekt:
    document.getElementById("todoProjekt"),

    todoText:
    document.getElementById("todoText"),

    todoPrioritaet:
    document.getElementById("todoPrioritaet"),

    todoSpeichern:
    document.getElementById("todoSpeichern"),

    todoListe:
    document.getElementById("todoListe"),

    // Dashboard

    heuteTermine:
    document.getElementById("heuteTermine"),

    offeneTodos:
    document.getElementById("offeneTodos"),

    hohePrioritaet:
    document.getElementById("hohePrioritaet"),

    erledigteTodos:
    document.getElementById("erledigteTodos"),

    dashboardTodos:
    document.getElementById("dashboardTodos"),

    dashboardSchichten:
    document.getElementById("dashboardSchichten"),

    // Schichtplan

    mitarbeiterName:
    document.getElementById("mitarbeiterName"),

    mitarbeiterSpeichern:
    document.getElementById("mitarbeiterSpeichern"),

    mitarbeiterListe:
    document.getElementById("mitarbeiterListe"),

    schichtHeader:
    document.getElementById("schichtHeader"),

    schichtBody:
    document.getElementById("schichtplanBody"),

    schichtMonat:
    document.getElementById("schichtMonat"),

    schichtVorher:
    document.getElementById("schichtVorherigerMonat"),

    schichtWeiter:
    document.getElementById("schichtNaechsterMonat")

};

// ==========================================
// Daten
// ==========================================

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || [];

let todos =
JSON.parse(
localStorage.getItem("ddhTodos")
) || [];

let mitarbeiter =
JSON.parse(
localStorage.getItem("ddhMitarbeiter")
) || [];

let schichten =
JSON.parse(
localStorage.getItem("ddhSchichten")
) || [];

let dokumente =
JSON.parse(
localStorage.getItem("ddhDokumente")
) || [];

let kunden =
JSON.parse(
localStorage.getItem("ddhKunden")
) || [];

let projekte =
JSON.parse(
localStorage.getItem("ddhProjekte")
) || [];
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 2
// Hilfsfunktionen & Speicher
// ==========================================

// ==========================================
// Daten speichern
// ==========================================

function speichern(){

    localStorage.setItem(
        "ddhTermine",
        JSON.stringify(termine)
    );

    localStorage.setItem(
        "ddhTodos",
        JSON.stringify(todos)
    );

    localStorage.setItem(
        "ddhMitarbeiter",
        JSON.stringify(mitarbeiter)
    );

    localStorage.setItem(
        "ddhSchichten",
        JSON.stringify(schichten)
    );

    localStorage.setItem(
        "ddhDokumente",
        JSON.stringify(dokumente)
    );

    localStorage.setItem(
        "ddhKunden",
        JSON.stringify(kunden)
    );

    localStorage.setItem(
        "ddhProjekte",
        JSON.stringify(projekte)
    );

}

// ==========================================
// Datum formatieren
// ==========================================

function datumText(tag,monat,jahr){

    return (

        tag +

        ". " +

        MONATE[monat] +

        " " +

        jahr

    );

}

// ==========================================
// Tage im Monat
// ==========================================

function tageImMonat(monat,jahr){

    return new Date(

        jahr,

        monat + 1,

        0

    ).getDate();

}

// ==========================================
// Wochentag erster Monatstag
// Montag = 1
// ==========================================

function ersterWochentag(monat,jahr){

    let tag = new Date(

        jahr,

        monat,

        1

    ).getDay();

    if(tag===0){

        tag=7;

    }

    return tag;

}

// ==========================================
// Schichttext
// ==========================================

function schichtKurz(typ){

    if(!SCHICHTEN[typ]){

        return "";

    }

    return SCHICHTEN[typ].kurz;

}

// ==========================================
// Schichtname
// ==========================================

function schichtName(typ){

    if(!SCHICHTEN[typ]){

        return "";

    }

    return SCHICHTEN[typ].name;

}
// ==========================================
// Schichtstunden
// ==========================================

function schichtStunden(typ){

    switch(typ){

        case "frueh":
            return 8;

        case "spaet":
            return 8;

        case "nacht":
            return 10;

        case "frei":
        case "urlaub":
        case "krank":
        default:
            return 0;

    }

}
// ==========================================
// Schicht suchen
// ==========================================

function schichtSuchen(name,tag){

    return schichten.find(s=>

        s.name===name &&

        s.tag===tag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

}

// ==========================================
// Schicht löschen
// ==========================================

function schichtLoeschen(name,tag){

    schichten = schichten.filter(s=>

        !(

            s.name===name &&

            s.tag===tag &&

            s.monat===aktuellerMonat &&

            s.jahr===aktuellesJahr

        )

    );

    speichern();

}

// ==========================================
// Navigation
// ==========================================

function seiteAnzeigen(name){

    dom.seiten.forEach(seite=>{

        seite.classList.remove("aktiv");

    });

    dom.navButtons.forEach(button=>{

        button.classList.remove("aktiv");

    });

    const ziel = document.getElementById(

        "seite-" + name

    );

    if(ziel){

        ziel.classList.add("aktiv");

    }

    const button = document.querySelector(

        '.navButton[data-seite="' +

        name +

        '"]'

    );

    if(button){

        button.classList.add("aktiv");

    }

    localStorage.setItem(

        "ddhSeite",

        name

    );

}

// ==========================================
// Navigation starten
// ==========================================

dom.navButtons.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            seiteAnzeigen(

                button.dataset.seite

            );

        }

    );

});
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 3
// Kalender
// ==========================================

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

    // Leere Felder

    for(

        let i=1;

        i<ersterTag;

        i++

    ){

        const leer =
        document.createElement("div");

        leer.className =
        "tag leer";

        dom.tage.appendChild(leer);

    }

    // Kalendertage

    for(

        let tag=1;

        tag<=anzahlTage;

        tag++

    ){

        const feld =
        document.createElement("div");

        feld.className =
        "tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add(
                "aktiv"
            );

        }

        // Tagesnummer

        const nummer =
        document.createElement("div");

        nummer.className =
        "tagNummer";

        nummer.textContent =
        tag;

        feld.appendChild(
            nummer
        );

        // Termine zählen

        const anzahlTermine =
        termine.filter(t=>

            t.tag===tag &&

            t.monat===aktuellerMonat &&

            t.jahr===aktuellesJahr

        ).length;

        if(anzahlTermine>0){

            const badge =
            document.createElement("div");

            badge.className =
            "tagBadge";

            badge.textContent =
            anzahlTermine;

            feld.appendChild(
                badge
            );

        }

        feld.addEventListener(

            "click",

            ()=>{

                ausgewaehlterTag =
                tag;

                kalenderZeichnen();

                termineAnzeigen();

                dashboardAktualisieren();

            }

        );

        dom.tage.appendChild(
            feld
        );

    }

}

// ==========================================
// Kalender Monat zurück
// ==========================================

dom.btnVorher.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;

        aktuellesJahr--;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// ==========================================
// Kalender Monat weiter
// ==========================================

dom.btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;

        aktuellesJahr++;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 4
// Termine
// ==========================================

// ==========================================
// Termine eines Tages anzeigen
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

        box.className =
        "termin";

        // -------------------------
        // Inhalt
        // -------------------------

        const info =
        document.createElement("div");

        info.className =
        "terminInfo";

        info.innerHTML =

            "<strong>" +

            (eintrag.uhrzeit || "--:--") +

            "</strong><br>" +

            "[" +

            eintrag.kategorie +

            "] " +

            eintrag.text;

        box.appendChild(info);

        // -------------------------
        // Buttons
        // -------------------------

        const buttons =
        document.createElement("div");

        buttons.className =
        "terminButtons";

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

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

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

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

        buttons.appendChild(
            bearbeiten
        );

        buttons.appendChild(
            loeschen
        );

        box.appendChild(
            buttons
        );

        dom.terminListe.appendChild(
            box
        );

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

        jahr:
        aktuellesJahr,

        monat:
        aktuellerMonat,

        tag:
        ausgewaehlterTag,

        uhrzeit:
        dom.uhrzeit.value,

        kategorie:
        dom.kategorie.value,

        text:
        text

    });

    speichern();

    dom.termin.value = "";

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// ==========================================
// Enter = Termin speichern
// ==========================================

dom.termin.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Enter"){

            dom.speichernTermin.click();

        }

    }

);
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 5
// Aufgaben
// ==========================================

function todosAnzeigen(){

    dom.todoListe.innerHTML = "";

    const projekt =
    dom.todoProjekt.value;

    const liste = todos.filter(todo=>

        todo.projekt===projekt

    );

    if(liste.length===0){

        dom.todoListe.innerHTML =
        "<p>Keine Aufgaben vorhanden.</p>";

        return;

    }

    liste.forEach(todo=>{

        const box =
        document.createElement("div");

        box.className =
        "todo " +
        todo.prioritaet;

        if(todo.erledigt){

            box.classList.add(
                "erledigt"
            );

        }

        // -------------------------
        // Titel
        // -------------------------

        const titel =
        document.createElement("div");

        titel.className =
        "todoText";

        titel.textContent =
        todo.text;

        box.appendChild(titel);

        // -------------------------
        // Informationen
        // -------------------------

        const info =
        document.createElement("div");

        info.className =
        "todoInfo";

        info.textContent =

        "📁 " +

        todo.projekt +

        " • " +

        todo.prioritaet;

        box.appendChild(info);

        // -------------------------
        // Buttons
        // -------------------------

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        // Erledigt

        const fertig =
        document.createElement("button");

        fertig.textContent =
        "✔";

        fertig.onclick=()=>{

            todo.erledigt =
            !todo.erledigt;

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            dom.todoText.value =
            todo.text;

            dom.todoPrioritaet.value =
            todo.prioritaet;

            dom.todoProjekt.value =
            todo.projekt;

            todos =
            todos.filter(t=>t!==todo);

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            if(!confirm(

                "Aufgabe wirklich löschen?"

            )){

                return;

            }

            todos =
            todos.filter(t=>t!==todo);

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(fertig);
        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        dom.todoListe.appendChild(box);

    });

}

// ==========================================
// Aufgabe speichern
// ==========================================

dom.todoSpeichern.onclick=()=>{

    const text =
    dom.todoText.value.trim();

    if(text===""){

        return;

    }

    todos.push({

        projekt:
        dom.todoProjekt.value,

        text:
        text,

        prioritaet:
        dom.todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    dom.todoText.value="";

    todosAnzeigen();

    dashboardAktualisieren();

};

// ==========================================
// Projekt wechseln
// ==========================================

dom.todoProjekt.onchange=()=>{

    todosAnzeigen();

};

// ==========================================
// Enter = Aufgabe speichern
// ==========================================

dom.todoText.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Enter"){

            dom.todoSpeichern.click();

        }

    }

);
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 6
// Dashboard
// ==========================================

function dashboardAktualisieren(){

    // ======================================
    // Termine heute
    // ======================================

    const termineHeute = termine.filter(t=>

        t.tag===ausgewaehlterTag &&

        t.monat===aktuellerMonat &&

        t.jahr===aktuellesJahr

    );

    dom.heuteTermine.textContent =
    termineHeute.length;

    // ======================================
    // Aufgaben
    // ======================================

    const offene =
    todos.filter(t=>!t.erledigt);

    const erledigte =
    todos.filter(t=>t.erledigt);

    const hohe =
    todos.filter(t=>

        !t.erledigt &&

        t.prioritaet==="hoch"

    );

    dom.offeneTodos.textContent =
    offene.length;

    dom.erledigteTodos.textContent =
    erledigte.length;

    dom.hohePrioritaet.textContent =
    hohe.length;

    // ======================================
    // Nächste Aufgaben
    // ======================================

    dom.dashboardTodos.innerHTML = "";

    if(offene.length===0){

        dom.dashboardTodos.innerHTML =
        "<p>Keine offenen Aufgaben.</p>";

    }else{

        offene
        .slice(0,5)
        .forEach(todo=>{

            const box =
            document.createElement("div");

            box.className =
            "dashboardTodo";

            box.innerHTML =

                "<strong>" +

                todo.text +

                "</strong><br>" +

                "📁 " +

                todo.projekt +

                " • " +

                todo.prioritaet;

            dom.dashboardTodos.appendChild(
                box
            );

        });

    }

    // ======================================
    // Mitarbeiter im Dienst
    // ======================================

    dom.dashboardSchichten.innerHTML = "";

    const heuteSchichten =
    schichten.filter(s=>

        s.tag===ausgewaehlterTag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(heuteSchichten.length===0){

        dom.dashboardSchichten.innerHTML =
        "<p>Keine Schichten vorhanden.</p>";

        return;

    }

    heuteSchichten.forEach(eintrag=>{

        const box =
        document.createElement("div");

        box.className =
        "dashboardTodo";

        box.innerHTML =

            "<strong>" +

            eintrag.name +

            "</strong><br>" +

            schichtName(
                eintrag.typ
            );

        dom.dashboardSchichten.appendChild(
            box
        );

    });

}
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 7
// Mitarbeiter & Schichtplan
// ==========================================

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

        karte.className =
        "mitarbeiter";

        // --------------------------
        // Name
        // --------------------------

        const name =
        document.createElement("strong");

        name.textContent =
        person.name;

        karte.appendChild(name);

        // --------------------------
        // Buttons
        // --------------------------

        const buttons =
        document.createElement("div");

        buttons.className =
        "mitarbeiterButtons";

        // Bearbeiten

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

        // Löschen

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

    dom.mitarbeiterName.value="";

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
// Schichtplan zeichnen
// ==========================================

function schichtplanZeichnen(){

    dom.schichtHeader.innerHTML =
    "<th>Mitarbeiter</th>";

    dom.schichtBody.innerHTML = "";

    dom.schichtMonat.textContent =

        MONATE[aktuellerMonat] +

        " " +

        aktuellesJahr;

    const tage =
    tageImMonat(
        aktuellerMonat,
        aktuellesJahr
    );

    // --------------------------
    // Kopfzeile
    // --------------------------

    for(let tag=1; tag<=tage; tag++){

        const th =
        document.createElement("th");

        th.textContent = tag;

        dom.schichtHeader.appendChild(th);

    }

    // --------------------------
    // Mitarbeiter
    // --------------------------

    mitarbeiter.forEach(person=>{

        const tr =
        document.createElement("tr");

        const tdName =
document.createElement("td");

// Monatsstunden berechnen
let frueh = 0;
let spaet = 0;
let nacht = 0;
const stunden =
schichten
.filter(s=>

    s.name===person.name &&

    s.monat===aktuellerMonat &&

    s.jahr===aktuellesJahr

)
.reduce(

   (summe,s)=>{

    if(s.typ==="frueh") frueh++;
    if(s.typ==="spaet") spaet++;
    if(s.typ==="nacht") nacht++;

    return summe +
    schichtStunden(s.typ);

},

    0

);

let info;

if(stunden > SOLLSTUNDEN){

    info =
    "+" +
    (stunden - SOLLSTUNDEN) +
    " Überstunden";

}else{

    info =
    "Rest: " +
    (SOLLSTUNDEN - stunden) +
    " Std.";

}

tdName.innerHTML =

"<strong>" +
person.name +
"</strong><br>" +

"🕒 " +
stunden +
" / " +
SOLLSTUNDEN +
" Std.<br>" +

info;
tr.appendChild(tdName);

        // --------------------------
        // Schichtzellen
        // --------------------------

        for(let tag=1; tag<=tage; tag++){

            const td =
            document.createElement("td");

            td.className =
            "schichtZelle";

            const eintrag =
            schichtSuchen(
                person.name,
                tag
            );

            if(eintrag){

                const box =
                document.createElement("div");

                box.className =
                "schicht " +
                eintrag.typ;

                box.textContent =
                schichtKurz(
                    eintrag.typ
                );

                td.appendChild(box);

            }

            // Bereits markiert?

            if(
                markierterMitarbeiter===person.name &&
                markierteTage.includes(tag)
            ){

                td.classList.add("markiert");

            }

            td.addEventListener("click",()=>{

                // anderer Mitarbeiter

                if(
                    markierterMitarbeiter!==person.name
                ){

                    markierterMitarbeiter =
                    person.name;

                    markierteTage = [];

                    document
                    .querySelectorAll(
                        ".schichtZelle.markiert"
                    )
                    .forEach(z=>
                        z.classList.remove(
                            "markiert"
                        )
                    );

                }

                // Bereits markiert?

                if(
                    markierteTage.includes(tag)
                ){

                    // Dialog öffnen

                    schichtBearbeiten(
                        person.name,
                        tag
                    );

                    return;

                }

                // Tag markieren

                markierteTage.push(tag);

                td.classList.add(
                    "markiert"
                );

            });

            tr.appendChild(td);

        }

        dom.schichtBody.appendChild(tr);

    });

}

// ==========================================
// Schichtmonat zurück
// ==========================================

if(dom.schichtVorher){

    dom.schichtVorher.onclick = ()=>{

        aktuellerMonat--;

        if(aktuellerMonat<0){

            aktuellerMonat = 11;
            aktuellesJahr--;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}

// ==========================================
// Schichtmonat weiter
// ==========================================

if(dom.schichtWeiter){

    dom.schichtWeiter.onclick = ()=>{

        aktuellerMonat++;

        if(aktuellerMonat>11){

            aktuellerMonat = 0;
            aktuellesJahr++;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 9
// Schichten bearbeiten
// ==========================================

function schichtBearbeiten(name,tag){

    const dialog =
    document.getElementById("schichtDialog");

    const titel =
    document.getElementById("schichtDialogTitel");

    const loeschen =
    document.getElementById("schichtLoeschen");

    const abbrechen =
    document.getElementById("schichtAbbrechen");

    titel.textContent =
    name + " • Tage: " +
    markierteTage.join(", ");

    dialog.classList.add("aktiv");

    function auswahlZuruecksetzen(){

        markierteTage = [];
        markierterMitarbeiter = "";

        document
        .querySelectorAll(".schichtZelle.markiert")
        .forEach(z=>{

            z.classList.remove("markiert");

        });

    }

    function schliessen(){

        dialog.classList.remove("aktiv");

        auswahlZuruecksetzen();

    }

    // ----------------------------------
    // Schichtbuttons
    // ----------------------------------

    document
    .querySelectorAll(".schichtAuswahl")
    .forEach(button=>{

        button.onclick = ()=>{

            const typ =
            button.dataset.schicht;

            markierteTage.forEach(t=>{

                const vorhanden =
                schichtSuchen(
                    name,
                    t
                );

                if(vorhanden){

                    vorhanden.typ = typ;

                }else{

                    schichten.push({

                        name:name,

                        tag:t,

                        monat:aktuellerMonat,

                        jahr:aktuellesJahr,

                        typ:typ

                    });

                }

            });

            speichern();

            schichtplanZeichnen();

            dashboardAktualisieren();

            schliessen();

        };

    });

    // ----------------------------------
    // Löschen
    // ----------------------------------

    loeschen.onclick = ()=>{

        markierteTage.forEach(t=>{

            schichtLoeschen(
                name,
                t
            );

        });

        speichern();

        schichtplanZeichnen();

        dashboardAktualisieren();

        schliessen();

    };

    // ----------------------------------
    // Abbrechen
    // ----------------------------------

    abbrechen.onclick = ()=>{

        schliessen();

    };

    // ----------------------------------
    // Klick außerhalb
    // ----------------------------------

    dialog.onclick = event=>{

        if(event.target===dialog){

            schliessen();

        }

    };

}
// ==========================================
// DDH Studio Enterprise 9.0
// app.js
// Teil 10
// Initialisierung
// ==========================================

// --------------------------
// Aktuelle Uhrzeit
// --------------------------

const jetzt = new Date();

if(dom.uhrzeit){

    dom.uhrzeit.value =

        String(
            jetzt.getHours()
        ).padStart(2,"0")

        +

        ":"

        +

        String(
            jetzt.getMinutes()
        ).padStart(2,"0");

}

// --------------------------
// Daten laden
// --------------------------

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

mitarbeiterAnzeigen();

schichtplanZeichnen();

dashboardAktualisieren();
const btnSchichtBearbeiten =
document.getElementById(
    "schichtBearbeitenButton"
);

if(btnSchichtBearbeiten){

    btnSchichtBearbeiten.onclick = ()=>{

        if(markierterMitarbeiter===""){

            alert(
                "Bitte zuerst einen Mitarbeiter auswählen."
            );

            return;
        }

        if(markierteTage.length===0){

            alert(
                "Bitte zuerst Tage markieren."
            );

            return;
        }

        schichtBearbeiten(

            markierterMitarbeiter,

            markierteTage[0]

        );

    };

}
// --------------------------
// Letzte Seite öffnen
// --------------------------

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

// ==========================================
// DDH Studio Enterprise 9.0
// Bereit
// ==========================================

console.log(

    "DDH Studio Enterprise 9.0 gestartet."

);
const btnDienstplan =
document.getElementById("druckDienstplan");

if(btnDienstplan){

    btnDienstplan.onclick = ()=>{

    let html = `
    <html>
    <head>
    <title>Dienstplan</title>

    <style>

    body{
        font-family:Arial;
        margin:20px;
    }

    table{
        width:100%;
        border-collapse:collapse;
        font-size:12px;
    }

    th,td{
        border:1px solid #000;
        padding:4px;
        text-align:center;
    }

    th{
        background:#eee;
    }

    </style>

    </head>

    <body>

    <h2>DDH Studio Enterprise</h2>

    <h3>Dienstplan ` + MONATE[aktuellerMonat] + ` ` + aktuellesJahr + `</h3>

    <table>

    <tr>

    <th>Mitarbeiter</th>
    `;

    const tage =
    tageImMonat(
        aktuellerMonat,
        aktuellesJahr
    );

    for(let tag=1;tag<=tage;tag++){

        html += "<th>"+tag+"</th>";

    }

    html += "</tr>";
mitarbeiter.forEach(person=>{

    html += "<tr>";

    html += "<td><b>"+person.name+"</b></td>";

    for(let tag=1;tag<=tage;tag++){

        const eintrag =
        schichten.find(s=>

            s.name===person.name &&

            s.tag===tag &&

            s.monat===aktuellerMonat &&

            s.jahr===aktuellesJahr

        );

        html += "<td>";

        if(eintrag){

    html += "<b>" + schichtKurz(eintrag.typ) + "</b>";

}else{

    html += "-";

}
        html += "</td>";

    }

    html += "</tr>";

});
const fenster = window.open("", "_blank");

fenster.document.write(`
<html>
<head>
<title>Dienstplan</title>
<style>
body{
font-family:Arial;
padding:20px;
}

h1{
text-align:center;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #000;
padding:5px;
text-align:center;
}

th{
background:#eeeeee;
}
</style>
</head>
<body>

<h1>Dienstplan ${MONATE[aktuellerMonat]} ${aktuellesJahr}</h1>

${html}

</body>
</html>
`);

fenster.document.close();
fenster.print();

    };
    
}

const btnArbeitszeit =
document.getElementById("druckArbeitszeit");

if(btnArbeitszeit){

    btnArbeitszeit.onclick = ()=>{

        alert("Arbeitszeitnachweis funktioniert.");

    };

}