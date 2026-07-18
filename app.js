// =====================================
// DDH Studio Enterprise 7.0
// app.js
// Teil 1
// Variablen & Daten
// =====================================

// -------------------------
// Monate
// -------------------------

const monate = [
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

// -------------------------
// Navigation
// -------------------------

const navButtons =
document.querySelectorAll(".navButton");

const seiten =
document.querySelectorAll(".seite");

// -------------------------
// Kalender
// -------------------------

const tage =
document.getElementById("tage");

const monatTitel =
document.getElementById("monatTitel");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");

// -------------------------
// Termine
// -------------------------

const uhrzeit =
document.getElementById("uhrzeit");

const kategorie =
document.getElementById("kategorie");

const termin =
document.getElementById("termin");

const speichernTermin =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

// -------------------------
// Aufgaben
// -------------------------

const todoProjekt =
document.getElementById("todoProjekt");

const todoText =
document.getElementById("todoText");

const todoPrioritaet =
document.getElementById("todoPrioritaet");

const todoSpeichern =
document.getElementById("todoSpeichern");

const todoListe =
document.getElementById("todoListe");

// -------------------------
// Dashboard
// -------------------------

const heuteTermine =
document.getElementById("heuteTermine");

const offeneTodos =
document.getElementById("offeneTodos");

const hohePrioritaet =
document.getElementById("hohePrioritaet");

const erledigteTodos =
document.getElementById("erledigteTodos");

const dashboardTodos =
document.getElementById("dashboardTodos");

// -------------------------
// Schichtplan
// -------------------------

const mitarbeiterName =
document.getElementById("mitarbeiterName");

const mitarbeiterSpeichern =
document.getElementById("mitarbeiterSpeichern");

const mitarbeiterListe =
document.getElementById("mitarbeiterListe");

const schichtplanBody =
document.getElementById("schichtplanBody");

// -------------------------
// Datum
// -------------------------

const heute =
new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag =
heute.getDate();

// =====================================
// LocalStorage
// =====================================

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || [];

let todos =
JSON.parse(
localStorage.getItem("ddhTodos")
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

// Neu

let mitarbeiter =
JSON.parse(
localStorage.getItem("ddhMitarbeiter")
) || [];

let schichten =
JSON.parse(
localStorage.getItem("ddhSchichten")
) || [];

// =====================================
// Speichern
// =====================================

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

    localStorage.setItem(
        "ddhMitarbeiter",
        JSON.stringify(mitarbeiter)
    );

    localStorage.setItem(
        "ddhSchichten",
        JSON.stringify(schichten)
    );

}
// =====================================
// Teil 2
// Kalender
// =====================================

function kalenderZeichnen(){

    tage.innerHTML = "";

    monatTitel.textContent =
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

    let ersterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    if(ersterTag === 0){

        ersterTag = 7;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat + 1,
        0
    ).getDate();

    // Leere Felder

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        leer.className =
        "tag leer";

        tage.appendChild(leer);

    }

    // Kalendertage

    for(let tag=1;tag<=tageImMonat;tag++){

        const feld =
        document.createElement("div");

        feld.className =
        "tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add(
                "aktiv"
            );

        }

        const nummer =
        document.createElement("div");

        nummer.className =
        "tagNummer";

        nummer.textContent =
        tag;

        feld.appendChild(
            nummer
        );

        // Termin vorhanden

        const hatTermin =
        termine.some(t=>

            t.jahr===aktuellesJahr &&
            t.monat===aktuellerMonat &&
            t.tag===tag

        );

        if(hatTermin){

            feld.style.border =
            "3px solid #2f80ed";

        }

        // Heute markieren

        if(

            tag===heute.getDate() &&

            aktuellerMonat===heute.getMonth() &&

            aktuellesJahr===heute.getFullYear()

        ){

            feld.style.boxShadow =
            "0 0 0 3px #27ae60";

        }

        feld.onclick = ()=>{

            ausgewaehlterTag =
            tag;

            datumTitel.textContent =
            tag +
            ". " +
            monate[aktuellerMonat] +
            " " +
            aktuellesJahr;

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        tage.appendChild(
            feld
        );

    }

}

// =====================================
// Monat zurück
// =====================================

btnZurueck.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat = 11;

        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// =====================================
// Monat weiter
// =====================================

btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat = 0;

        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 3
