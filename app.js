// =====================================
// DDH Studio Enterprise 8.0
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

let mitarbeiter =
JSON.parse(
localStorage.getItem("ddhMitarbeiter")
) || [];

let schichten =
JSON.parse(
localStorage.getItem("ddhSchichten")
) || [];
// =====================================
// Teil 2
// Speichern & Navigation
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
// Navigation
// =====================================

function seiteAnzeigen(name){

    seiten.forEach(seite=>{

        seite.classList.remove(
            "aktiv"
        );

    });

    navButtons.forEach(button=>{

        button.classList.remove(
            "aktiv"
        );

    });

    const seite =
    document.getElementById(
        "seite-" + name
    );

    if(seite){

        seite.classList.add(
            "aktiv"
        );

    }

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

navButtons.forEach(button=>{

    button.onclick=()=>{

        const name =
        button.dataset.seite;

        seiteAnzeigen(name);

        localStorage.setItem(
            "ddhSeite",
            name
        );

    };

});
// =====================================
// Teil 3
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

    if(ersterTag===0){

        ersterTag=7;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat+1,
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

        feld.onclick=()=>{

            ausgewaehlterTag =
            tag;

            datumTitel.textContent =

            tag +

            ". " +

            monate[aktuellerMonat] +

            " " +

            aktuellesJahr;

            kalenderZeichnen();

            if(typeof termineAnzeigen==="function"){

                termineAnzeigen();

            }

        };

        tage.appendChild(
            feld
        );

    }

}

// =====================================
// Monat zurück
// =====================================

btnZurueck.onclick=()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;

        aktuellesJahr--;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

};

// =====================================
// Monat weiter
// =====================================

btnWeiter.onclick=()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;

        aktuellesJahr++;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

};
// =====================================
// Teil 4
// Termine
// =====================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    const liste =
    termine.filter(termin=>

        termin.jahr===aktuellesJahr &&
        termin.monat===aktuellerMonat &&
        termin.tag===ausgewaehlterTag

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

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            kategorie.value =
            eintrag.kategorie;

            termin.value =
            eintrag.text;

            termine.splice(
                index,
                1
            );

            speichern();

            termineAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            termine.splice(
                index,
                1
            );

            speichern();

            termineAnzeigen();

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

speichernTermin.onclick=()=>{

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

};
// =====================================
// Teil 5
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

        const text =
        document.createElement("div");

        text.className =
        "todoText";

        text.textContent =
        todo.text;

        box.appendChild(text);

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

        };

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

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

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            todos.splice(
                index,
                1
            );

            speichern();

            todosAnzeigen();

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

todoSpeichern.onclick=()=>{

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

};

// Projekt wechseln

todoProjekt.onchange=()=>{

    todosAnzeigen();

};
// =====================================
// Teil 6
// Mitarbeiterverwaltung
// =====================================

function mitarbeiterAnzeigen(){

    mitarbeiterListe.innerHTML = "";

    if(mitarbeiter.length===0){

        mitarbeiterListe.innerHTML =
        "<p>Noch keine Mitarbeiter vorhanden.</p>";

        return;

    }

    mitarbeiter.forEach((person,index)=>{

        const box =
        document.createElement("div");

        box.className =
        "mitarbeiter";

        const titel =
        document.createElement("strong");

        titel.textContent =
        person.name;

        box.appendChild(
            titel
        );

        const buttons =
        document.createElement("div");

        buttons.className =
        "mitarbeiterButtons";

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            mitarbeiterName.value =
            person.name;

            mitarbeiter.splice(
                index,
                1
            );

            speichern();

            mitarbeiterAnzeigen();

            schichtplanZeichnen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            if(!confirm(
                "Mitarbeiter löschen?"
            )){

                return;

            }

            mitarbeiter.splice(
                index,
                1
            );

            speichern();

            mitarbeiterAnzeigen();

            schichtplanZeichnen();

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

}

// =====================================
// Mitarbeiter speichern
// =====================================

mitarbeiterSpeichern.onclick=()=>{

    if(
        mitarbeiterName.value.trim()===""
    ){

        return;

    }

    mitarbeiter.push({

        name:
        mitarbeiterName.value.trim()

    });

    speichern();

    mitarbeiterName.value="";

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

};

// Enter = Mitarbeiter speichern

mitarbeiterName.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        mitarbeiterSpeichern.click();

    }

});
// =====================================
// Teil 7
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

        // Mitarbeitername

        const name =
        document.createElement("td");

        name.textContent =
        person.name;

        zeile.appendChild(name);

        // Alle Tage

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

                switch(eintrag.typ){

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

                feld.appendChild(box);

            }

            feld.onclick=()=>{

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
// Teil 8
// Schicht bearbeiten
// =====================================

function schichtBearbeiten(name,tag){

    let eingabe = prompt(

`Schicht auswählen

F = Früh
S = Spät
N = Nacht
R = Frei
U = Urlaub
K = Krank`

    );

    if(eingabe===null){

        return;

    }

    eingabe =
    eingabe.toUpperCase();

    let typ = "";

    switch(eingabe){

        case "F":
            typ="frueh";
            break;

        case "S":
            typ="spaet";
            break;

        case "N":
            typ="nacht";
            break;

        case "R":
            typ="frei";
            break;

        case "U":
            typ="urlaub";
            break;

        case "K":
            typ="krank";
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
// Teil 9
// Start
// =====================================

// Datum

datumTitel.textContent =

ausgewaehlterTag +

". " +

monate[aktuellerMonat] +

" " +

aktuellesJahr;

// Uhrzeit

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

// Daten laden

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

mitarbeiterAnzeigen();

schichtplanZeichnen();

// Navigation

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

// Enter = Termin

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

});

// Enter = Aufgabe

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

});
// =====================================
// Teil 10
// Initialisierung
// =====================================

// Startdatum

datumTitel.textContent =

ausgewaehlterTag +

". " +

monate[aktuellerMonat] +

" " +

aktuellesJahr;

// Uhrzeit

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

// Daten laden

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

mitarbeiterAnzeigen();

schichtplanZeichnen();

// Letzte Seite öffnen

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

// Enter = Termin

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

}
);

// Enter = Aufgabe

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

}
);

// Enter = Mitarbeiter

mitarbeiterName.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        mitarbeiterSpeichern.click();

    }

}
);

// =====================================
// DDH Studio Enterprise 8.0
// Ende
// =====================================
// =====================================
// Teil 2
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
// Hilfsfunktion
// =====================================

function formatDatum(tag,monat,jahr){

    return (
        String(tag).padStart(2,"0") +
        "." +
        String(monat+1).padStart(2,"0") +
        "." +
        jahr
    );

}
// =====================================
// Teil 3
// Navigation & Kalender
// =====================================

// -------------------------
// Navigation
// -------------------------

function seiteAnzeigen(name){

    seiten.forEach(seite=>{

        seite.classList.remove(
            "aktiv"
        );

    });

    navButtons.forEach(button=>{

        button.classList.remove(
            "aktiv"
        );

    });

    const ziel =
    document.getElementById(
        "seite-" + name
    );

    if(ziel){

        ziel.classList.add(
            "aktiv";

        );

    }

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

    localStorage.setItem(
        "ddhSeite",
        name
    );

}

navButtons.forEach(button=>{

    button.onclick=()=>{

        seiteAnzeigen(
            button.dataset.seite
        );

    };

});

// -------------------------
// Kalender
// -------------------------

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

    if(ersterTag===0){

        ersterTag=7;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat+1,
        0
    ).getDate();

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        leer.className =
        "tag leer";

        tage.appendChild(
            leer
        );

    }

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

        feld.onclick=()=>{

            ausgewaehlterTag=
            tag;

            datumTitel.textContent=
            formatDatum(
                tag,
                aktuellerMonat,
                aktuellesJahr
            );

            kalenderZeichnen();

            if(typeof termineAnzeigen==="function"){

                termineAnzeigen();

            }

        };

        tage.appendChild(
            feld
        );

    }

}

// -------------------------
// Monat wechseln
// ----------------
// =====================================
// Teil 4
// Termine
// =====================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    const liste = termine.filter(t =>

        t.jahr === aktuellesJahr &&
        t.monat === aktuellerMonat &&
        t.tag === ausgewaehlterTag

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

        box.innerHTML =

        "<strong>" +

        (eintrag.uhrzeit || "--:--") +

        "</strong><br>" +

        "[" +

        eintrag.kategorie +

        "] " +

        eintrag.text;

        const buttons =
        document.createElement("div");

        buttons.className =
        "terminButtons";

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            kategorie.value =
            eintrag.kategorie;

            termin.value =
            eintrag.text;

            termine.splice(index,1);

            speichern();

            termineAnzeigen();

        };

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            termine.splice(index,1);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

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