// Termine
// =====================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    const liste =
    termine.filter(e=>

        e.jahr===aktuellesJahr &&
        e.monat===aktuellerMonat &&
        e.tag===ausgewaehlterTag

    );

    if(liste.length===0){

        terminListe.innerHTML =
        "<p>Keine Termine vorhanden.</p>";

        return;

    }

    liste.forEach((eintrag,index)=>{

        const box =
        document.createElement("div");

        box.className =
        "termin";

        switch(eintrag.kategorie){

            case "Arbeit":
                box.style.borderLeft =
                "6px solid #ff922b";
                break;

            case "Privat":
                box.style.borderLeft =
                "6px solid #4dabf7";
                break;

            case "Familie":
                box.style.borderLeft =
                "6px solid #845ef7";
                break;

            case "Schule":
                box.style.borderLeft =
                "6px solid #51cf66";
                break;

            case "Urlaub":
                box.style.borderLeft =
                "6px solid #15aabf";
                break;

            case "Geburtstag":
                box.style.borderLeft =
                "6px solid #f06595";
                break;

            default:
                box.style.borderLeft =
                "6px solid #868e96";

        }

        const info =
        document.createElement("div");

        info.innerHTML =

        "<strong>" +

        eintrag.uhrzeit +

        "</strong><br>" +

        "[" +

        eintrag.kategorie +

        "] " +

        eintrag.text;

        box.appendChild(info);

        const buttons =
        document.createElement("div");

        buttons.className =
        "terminButtons";

        // --------------------
        // Bearbeiten
        // --------------------

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick = ()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            termin.value =
            eintrag.text;

            kategorie.value =
            eintrag.kategorie;

            termine.splice(index,1);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        // --------------------
        // Löschen
        // --------------------

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick = ()=>{

            termine.splice(index,1);

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

        terminListe.appendChild(
            box
        );

    });

}

// =====================================
// Termin speichern
// =====================================

speichernTermin.onclick = ()=>{

    if(
        termin.value.trim()===""
    ){

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
        uhrzeit.value,

        text:
        termin.value,

        kategorie:
        kategorie.value

    });

    speichern();

    termin.value = "";

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 4
// Aufgaben
// =====================================