speichernTermin.onclick=()=>{

    if(termin.value.trim()===""){

        return;

    }

    termine.push({

        jahr:aktuellesJahr,

        monat:aktuellerMonat,

        tag:ausgewaehlterTag,

        uhrzeit:uhrzeit.value,

        kategorie:kategorie.value,

        text:termin.value

    });

    speichern();

    termin.value="";

    kalenderZeichnen();

    termineAnzeigen();

};
// =====================================
// Teil 5
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

        const titel =
        document.createElement("div");

        titel.className =
        "todoText";

        titel.textContent =
        todo.text;

        box.appendChild(
            titel
        );

        const info =
        document.createElement("div");

        info.className =
        "todoInfo";

        info.textContent =

        "📁 " +

        todo.projekt +

        " • " +

        todo.prioritaet;

        box.appendChild(
            info
        );

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        const fertig =
        document.createElement("button");

        fertig.textContent =
        "✔";

        fertig.onclick=()=>{

            todo.erledigt =
            !todo.erledigt;

            speichern();

            todosAnzeigen();

        };

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

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

        };

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            todos.splice(
                index,
                1
            );

            speichern();

            todosAnzeigen();

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

todoSpeichern.onclick=()=>{

    if(todoText.value.trim()===""){

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

    todoText.value="";

    todosAnzeigen();

};

todoProjekt.onchange=()=>{

    todosAnzeigen();

};
// =====================================
// Teil 6
// Mitarbeiterverwaltung
// =====================================

function mitarbeiterAnzeigen(){

    mitarbeiterListe.innerHTML = "";

    if(mitarbeiter.length===0){

        mitarbeiterListe.innerHTML =
        "<p>Noch keine Mitarbeiter vorhanden.</p>";

        schichtplanBody.innerHTML =
        "<tr><td colspan='32'>Keine Mitarbeiter vorhanden.</td></tr>";

        return;

    }

    mitarbeiter.forEach((person,index)=>{

        const box =
        document.createElement("div");

        box.className =
        "mitarbeiter";

        box.innerHTML =
        "<strong>" +
        person.name +
        "</strong>";

        const buttons =
        document.createElement("div");

        buttons.className =
        "mitarbeiterButtons";

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            mitarbeiterName.value =
            person.name;

            mitarbeiter.splice(
                index,
                1
            );

            speichern();

            mitarbeiterAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            if(!confirm(
                "Mitarbeiter löschen?"
            )){

                return;

            }

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

}

// =====================================
// Mitarbeiter speichern
// =====================================

mitarbeiterSpeichern.onclick=()=>{

    if(
        mitarbeiterName.value.trim()===""
    ){

        return;

    }

    mitarbeiter.push({

        name:
        mitarbeiterName.value.trim()

    });

    speichern();

    mitarbeiterName.value="";

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

};

// Enter = Mitarbeiter

mitarbeiterName.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        mitarbeiterSpeichern.click();

    }

});
// =====================================
// Teil 7
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

        const name =
        document.createElement("td");

        name.textContent =
        person.name;

        zeile.appendChild(name);

        for(let tag=1; tag<=tageImMonat; tag++){

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

                feld.textContent =
                schicht.typ;

            }else{

                feld.textContent = "-";

            }

            feld.style.cursor =
            "pointer";

            feld.onclick=()=>{

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
// Teil 8
// Schichten bearbeiten
// =====================================

function schichtBearbeiten(name,tag){

    const eingabe = prompt(

`Schicht auswählen

F = Früh
S = Spät
N = Nacht
R = Frei
U = Urlaub
K = Krank`

    );

    if(eingabe===null){

        return;

    }

    let typ = "";

    switch(eingabe.toUpperCase()){

        case "F":
            typ="Früh";
            break;

        case "S":
            typ="Spät";
            break;

        case "N":
            typ="Nacht";
            break;

        case "R":
            typ="Frei";
            break;

        case "U":
            typ="Urlaub";
            break;

        case "K":
            typ="Krank";
            break;

        default:
            alert("Ungültige Eingabe");
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
// Teil 9
// Start
// =====================================

// Startdatum anzeigen

datumTitel.textContent =
formatDatum(
    ausgewaehlterTag,
    aktuellerMonat,
    aktuellesJahr
);

// Aktuelle Uhrzeit

const jetzt = new Date();

uhrzeit.value =
String(jetzt.getHours()).padStart(2,"0") +
":" +
String(jetzt.getMinutes()).padStart(2,"0");

// Kalender laden

kalenderZeichnen();

// Termine laden

termineAnzeigen();

// Aufgaben laden

todosAnzeigen();

// Mitarbeiter laden

mitarbeiterAnzeigen();

// Schichtplan laden

schichtplanZeichnen();

// Letzte Seite öffnen

const letzteSeite =
localStorage.getItem("ddhSeite");

if(letzteSeite){

    seiteAnzeigen(letzteSeite);

}else{

    seiteAnzeigen("dashboard");

}

// Enter = Termin speichern

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

});

// Enter = Aufgabe speichern

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

});

// =====================================
// Ende
// =====================================