function todosAnzeigen(){

    todoListe.innerHTML = "";

    const projekt =
    todoProjekt.value;

    const liste =
    todos.filter(todo=>

        todo.projekt===projekt

    );

    if(liste.length===0){

        todoListe.innerHTML =
        "<p>Keine Aufgaben vorhanden.</p>";

        return;

    }

    liste.forEach((todo,index)=>{

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
        // Aufgabe
        // -------------------------

        const text =
        document.createElement("div");

        text.className =
        "todoText";

        text.textContent =
        todo.text;

        box.appendChild(text);

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

        fertig.onclick = ()=>{

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

        bearbeiten.onclick = ()=>{

            todoText.value =
            todo.text;

            todoPrioritaet.value =
            todo.prioritaet;

            todoProjekt.value =
            todo.projekt;

            todos.splice(
                index,
                1
            );

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick = ()=>{

            todos.splice(
                index,
                1
            );

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(
            fertig
        );

        buttons.appendChild(
            bearbeiten
        );

        buttons.appendChild(
            loeschen
        );

        box.appendChild(
            buttons
        );

        todoListe.appendChild(
            box
        );

    });

}

// =====================================
// Aufgabe speichern
// =====================================

todoSpeichern.onclick = ()=>{

    if(
        todoText.value.trim()===""
    ){

        return;

    }

    todos.push({

        projekt:
        todoProjekt.value,

        text:
        todoText.value,

        prioritaet:
        todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    todoText.value = "";

    todosAnzeigen();

    dashboardAktualisieren();

};

// =====================================
// Projekt wechseln
// =====================================

todoProjekt.onchange = ()=>{

    todosAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 5
// Mitarbeiterverwaltung
// =====================================

function mitarbeiterAnzeigen(){

    mitarbeiterListe.innerHTML = "";

    if(mitarbeiter.length===0){

        mitarbeiterListe.innerHTML =
        "<p>Keine Mitarbeiter vorhanden.</p>";

        schichtplanZeichnen();

        return;

    }

    mitarbeiter.forEach((person,index)=>{

        const box =
        document.createElement("div");

        box.className =
        "mitarbeiter";

        const name =
        document.createElement("strong");

        name.textContent =
        person.name;

        box.appendChild(name);

        const buttons =
        document.createElement("div");

        buttons.style.marginTop =
        "12px";

        buttons.style.display =
        "flex";

        buttons.style.gap =
        "10px";

        // --------------------
        // Bearbeiten
        // --------------------

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick = ()=>{

            mitarbeiterName.value =
            person.name;

            mitarbeiter.splice(
                index,
                1
            );

            speichern();

            mitarbeiterAnzeigen();

        };

        // --------------------
        // Löschen
        // --------------------

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick = ()=>{

            mitarbeiter.splice(
                index,
                1
            );

            speichern();

            mitarbeiterAnzeigen();

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

        mitarbeiterListe.appendChild(
            box
        );

    });

    schichtplanZeichnen();

}

// =====================================
// Mitarbeiter speichern
// =====================================

mitarbeiterSpeichern.onclick = ()=>{

    if(
        mitarbeiterName.value.trim()===""
    ){

        return;

    }

    mitarbeiter.push({

        name:
        mitarbeiterName.value

    });

    speichern();

    mitarbeiterName.value =
    "";

    mitarbeiterAnzeigen();

};
// =====================================
// Teil 6
// Schichtplan
// =====================================

function schichtplanZeichnen(){

    schichtplanBody.innerHTML = "";

    if(mitarbeiter.length===0){

        schichtplanBody.innerHTML =

        "<tr><td colspan='32'>Keine Mitarbeiter vorhanden.</td></tr>";

        return;

    }

    const tageImMonat =
    new Date(

        aktuellesJahr,

        aktuellerMonat + 1,

        0

    ).getDate();

    mitarbeiter.forEach(person=>{

        const zeile =
        document.createElement("tr");

        // -----------------------
        // Mitarbeiter
        // -----------------------

        const name =
        document.createElement("td");

        name.textContent =
        person.name;

        zeile.appendChild(name);

        // -----------------------
        // Tage
        // -----------------------

        for(

            let tag=1;

            tag<=tageImMonat;

            tag++

        ){

            const feld =
            document.createElement("td");

            const eintrag =
            schichten.find(s=>

                s.name===person.name &&

                s.tag===tag &&

                s.monat===aktuellerMonat &&

                s.jahr===aktuellesJahr

            );

            if(eintrag){

                const box =
                document.createElement("div");

                box.className =
                "schicht " +
                eintrag.typ;

                box.textContent =
                eintrag.typ.charAt(0)
                .toUpperCase();

                feld.appendChild(box);

            }

            feld.onclick = ()=>{

                schichtBearbeiten(

                    person.name,

                    tag

                );

            };

            zeile.appendChild(feld);

        }

        schichtplanBody.appendChild(
            zeile
        );

    });

}
// =====================================
// Teil 7
// Schicht bearbeiten
// =====================================

function schichtBearbeiten(name,tag){

    const auswahl = prompt(

`Schicht auswählen

F = Früh
S = Spät
N = Nacht
R = Frei
U = Urlaub
K = Krank`

    );

    if(auswahl===null){

        return;

    }

    let typ = "";

    switch(auswahl.toUpperCase()){

        case "F":
            typ = "frueh";
            break;

        case "S":
            typ = "spaet";
            break;

        case "N":
            typ = "nacht";
            break;

        case "R":
            typ = "frei";
            break;

        case "U":
            typ = "urlaub";
            break;

        case "K":
            typ = "krank";
            break;

        default:
            return;

    }

    const vorhanden =
    schichten.find(s=>

        s.name===name &&

        s.tag===tag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(vorhanden){

        vorhanden.typ = typ;

    }else{

        schichten.push({

            name:name,

            tag:tag,

            monat:aktuellerMonat,

            jahr:aktuellesJahr,

            typ:typ

        });

    }

    speichern();

    schichtplanZeichnen();

}
// =====================================
// Teil 8
// Schicht speichern
// =====================================

function schichtBearbeiten(name,tag){

    let typ = prompt(

`Schicht

F = Früh
S = Spät
N = Nacht
R = Frei
U = Urlaub
K = Krank`

    );

    if(typ===null){

        return;

    }

    typ = typ.toUpperCase();

    let schichtTyp = "";
    let beginn = "";
    let ende = "";

    switch(typ){

        case "F":

            schichtTyp = "frueh";

            beginn = "06:00";

            ende = "14:00";

            break;

        case "S":

            schichtTyp = "spaet";

            beginn = "14:00";

            ende = "22:00";

            break;

        case "N":

            schichtTyp = "nacht";

            beginn = "22:00";

            ende = "06:00";

            break;

        case "R":

            schichtTyp = "frei";

            break;

        case "U":

            schichtTyp = "urlaub";

            break;

        case "K":

            schichtTyp = "krank";

            break;

        default:

            return;

    }

    const bereich = prompt(

        "Bereich",

        "Produktion"

    ) || "";

    const notiz = prompt(

        "Notiz",

        ""

    ) || "";

    const vorhanden =
    schichten.find(s=>

        s.name===name &&

        s.tag===tag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(vorhanden){

        vorhanden.typ = schichtTyp;

        vorhanden.beginn = beginn;

        vorhanden.ende = ende;

        vorhanden.bereich = bereich;

        vorhanden.notiz = notiz;

    }else{

        schichten.push({

            name:name,

            tag:tag,

            monat:aktuellerMonat,

            jahr:aktuellesJahr,

            typ:schichtTyp,

            beginn:beginn,

            ende:ende,

            bereich:bereich,

            notiz:notiz

        });

    }

    speichern();

    schichtplanZeichnen();

}

// =====================================
// Schicht löschen
// =====================================

function schichtLoeschen(name,tag){

    const index =
    schichten.findIndex(s=>

        s.name===name &&

        s.tag===tag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(index>-1){

        schichten.splice(index,1);

        speichern();

        schichtplanZeichnen();

    }

}
// =====================================
// Teil 9
// Schichtplan Anzeige
// =====================================

function schichtplanAktualisieren(){

    schichtplanBody.innerHTML = "";

    if(mitarbeiter.length===0){

        schichtplanBody.innerHTML =
        "<tr><td colspan='32'>Keine Mitarbeiter vorhanden.</td></tr>";

        return;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat+1,
        0
    ).getDate();

    mitarbeiter.forEach(person=>{

        const zeile =
        document.createElement("tr");

        const name =
        document.createElement("td");

        name.textContent =
        person.name;

        zeile.appendChild(name);

        for(let tag=1;tag<=tageImMonat;tag++){

            const feld =
            document.createElement("td");

            const schicht =
            schichten.find(s=>

                s.name===person.name &&

                s.tag===tag &&

                s.monat===aktuellerMonat &&

                s.jahr===aktuellesJahr

            );

            if(schicht){

                const box =
                document.createElement("div");

                box.className =
                "schicht " +
                schicht.typ;

                switch(schicht.typ){

                    case "frueh":
                        box.textContent="F";
                        break;

                    case "spaet":
                        box.textContent="S";
                        break;

                    case "nacht":
                        box.textContent="N";
                        break;

                    case "frei":
                        box.textContent="-";
                        break;

                    case "urlaub":
                        box.textContent="U";
                        break;

                    case "krank":
                        box.textContent="K";
                        break;

                }

                box.title =

                person.name +

                "\nTag: " + tag +

                "\nSchicht: " +

                schicht.typ +

                "\nBeginn: " +

                (schicht.beginn || "-") +

                "\nEnde: " +

                (schicht.ende || "-") +

                "\nBereich: " +

                (schicht.bereich || "-") +

                "\nNotiz: " +

                (schicht.notiz || "-");

                feld.appendChild(box);

            }

            feld.onclick = ()=>{

                schichtBearbeiten(
                    person.name,
                    tag
                );

            };

            feld.ondblclick = ()=>{

                if(confirm(
                    "Schicht löschen?"
                )){

                    schichtLoeschen(
                        person.name,
                        tag
                    );

                }

            };

            zeile.appendChild(feld);

        }

        schichtplanBody.appendChild(
            zeile
        );

    });

}
// =====================================
// Teil 10
// Start & Initialisierung
// =====================================

// -------------------------
// Navigation
// -------------------------

navButtons.forEach(button=>{

    button.onclick=()=>{

        navButtons.forEach(btn=>{

            btn.classList.remove(
                "aktiv"
            );

        });

        seiten.forEach(seite=>{

            seite.classList.remove(
                "aktiv"
            );

        });

        button.classList.add(
            "aktiv"
        );

        const name =
        button.dataset.seite;

        const seite =
        document.getElementById(
            "seite-" + name
        );

        if(seite){

            seite.classList.add(
                "aktiv"
            );

        }

    };

});

// -------------------------
// Startdatum
// -------------------------

datumTitel.textContent =

ausgewaehlterTag +

". " +

monate[aktuellerMonat] +

" " +

aktuellesJahr;

// -------------------------
// Aktuelle Uhrzeit
// -------------------------

const jetzt =
new Date();

uhrzeit.value =

String(
    jetzt.getHours()
).padStart(2,"0")

+

":"

+

String(
    jetzt.getMinutes()
).padStart(2,"0");

// -------------------------
// Alles laden
// -------------------------

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

dashboardAktualisieren();

mitarbeiterAnzeigen();

schichtplanZeichnen();

// -------------------------
// Enter = Termin
// -------------------------

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

});

// -------------------------
// Enter = Aufgabe
// -------------------------

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

});

// -------------------------
// Enter = Mitarbeiter
// -------------------------

mitarbeiterName.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        mitarbeiterSpeichern.click();

    }

});

// -------------------------
// Dashboard aktualisieren
// -------------------------

setInterval(()=>{

    dashboardAktualisieren();

},30000);

// -------------------------
// Fenster aktiv
// -------------------------

window.addEventListener(
"focus",
()=>{

    dashboardAktualisieren();

    kalenderZeichnen();

    termineAnzeigen();

    todosAnzeigen();

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

});

// =====================================
// DDH Studio Enterprise 7.0
// Ende
// =====================================